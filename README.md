# Portfolio Mentor - Kevin Cazeneuve

Ce dépôt centralise les preuves techniques et pédagogiques associées à ma candidature au poste de mentor à Ynov Toulouse.  
Chaque projet listé ci-dessous est référencé par les compétences qu'il valide dans les grilles de positionnement B1, B2 et Posture.

---

## Projets

| Projet | Stack | Lien |
|---|---|---|
| YnCube | Node.js / Express / TypeScript / Prisma / MySQL / Vue 3 / Docker |  |
| CinéDark | React / Vite / Python / Neo4j / Docker | [github.com/Ksperizer/cinedark]|
| Pokédex React | React / TypeScript / Redux Toolkit / RTK Query / React Router v7 | [github.com/Ksperizer/react-pokemon]|

---

## Mapping compétences → preuves

### B1 - Immersion Go, Git, Environnement

| Critère | Niveau | Preuve |
|---|---|---|
| Fondamentaux Git (add, commit, push, pull, clone) | Maîtrise | Historique de commits sur tous les repos ci-dessus - conventions de nommage, messages structurés |
| Gestion des branches (GitFlow, merge, conflits) | Maîtrise | [YnCube - historique branches](https://github.com/Ksperizer/yncube) - stratégie de branches appliquée sur projet multi-contributeurs |
| Collaboration en équipe (PR, code review) | Maîtrise | [YnCube - Pull Requests](https://github.com/Ksperizer/yncube/pulls) - rôle lead backend |
| Bonnes pratiques de dépôt (README, gitignore, organisation) | Maîtrise | Ce dépôt + README de YnCube, CinéDark, Pokédex |
| Commandes avancées (stash, rebase, cherry-pick) | Opérationnel | Pratique sur projets collaboratifs GitHub |

> **Go** : pas de projet personnel public à ce jour. Compétence exercée en contexte d'enseignement (piscine Golang Ynov, workshop Git debugging Go). Un projet CLI Go est en cours de préparation.

---

### B1 - HTML / CSS

| Critère | Niveau | Preuve |
|---|---|---|
| Structure HTML5 sémantique | Maîtrise | [YnCube - FrontEnd/index.html](https://github.com/Ksperizer/yncube/blob/main/FrontEnd/index.html) |
| Flexbox & Grid | Maîtrise | [YnCube - composants CSS](https://github.com/Ksperizer/yncube/tree/main/FrontEnd/src/components) |
| Responsive design (media queries, mobile-first) | Maîtrise | [YnCube - PWA déployée sur yncube.fr](https://yncube.fr) |
| Positionnement (relative, absolute, fixed) | Maîtrise | [YnCube - styles des composants layout](https://github.com/Ksperizer/yncube/tree/main/FrontEnd/src/components/layout) |
| Production d'interface complète | Maîtrise | [yncube.fr](https://yncube.fr) - interface en production |

---

### B1 - Bases de données SQL

| Critère | Niveau | Preuve |
|---|---|---|
| Modélisation des données (entités, relations) | Opérationnel | [YnCube - schema Prisma](https://github.com/Ksperizer/yncube/blob/main/BackEnd/prisma/schema.prisma) - Event, Workshop, Session, Speaker, Specialty, User, Map |
| DDL (CREATE TABLE, clés étrangères, relations) | Maîtrise | [YnCube - docker-compose.yml](https://github.com/Ksperizer/yncube/blob/main/docker-compose.yml) - MySQL 8.0 + Prisma db push |
| DQL (SELECT, WHERE, JOIN, GROUP BY, agrégations) | Maîtrise | [YnCube - events.service.ts](https://github.com/Ksperizer/yncube/blob/main/BackEnd/src/modules/events/events.service.ts) - requêtes Prisma avec relations imbriquées |
| DML (INSERT, UPDATE, DELETE) | Maîtrise | [YnCube - events.service.ts](https://github.com/Ksperizer/yncube/blob/main/BackEnd/src/modules/events/events.service.ts) - CRUD complet |

---

### B1 - Application CLI & Parsing en Go

> Projet CLI Go en cours de préparation - sera ajouté dans ce dépôt.

---

### B1 - Algorithmie

| Critère | Niveau | Preuve |
|---|---|---|
| Implémentation en Go | Opérationnel | Projet CLI Go à venir |
| Décomposition de problème, edge cases | Opérationnel | [YnCube - events.service.ts `duplicateEvent`](https://github.com/Ksperizer/yncube/blob/main/BackEnd/src/modules/events/events.service.ts) - duplication avec recalcul des sessions dans le temps |

---

### B1 - JavaScript & DOM

| Critère | Niveau | Preuve |
|---|---|---|
| Fondamentaux JS (variables, types, fonctions, portée) | Maîtrise | [Pokédex - App.tsx](https://github.com/Ksperizer/react-pokemon/blob/main/src/App.tsx) |
| Manipulation des données (map, filter, reduce, callbacks) | Maîtrise | [Pokédex - pokemonApi.ts `transformResponse`](https://github.com/Ksperizer/react-pokemon/blob/main/src/api/pokemonApi.ts) |
| Programmation asynchrone (async/await, promesses) | Maîtrise | [Pokédex - App.tsx `loadPokemons`](https://github.com/Ksperizer/react-pokemon/blob/main/src/App.tsx) - [YnCube - auth.service.ts](https://github.com/Ksperizer/yncube/blob/main/BackEnd/src/modules/auth/auth.service.ts) |
| POO (classes, encapsulation, héritage) | Maîtrise | [YnCube - auth.service.ts `class authService`](https://github.com/Ksperizer/yncube/blob/main/BackEnd/src/modules/auth/auth.service.ts) - [YnCube - events.service.ts `class EventsService`](https://github.com/Ksperizer/yncube/blob/main/BackEnd/src/modules/events/events.service.ts) |

---

### B1 - Développement Web & API

| Critère | Niveau | Preuve |
|---|---|---|
| Fondamentaux REST (méthodes HTTP, codes de réponse) | Maîtrise | [YnCube - routes.ts](https://github.com/Ksperizer/yncube/blob/main/BackEnd/src/routes.ts) - [YnCube - config/swagger.ts](https://github.com/Ksperizer/yncube/blob/main/BackEnd/src/config/swagger.ts) |
| Manipulation des données JSON | Maîtrise | [CinéDark - graph.py](https://github.com/Ksperizer/cinedark/blob/main/backend/app/graph.py) - [Pokédex - pokemonApi.ts](https://github.com/Ksperizer/react-pokemon/blob/main/src/api/pokemonApi.ts) |
| Architecture web (séparation frontend/backend) | Maîtrise | [YnCube - docker-compose.yml](https://github.com/Ksperizer/yncube/blob/main/docker-compose.yml) - 3 services orchestrés (db, backend, frontend) |
| Génération de pages dynamiques | Opérationnel | [YnCube - FrontEnd](https://github.com/Ksperizer/yncube/tree/main/FrontEnd/src/components/pages) - pages générées depuis l'API |

---

### B1 - Projet Fullstack (Forum)

| Critère | Niveau | Preuve |
|---|---|---|
| Architecture de l'application (routes, logique métier, BDD) | Opérationnel | [YnCube - BackEnd/src/modules/](https://github.com/Ksperizer/yncube/tree/main/BackEnd/src/modules) - feature-based (auth, events, bookings, qrcodes, scans, sessions, speakers, workshops) |
| Authentification (inscription, connexion, sessions) | Opérationnel | [YnCube - auth.service.ts](https://github.com/Ksperizer/yncube/blob/main/BackEnd/src/modules/auth/auth.service.ts) - register, login, forgot/reset password, token JWT access + refresh |
| Intégration fullstack | Opérationnel | [yncube.fr](https://yncube.fr) - application en production |
| Gestion de projet & accompagnement | Opérationnel | Rôle lead backend sur YnCube - coordination frontend/backend/infra |

---

### B2 - Python Backend & FastAPI

| Critère | Niveau | Preuve |
|---|---|---|
| POO Python appliquée au backend | Opérationnel | [CinéDark - backend/app/graph.py](https://github.com/Ksperizer/cinedark/blob/main/backend/app/graph.py) - classes et fonctions Python structurées |
| Pydantic & configuration | Notions/bases | [CinéDark - backend/app/config.py](https://github.com/Ksperizer/cinedark/blob/main/backend/app/config.py) - `BaseSettings` Pydantic |
| Debug & maintenance Python | Opérationnel | [CinéDark - backend/](https://github.com/Ksperizer/cinedark/tree/main/backend) - proxy Python zero-dependency avec gestion des erreurs |

> FastAPI : pas de projet complet livré. Compétence REST maîtrisée via Express/TypeScript (YnCube, BeeFootFlow). Montée en compétences FastAPI prévue.

---

### B2 - React.js & TypeScript

| Critère | Niveau | Preuve |
|---|---|---|
| Fondamentaux TypeScript (types, interfaces, génériques) | Maîtrise | [Pokédex - types/auth.type.ts](https://github.com/Ksperizer/react-pokemon/blob/main/src/types/auth.type.ts) - [YnCube - BackEnd/src/types/typage.ts](https://github.com/Ksperizer/yncube/blob/main/BackEnd/src/types/typage.ts) |
| Composants React fonctionnels | Maîtrise | [Pokédex - pages/](https://github.com/Ksperizer/react-pokemon/tree/main/src/pages) - [Pokédex - components/](https://github.com/Ksperizer/react-pokemon/tree/main/src/components) |
| Gestion de l'état (useState, useEffect, Redux) | Maîtrise | [Pokédex - store/index.ts](https://github.com/Ksperizer/react-pokemon/blob/main/src/store/index.ts) - Redux Toolkit avec deux API slices |
| Gestion de l'état avancée (slice, extraReducers) | Maîtrise | [Pokédex - store/slice/authSlice.ts](https://github.com/Ksperizer/react-pokemon/blob/main/src/store/slice/authSlice.ts) - `addMatcher` sur RTK Query |
| Logique métier dans le store | Maîtrise | [Pokédex - store/slice/teamSlice.ts](https://github.com/Ksperizer/react-pokemon/blob/main/src/store/slice/teamSlice.ts) - MAX_TEAM_SIZE, déduplication, sélecteurs typés |
| Navigation & architecture SPA (React Router) | Opérationnel | [Pokédex - router/routes.tsx](https://github.com/Ksperizer/react-pokemon/blob/main/src/router/routes.tsx) - routes imbriquées, RootLayout, 404, routes dynamiques |
| Communication avec les APIs (RTK Query) | Maîtrise | [Pokédex - api/pokemonApi.ts](https://github.com/Ksperizer/react-pokemon/blob/main/src/api/pokemonApi.ts) - `createApi`, `fetchBaseQuery`, `transformResponse`, `providesTags` |
| Auth JWT côté client | Maîtrise | [Pokédex - store/api/authApi.ts](https://github.com/Ksperizer/react-pokemon/blob/main/src/store/api/authApi.ts) - `prepareHeaders`, décodage JWT, `transformResponse` |
| Outils & environnement (Vite, TypeScript) | Maîtrise | [Pokédex - vite.config.ts](https://github.com/Ksperizer/react-pokemon/blob/main/vite.config.ts) - [Pokédex - tsconfig.json](https://github.com/Ksperizer/react-pokemon/blob/main/tsconfig.json) |

---

### B2 - SQL avancé

| Critère | Niveau | Preuve |
|---|---|---|
| Optimisation des performances (index SQL) | Opérationnel | [YnCube - schema Prisma](https://github.com/Ksperizer/yncube/blob/main/BackEnd/prisma/schema.prisma) - index définis sur les clés étrangères |
| Logique métier en base (procédures stockées) | Opérationnel | Projet MatchDoom - `sp_recalculate_user_stats` (repo privé, extraits disponibles sur demande) |
| Automatisation (triggers BEFORE/AFTER INSERT/UPDATE) | Notions/bases | Projet MatchDoom - `tr_users_login_update`, `tr_queue_cleanup` (repo privé, extraits disponibles sur demande) |
| Architecture & choix techniques (MySQL vs PostgreSQL) | Opérationnel | YnCube (MySQL 8.0) - Pokédex backend (PostgreSQL) - choix argumentés selon contexte |

---

### B2 - Data Engineering Python

| Critère | Niveau | Preuve |
|---|---|---|
| Manipulation Pandas, import/export, nettoyage, transformation | Opérationnel | Projets data Python personnels (repos privés) |
| Extraction depuis API REST | Opérationnel | [CinéDark - backend](https://github.com/Ksperizer/cinedark/tree/main/backend) - agrégation de 5 pages TMDb, fallback FR→EN |
| Architecture & choix NoSQL vs SQL | Opérationnel | [CinéDark - docs/neo4j-schema.md](https://github.com/Ksperizer/cinedark/blob/main/docs/neo4j-schema.md) - modélisation en graphe Neo4j argumentée |

---

### Posture pédagogique

| Critère | Niveau | Preuve |
|---|---|---|
| Transmission des connaissances | Maîtrise | Mentor Ynov Toulouse depuis sept. 2025 - modules Go, JS, TS, Java, C#, Python sur B1/B2|
| Création de supports pédagogiques | Maîtrise | Sujets projets B1 (NetflixLight, RetroArcade, PixelArt Studio), module Java avancé B2, workshop Git/Go |
| Feedback & code review | Maîtrise | Rubriques d'évaluation conçues pour NetflixLight (JS/TMDB) et TaskBoard (C#) |
| Animation de groupe | Maîtrise | Piscine Golang Ynov, workshop Git debugging Go en binômes |
| Développement de l'autonomie | Maîtrise | Posture de guide systématique - orientation vers la documentation officielle plutôt que solutions directes |

---

## À venir

- Projet CLI Go (parsing, I/O fichiers, tests unitaires table-driven, README complet)
- Publication des extraits SQL (triggers et procédures MatchDoom)
- Supports de cours Ynov (sujets projets B1, module Java B2)