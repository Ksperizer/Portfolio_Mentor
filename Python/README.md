# Python — Extraits CinéDark

Extraits du projet **CinéDark**, application web de catalogue de films avec backend Python et base de données graphe Neo4j.

Repo public : [github.com/Ksperizer/cinedark](https://github.com/Ksperizer/cinedark)

## Stack

- Python (standard library + Neo4j driver + Pydantic)
- Neo4j (base de données graphe)
- Docker Compose

## Fichiers

| Fichier | Description |
|---|---|
| `graph.py` | Requêtes Cypher Neo4j — modélisation en graphe (Movie, Person, Genre, ProductionCompany, Country), contraintes d'unicité, MERGE idempotents, relations ACTED_IN / DIRECTED / COLLABORATED_WITH |
| `config.py` | Configuration Pydantic — `BaseSettings`, chargement `.env`, typage des paramètres |

## Compétences validées

- Python structuré : fonctions, modules, séparation des responsabilités
- Pydantic : `BaseSettings` pour la gestion de configuration typée
- Base de données NoSQL (graphe) : modélisation Neo4j, requêtes Cypher complexes
- Choix d'architecture : NoSQL graphe vs SQL relationnel — cas d'usage des collaborations acteur-acteur
- Extraction et enrichissement de données depuis une API REST (TMDb) avec fallback FR → EN