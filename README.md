# Portfolio Mentor — Kevin Cazeneuve

Ce dépôt centralise les preuves techniques et pédagogiques associées à ma candidature au poste de mentor à Ynov Toulouse.  
Chaque projet listé ci-dessous est référencé par les compétences qu'il valide dans les grilles de positionnement B1, B2 et Posture.

---

## Projets

| Projet | Stack | Accès |
|---|---|---|
| YnCube | Node.js / Express / TypeScript / Prisma / MySQL / Vue 3 / Docker | Extraits dans `TypeScript/` |
| MatchDoom | Go / MySQL / WebSocket / Python | Extraits dans `Go/` et `SQL/` |
| CinéDark | React / Vite / Python / Neo4j / Docker | [github.com/Ksperizer/cinedark](https://github.com/Ksperizer/cinedark) |
| Pokédex React | React / TypeScript / Redux Toolkit / RTK Query / React Router v7 | [github.com/Ksperizer/react-pokemon](https://github.com/Ksperizer/react-pokemon) |

---

## Mapping compétences → preuves

### B1 — Immersion Go, Git, Environnement

| Critère | Niveau | Preuve |
|---|---|---|
| Fondamentaux Git (add, commit, push, pull, clone) | Maîtrise | Historique de commits sur CinéDark et Pokédex — conventions de nommage, messages structurés |
| Gestion des branches (GitFlow, merge, conflits) | Maîtrise | Stratégie de branches appliquée sur projets multi-contributeurs |
| Collaboration en équipe (PR, code review) | Maîtrise | Rôle lead backend sur YnCube (projet multi-contributeurs) |
| Bonnes pratiques de dépôt (README, gitignore, organisation) | Maîtrise | Ce dépôt — README structuré par module, gitignore, organisation en dossiers |
| Commandes avancées (stash, rebase, cherry-pick) | Opérationnel | Pratique sur projets collaboratifs GitHub |
| Programmation en Go (syntaxe, types, fonctions, structs) | Opérationnel | [`Go/user.go`](Go/user.go) — handlers HTTP, structs, JSON, bcrypt |
| Organisation et structuration du code Go | Opérationnel | [`Go/main.go`](Go/main.go) — packages `back`, `handlers`, `data` séparés |
| Communication HTTP en Go | Opérationnel | [`Go/server.go`](Go/server.go) — `gorilla/mux`, routing, WebSocket |
| Algorithmes & logique métier en Go | Opérationnel | [`Go/matchmaking.go`](Go/matchmaking.go) — `CheckWinner`, `IsBoardFull` |
| Gestion d'erreurs idiomatique Go | Opérationnel | [`Go/user.go`](Go/user.go) — pattern `if err != nil` systématique |

---

### B1 — HTML / CSS

| Critère | Niveau | Preuve |
|---|---|---|
| Structure HTML5 sémantique | Maîtrise | YnCube (projet en production — yncube.fr) |
| Flexbox & Grid | Maîtrise | YnCube FrontEnd — composants Vue avec CSS vanilla |
| Responsive design (media queries, mobile-first) | Maîtrise | YnCube — PWA déployée, approche mobile-first |
| Positionnement (relative, absolute, fixed) | Maîtrise | YnCube — composants layout |
| Production d'interface complète | Maîtrise | [yncube.fr](https://yncube.fr) — interface en production |

---

### B1 — Bases de données SQL

| Critère | Niveau | Preuve |
|---|---|---|
| Modélisation des données (entités, relations) | Opérationnel | [`SQL/bdd.sql`](SQL/bdd.sql) — tables `users`, `queue`, `matches`, `moves` avec clés étrangères |
| DDL (CREATE TABLE, clés étrangères, ON DELETE CASCADE) | Maîtrise | [`SQL/bdd.sql`](SQL/bdd.sql) |
| DQL (SELECT, WHERE, JOIN, GROUP BY, agrégations) | Maîtrise | [`Go/user.go`](Go/user.go) — requêtes SQL avec classement et calcul de win rate |
| DML (INSERT, UPDATE, DELETE) | Maîtrise | [`Go/user.go`](Go/user.go) — CRUD utilisateurs et stats |

---

### B1 — Application CLI & Parsing en Go

| Critère | Niveau | Preuve |
|---|---|---|
| Architecture & structuration de projet Go | Opérationnel | [`Go/main.go`](Go/main.go) + [`Go/server.go`](Go/server.go) — séparation des packages |
| Gestion d'erreurs & robustesse | Opérationnel | [`Go/user.go`](Go/user.go) — validation des champs, messages d'erreur utilisateur |
| Documentation README | Maîtrise | [`Go/README.md`](Go/README.md) |

---

### B1 — Algorithmie

| Critère | Niveau | Preuve |
|---|---|---|
| Implémentation d'un algorithme en Go | Opérationnel | [`Go/matchmaking.go`](Go/matchmaking.go) — `CheckWinner` (lignes, colonnes, diagonales) + `IsBoardFull` |
| Décomposition de problème, edge cases | Opérationnel | [`Go/matchmaking.go`](Go/matchmaking.go) — vérification exhaustive des 8 combinaisons gagnantes |

---

### B1 — JavaScript & DOM

| Critère | Niveau | Preuve |
|---|---|---|
| Fondamentaux JS (variables, types, fonctions, portée) | Maîtrise | [Pokédex — App.tsx](https://github.com/Ksperizer/react-pokemon/blob/main/src/App.tsx) |
| Manipulation des données (map, filter, reduce, callbacks) | Maîtrise | [`react/pokemonApi.ts`](react/pokemonApi.ts) — `transformResponse` avec `filter` |
| Programmation asynchrone (async/await, promesses) | Maîtrise | [`TypeScript/auth.service.ts`](TypeScript/auth.service.ts) — toutes les méthodes sont async |
| POO (classes, encapsulation) | Maîtrise | [`TypeScript/auth.service.ts`](TypeScript/auth.service.ts) — `class authService` / [`TypeScript/events.service.ts`](TypeScript/events.service.ts) — `class EventsService` |

---

### B1 — Développement Web & API

| Critère | Niveau | Preuve |
|---|---|---|
| Fondamentaux REST (méthodes HTTP, codes de réponse) | Maîtrise | [`Go/server.go`](Go/server.go) — routes GET/POST + [`TypeScript/auth.service.ts`](TypeScript/auth.service.ts) |
| Manipulation des données JSON | Maîtrise | [`Go/user.go`](Go/user.go) — `json.NewDecoder` / `json.NewEncoder` |
| Architecture web (séparation frontend/backend) | Maîtrise | MatchDoom (Go backend + HTML/CSS/JS frontend) — YnCube (Docker Compose 3 services) |
| Génération de pages dynamiques | Opérationnel | [`Go/server.go`](Go/server.go) — `html/template` avec données dynamiques |

---

### B1 — Projet Fullstack (Forum)

| Critère | Niveau | Preuve |
|---|---|---|
| Architecture de l'application | Opérationnel | [`Go/server.go`](Go/server.go) — `setupStaticRoutes`, `setupPageRoutes`, `setupAPIRoutes` |
| Authentification (inscription, connexion) | Opérationnel | [`Go/user.go`](Go/user.go) — `RegisterUser` + `LoginUser` avec bcrypt |
| Gestion de la base de données (CRUD) | Opérationnel | [`Go/user.go`](Go/user.go) — stats, leaderboard, queue matchmaking |
| Intégration fullstack | Opérationnel | [yncube.fr](https://yncube.fr) — application en production |

---

### B2 — Python Backend & FastAPI

| Critère | Niveau | Preuve |
|---|---|---|
| POO Python appliquée au backend | Opérationnel | [`Python/graph.py`](Python/graph.py) — fonctions Python structurées, requêtes Cypher Neo4j |
| Pydantic & configuration | Notions/bases | [`Python/config.py`](Python/config.py) — `BaseSettings` Pydantic |
| Architecture backend Python | Opérationnel | [`Python/graph.py`](Python/graph.py) — séparation requêtes / logique métier |

> FastAPI : pas de projet complet livré. Compétence REST maîtrisée via Express/TypeScript (YnCube). Montée en compétences FastAPI prévue.

---

### B2 — React.js & TypeScript

| Critère | Niveau | Preuve |
|---|---|---|
| Fondamentaux TypeScript (types, interfaces, génériques) | Maîtrise | [`TypeScript/auth.middleware.ts`](TypeScript/auth.middleware.ts) — types stricts, `IJwtPayload`, `UserRole` |
| Composants React fonctionnels | Maîtrise | [Pokédex — pages/](https://github.com/Ksperizer/react-pokemon/tree/main/src/pages) |
| Gestion de l'état (Redux Toolkit) | Maîtrise | [`react/index.ts`](react/index.ts) — store avec deux API slices |
| Gestion de l'état avancée (slice, extraReducers) | Maîtrise | [`react/authSlice.ts`](react/authSlice.ts) — `addMatcher` sur RTK Query |
| Logique métier dans le store | Maîtrise | [`react/teamSlice.ts`](react/teamSlice.ts) — MAX_TEAM_SIZE, déduplication, sélecteurs typés |
| Navigation & architecture SPA | Opérationnel | [`react/routes.tsx`](react/routes.tsx) — routes imbriquées, RootLayout, 404, routes dynamiques |
| Communication avec les APIs (RTK Query) | Maîtrise | [`react/pokemonApi.ts`](react/pokemonApi.ts) — `createApi`, `fetchBaseQuery`, `transformResponse` |
| Auth JWT côté client | Maîtrise | [`react/authApi.ts`](react/authApi.ts) — `prepareHeaders`, décodage JWT |
| Outils & environnement (Vite, TypeScript) | Maîtrise | [Pokédex — vite.config.ts](https://github.com/Ksperizer/react-pokemon/blob/main/vite.config.ts) |

---

### B2 — SQL avancé

| Critère | Niveau | Preuve |
|---|---|---|
| Modélisation relationnelle | Opérationnel | [`SQL/bdd.sql`](SQL/bdd.sql) — 4 tables, relations, contraintes |
| Optimisation des performances (index SQL) | Opérationnel | YnCube schema Prisma — index sur clés étrangères |
| Logique métier en base (procédures stockées) | Opérationnel | Projet MatchDoom — `sp_recalculate_user_stats` (extrait disponible sur demande) |
| Automatisation (triggers) | Notions/bases | Projet MatchDoom — triggers BEFORE/AFTER UPDATE (extraits disponibles sur demande) |
| Architecture & choix techniques (MySQL vs PostgreSQL) | Opérationnel | YnCube (MySQL 8.0) — CinéDark (Neo4j) — Pokédex backend (PostgreSQL) |

---

### B2 — Data Engineering Python

| Critère | Niveau | Preuve |
|---|---|---|
| Manipulation Pandas, import/export, nettoyage | Opérationnel | Projets data Python personnels |
| Extraction depuis API REST | Opérationnel | [`Python/graph.py`](Python/graph.py) — agrégation et enrichissement de données depuis TMDb |
| Architecture & choix NoSQL vs SQL | Opérationnel | [`Python/graph.py`](Python/graph.py) — modélisation en graphe Neo4j (Movie, Person, Genre, relations ACTED_IN / DIRECTED / COLLABORATED_WITH) |

---

### Posture pédagogique

| Critère | Niveau | Preuve |
|---|---|---|
| Transmission des connaissances | Maîtrise | Mentor Ynov Toulouse depuis sept. 2025 — Go, JS, TS, Java, C#, Python sur B1/B2/B3 |
| Création de supports pédagogiques | Maîtrise | Sujets projets B1 (NetflixLight, RetroArcade, PixelArt Studio), module Java avancé B2, workshop Git/Go |
| Feedback & code review | Maîtrise | Rubriques d'évaluation conçues pour NetflixLight (JS/TMDB) et TaskBoard (C#) |
| Animation de groupe | Maîtrise | Piscine Golang Ynov, workshop Git debugging Go en binômes |
| Développement de l'autonomie | Maîtrise | Posture de guide systématique — orientation vers la documentation plutôt que solutions directes |

---

## À venir

- Supports de cours Ynov (`pedagogique/`) — sujets projets B1, module Java B2, rubriques d'évaluation