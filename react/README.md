# React — Extraits Pokédex

Extraits du projet **Pokédex React**, application SPA avec authentification JWT, gestion d'état Redux Toolkit et consommation d'API via RTK Query.

Repo public : [github.com/Ksperizer/react-pokemon](https://github.com/Ksperizer/react-pokemon)

## Stack

- React 19 / TypeScript
- Redux Toolkit / RTK Query
- React Router v7
- Vite

## Fichiers

| Fichier | Description |
|---|---|
| `index.ts` | Configuration du store Redux — deux API slices (`pokemonApi`, `authApi`), deux reducers (`team`, `auth`), `setupListeners`, types `RootState` et `AppDispatch` |
| `pokemonApi.ts` | RTK Query — `createApi`, `fetchBaseQuery`, 3 endpoints typés, `transformResponse` avec `filter`, `providesTags` |
| `authApi.ts` | RTK Query auth — `prepareHeaders` avec injection JWT, décodage token (`atob`), `transformResponse`, `tagTypes` |
| `authSlice.ts` | Slice auth — `createSlice`, `extraReducers` avec `addMatcher` sur RTK Query, persistance localStorage |
| `teamSlice.ts` | Slice équipe — 4 actions (`addToTeam`, `removeFromTeam`, `clearTeam`, `reorderTeam`), logique métier (MAX_TEAM_SIZE, déduplication), sélecteurs typés |
| `routes.tsx` | React Router v7 — routes imbriquées, `RootLayout`, route index, routes dynamiques `pokemon/:id` et `generation/:genId`, page 404 |

## Compétences validées

- TypeScript strict : interfaces, types utilitaires, génériques RTK Query
- Redux Toolkit : store multi-slices, `createSlice`, `extraReducers`, `addMatcher`
- RTK Query : `createApi`, cache avec `providesTags`, `transformResponse`, `prepareHeaders`
- Auth JWT côté client : injection du token dans les headers, décodage, persistance
- React Router v7 : routes imbriquées, `RootLayout`, navigation programmatique
- Architecture SPA : séparation store / api / pages / components / router