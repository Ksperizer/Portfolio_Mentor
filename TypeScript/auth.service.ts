import prisma from '../../config/database';
import type { IRegisterData, ILoginCredentials, IAuthResponse, IUserResponse, IUpdateProfileData } from '../../types/typage.js';
import { UserRole, AppError } from '../../types/typage.js';
import { hashPassword, comparePasswords } from '../../utils/password.util.js';
import { generateTokenPair } from '../../utils/jwt.util.js';
import deepEmailValidator from 'deep-email-validator';
import crypto from 'crypto';
import { sendEmail } from '../../utils/email.util.js';
import env from '../../config/env.js';

const validateEmail = Object.keys(deepEmailValidator).includes('validate')
  ? (deepEmailValidator as any).validate
  : deepEmailValidator;

export class authService {
  /**
   * Register a new user
   */
  static async register(data: IRegisterData): Promise<IAuthResponse> {
    // Validate the email using deep-email-validator
    const emailValidation = await validateEmail({
      email: data.email,
      validateRegex: true,
      validateMx: true,
      validateTypo: true,
      validateDisposable: true,
      validateSMTP: false, // Disabled due to frequent timeouts and false positives by providers
    });

    if (!emailValidation.valid) {
      let errorMessage = 'Adresse e-mail invalide.';
      if (emailValidation.reason === 'regex') errorMessage = 'Le format de l\'e-mail est incorrect.';
      else if (emailValidation.reason === 'typo') errorMessage = 'Il semble y avoir une faute de frappe dans le nom de domaine de l\'e-mail.';
      else if (emailValidation.reason === 'disposable') errorMessage = 'Les e-mails jetables ne sont pas autorisés.';
      else if (emailValidation.reason === 'mx') errorMessage = 'Le domaine de cet e-mail ne semble pas pouvoir recevoir de messages.';

      throw new AppError(errorMessage, 400);
    }

    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) {
      throw new AppError('Cet email est déjà utilisé.', 409);
    }

    // Hash password
    const passwordHash = await hashPassword(data.password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: passwordHash,
        firstName: data.firstName,
        lastName: data.lastName,
        role: UserRole.VISITOR, // default role
      },
    });

    // Generate JWT tokens
    const tokens = generateTokenPair({ userId: user.id, email: user.email, role: user.role as UserRole });

    const userResponse: IUserResponse = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role as UserRole,
      preferredLanguage: 'fr',
      createdAt: user.createdAt,
    };

    return {
      user: userResponse,
      tokens,
    };
  }

  /**
   * Connect a user (login)
   */
  static async login(credentials: ILoginCredentials): Promise<IAuthResponse> {
    const user = await prisma.user.findUnique({
      where: { email: credentials.email },
    });

    if (!user) {
      throw new AppError('Email ou mot de passe incorrect', 401);
    }

    if (!user.password) {
      throw new AppError('Ce compte n\'a pas de mot de passe. Veuillez contacter le support.', 401);
    }

    const isPasswordValid = await comparePasswords(
      credentials.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new AppError('Email ou mot de passe incorrect', 401);
    }

    const tokens = generateTokenPair({
      userId: user.id,
      email: user.email,
      role: user.role as UserRole,
    });

    const userResponse: IUserResponse = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role as UserRole,
      preferredLanguage: 'fr',
      createdAt: user.createdAt,
    };

    return {
      user: userResponse,
      tokens,
    };
  }

  /**
   * recovery of the logged-in user data
   */
  static async getMe(userId: string): Promise<IUserResponse> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError('Utilisateur non trouvé', 404);
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role as UserRole,
      preferredLanguage: 'fr',
      createdAt: user.createdAt,
    };
  }

  /**
   * Refresh JWT tokens 
   */
  static async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    // TODO: Implement refresh token logic
    throw new AppError('Fonctionnalité non implémentée', 501);
  }

  /**
   * Update profile information
   */
  static async updateMe(userId: string, data: IUpdateProfileData): Promise<IUserResponse> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new AppError('Utilisateur non trouvé', 404);

    if (data.email && data.email !== user.email) {
      const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
      if (existingUser) throw new AppError('Cet email est déjà utilisé.', 409);
    }

    const updateData: any = {};
    if (data.firstName) updateData.firstName = data.firstName;
    if (data.email) updateData.email = data.email;
    if (data.password) {
      updateData.password = await hashPassword(data.password);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      role: updatedUser.role as UserRole,
      preferredLanguage: 'fr',
      createdAt: updatedUser.createdAt,
    };
  }

  /**
   * Delete user account
   */
  static async deleteMe(userId: string): Promise<void> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new AppError('Utilisateur non trouvé', 404);

    await prisma.user.delete({
      where: { id: userId },
    });
  }

  /**
   * Handle Forgot Password logic
   */
  static async forgotPassword(email: string): Promise<void> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return; // Do not leak that the email doesn't exist

    // Generate token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Save hash to db with 15 mins expiry
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: resetTokenHash,
        resetPasswordExpires: new Date(Date.now() + 15 * 60 * 1000),
      }
    });

    // Send the email
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`;
    const message = `Vous recevez cet e-mail parce que vous (ou quelqu'un d'autre) avez demandé la réinitialisation du mot de passe de votre compte.\n\nCliquez sur le lien suivant, ou collez-le dans votre navigateur pour terminer le processus :\n\n${resetUrl}\n\nSi vous ne l'avez pas demandé, ignorez cet e-mail et votre mot de passe restera inchangé. Ce lien restera valide 15 minutes.`;

    await sendEmail(user.email, 'Réinitialisation de votre mot de passe', message, message.replace(/\n\n/g, '<br><br>'));
  }

  /**
   * Handle Reset Password logic
   */
  static async resetPassword(token: string, newPassword: string): Promise<void> {
    const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: resetTokenHash,
        resetPasswordExpires: { gt: new Date() },
      }
    });

    if (!user) throw new AppError('Le jeton de réinitialisation est invalide ou a expiré', 400);

    const passwordHash = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: passwordHash,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      }
    });
  }
}
