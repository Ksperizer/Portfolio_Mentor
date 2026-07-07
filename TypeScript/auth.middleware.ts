import type { Request, Response, NextFunction } from 'express';
import { UserRole, type IJwtPayload } from '../types/typage.js';
import { verifyAccessToken, extractTokenFromHeader } from '../utils/jwt.util.js';
import { unauthorizedResponse, forbiddenResponse } from '../utils/response.utils.js';
/**
 * Middleware to authenticate requests using JWT access tokens.
 * 
 * @param {Request} req - The incoming request object.
 */

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);

    if (!token) {
      unauthorizedResponse(res, 'Token d\'authentification manquant.');
      return;
    }

    // check and decode token 
    const payload: IJwtPayload = verifyAccessToken(token);

    // add user info to request object
    req.user = payload;

    next();
  } catch (error) {
    if (error instanceof Error) {
      unauthorizedResponse(res, error.message);
      return;
    } else {
      unauthorizedResponse(res, 'Token invalide.');
    }
  }
};

/**
 * Middleware to authorize requests based on user roles.
 * 
 * @param {UserRole[]} allowedRoles - Array of roles that are allowed to access the route.
 */

export const requireRole = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      unauthorizedResponse(res, 'Utilisateur non authentifié.');
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      forbiddenResponse(res, 'Accès refusé. Rôle insuffisant.');
      return;
    }

    next();
  };
};


// visitor only
export const visitorOnly = requireRole(UserRole.VISITOR);

// admin and superAdmin only
export const adminOnly = requireRole(UserRole.ADMIN, UserRole.SUPER_ADMIN);

// superAdmin only
export const superAdminOnly = requireRole(UserRole.SUPER_ADMIN);

// user (organizer, admin, superAdmin)
export const userOnly = requireRole(UserRole.ORGANIZER, UserRole.ADMIN, UserRole.SUPER_ADMIN);

// optional authentication (no error if no token or invalid token)
export const optionalAuth = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);

    if (token) {
      const payload: IJwtPayload = verifyAccessToken(token);
      req.user = payload;
    }
  } catch (error) {
    console.warn('Optional auth failed:', error);
  }

  next();
};