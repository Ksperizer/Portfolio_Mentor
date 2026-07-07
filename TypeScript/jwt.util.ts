// BackEnd/src/utils/jwt.util.ts
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

import { IJwtPayload, ITokenPair } from '../types/typage.js';

/**
 * Generate an access token JWT
 */
export function generateAccessToken(payload: IJwtPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
    issuer: 'ynov-events-api',
    audience: 'ynov-events-client',
  });
}

/**
 * Generate a refresh token JWT
 */
export function generateRefreshToken(payload: IJwtPayload): string {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN as jwt.SignOptions['expiresIn'],
    issuer: 'ynov-events-api',
    audience: 'ynov-events-client',
  });
}

/**
 * Generate a pair of access and refresh tokens
 */
export function generateTokenPair(payload: IJwtPayload): ITokenPair {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
}

/**
 * verify token 
 */
export function verifyAccessToken(token: string): IJwtPayload {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET, {
      issuer: 'ynov-events-api',
      audience: 'ynov-events-client',
    }) as IJwtPayload;

    return decoded;
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token expiré');
    }
    if (error.name === 'JsonWebTokenError') {
      throw new Error('Token invalide');
    }
    throw new Error('Erreur de vérification du token');
  }
}

/**
 * Vérifie & decode  refresh token
 */
export function verifyRefreshToken(token: string): IJwtPayload {
  try {
    const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET, {
      issuer: 'ynov-events-api',
      audience: 'ynov-events-client',
    }) as IJwtPayload;

    return decoded;
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Refresh token expiré');
    }
    if (error.name === 'JsonWebTokenError') {
      throw new Error('Refresh token invalide');
    }
    throw new Error('Erreur de vérification du refresh token');
  }
}

/**
 * Extract the token from the Authorization header
 */
export function extractTokenFromHeader(authHeader?: string): string | null {
  if (!authHeader) {
    return null;
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }

  return parts[1] ?? null;
}

/**
 * decode token without verifying 
 */
export function decodeToken(token: string): IJwtPayload | null {
  try {
    return jwt.decode(token) as IJwtPayload;
  } catch {
    return null;
  }
}