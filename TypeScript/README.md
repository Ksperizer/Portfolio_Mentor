# TypeScript — Extraits YnCube

Extraits du projet **YnCube**, plateforme de gestion d'événements campus développée pour Ynov Toulouse et déployée en production sur [yncube.fr](https://yncube.fr).

## Stack

- Node.js / Express / TypeScript
- Prisma ORM / MySQL 8.0
- JWT (access token + refresh token)
- Docker Compose

## Fichiers

| Fichier | Description |
|---|---|
| `auth.middleware.ts` | Middleware JWT — `authenticate`, `requireRole`, `optionalAuth`, gestion des 4 rôles (VISITOR, ORGANIZER, ADMIN, SUPER_ADMIN) |
| `jwt.util.ts` | Utilitaires JWT — génération access/refresh token, vérification, extraction du header, gestion `TokenExpiredError` / `JsonWebTokenError` |
| `auth.service.ts` | Service d'authentification — register (validation email MX + typo + disposable), login, forgot/reset password (crypto SHA-256, expiration 15min), bcrypt |
| `rateLimit.middleware.ts` | Rate limiting — 4 limiteurs distincts (général, auth anti brute-force, public, création) |
| `events.service.ts` | Service événements — CRUD complet Prisma, relations imbriquées, duplication d'événement avec recalcul des sessions dans le temps |

## Compétences validées

- TypeScript strict : types, interfaces, enums, génériques
- Architecture backend feature-based (séparation controller / service / middleware)
- Sécurité : JWT access + refresh, RBAC, rate limiting, bcrypt, reset password sécurisé
- ORM Prisma : requêtes avec relations imbriquées profondes, CRUD, logique métier
- Programmation asynchrone : `async/await` systématique, gestion des erreurs typées
- POO : classes statiques avec méthodes async (`class authService`, `class EventsService`)