import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';

/**
 * Rate limiter general all routes 
 */
export const generalLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  message: {
    success: false,
    message: 'Trop de requêtes. Veuillez réessayer plus tard.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.path === '/health' || req.path === '/',
});

/**
 * Rate limiter strict auth 
 * protect for brute-force 
 */
export const authLimiter = rateLimit({
  windowMs: env.AUTH_LIMIT_WINDOW_MS,
  max: env.AUTH_LIMIT_MAX_REQUESTS,
  message: {
    success: false,
    message: 'Trop de tentatives de connexion. Veuillez réessayer dans 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Skip limiter in development and production to avoid blocking during testing and normal usage
  skip: () => env.NODE_ENV === 'development' || env.NODE_ENV === 'production',
});
/**
 * Rate limiter public endoints
 */
export const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    success: false,
    message: 'Trop de requêtes. Veuillez réessayer plus tard.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Rate limiter creat ressource  
 */
export const createLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 30,
  message: {
    success: false,
    message: 'Trop de créations. Veuillez réessayer dans une heure.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.method !== 'POST',
});