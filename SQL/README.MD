# SQL — Extraits MatchDoom

Extraits du projet **MatchDoom**, plateforme de jeu en ligne (Tic Tac Toe multijoueur).

## Fichiers

| Fichier | Description |
|---|---|
| `bdd.sql` | Schéma MySQL complet — tables `users`, `queue`, `matches`, `moves` avec clés étrangères et `ON DELETE CASCADE` |

## Compétences validées (B1 SQL)

- Modélisation relationnelle : 4 entités liées (users → matches → moves, users → queue)
- DDL : `CREATE TABLE`, clés primaires `AUTO_INCREMENT`, clés étrangères, `ON DELETE CASCADE`
- Typage SQL : `INT UNSIGNED`, `VARCHAR`, `TEXT`, `BOOLEAN`, `ENUM`, `TIMESTAMP DEFAULT CURRENT_TIMESTAMP`
- Contraintes : `NOT NULL`, `UNIQUE`, valeurs par défaut

## Compétences validées (B2 SQL avancé)

- Triggers et procédures stockées : pratiqués sur d'autres projets (extraits disponibles sur demande)
- Architecture & choix techniques :
  - MatchDoom → MySQL (schéma relationnel simple, jeu en temps réel)
  - YnCube → MySQL via Prisma (schéma complexe avec relations imbriquées)
  - CinéDark → Neo4j (graphe de collaborations acteur-acteur)
  - Pokédex → PostgreSQL (lecture seule via API externe)