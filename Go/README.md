# Go — Extraits MatchDoom

Extraits du projet **MatchDoom**, plateforme de jeu en ligne (Tic Tac Toe multijoueur) développée en Go avec un backend MySQL et une couche WebSocket.

## Stack

- Go (net/http, gorilla/mux, gorilla/websocket)
- MySQL 8.0
- Python (logique de jeu via WebSocket)

## Fichiers

| Fichier | Description |
|---|---|
| `main.go` | Point d'entrée — initialisation BDD, lancement serveur |
| `server.go` | Serveur HTTP — routing statique, pages, API REST, WebSocket |
| `matchmaking.go` | Logique métier — algorithme `CheckWinner`, `IsBoardFull`, gestion des parties |
| `user.go` | Handlers HTTP — register, login (bcrypt), profil, leaderboard, stats, queue |

## Compétences validées (B1)

- Programmation en Go : syntaxe, structs, fonctions, gestion d'erreurs idiomatique
- Organisation du code : packages séparés (`back`, `handlers`, `data`)
- Communication HTTP en Go : `net/http`, `gorilla/mux`, routes GET/POST
- Génération de pages dynamiques : `html/template`
- Algorithme en Go : `CheckWinner` (8 combinaisons gagnantes), `IsBoardFull`
- Authentification : bcrypt, validation des entrées, gestion des conflits
- Architecture web : séparation frontend (HTML/CSS/JS) / backend Go / BDD MySQL