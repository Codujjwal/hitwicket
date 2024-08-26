# Turn-Based Chess-Like Game

This is a turn-based chess-like game implemented with a server-client architecture, utilizing WebSockets for real-time communication and a web-based user interface.

## Table of Contents

1. [Features](#features)
2. [Game Rules](#game-rules)
3. [Setup Instructions](#setup-instructions)
4. [Run Instructions](#run-instructions)
5. [Gameplay](#gameplay)
6. [Future Enhancements](#future-enhancements)

## Features

- Real-time multiplayer gameplay using WebSockets.
- Turn-based mechanics with a chess-like game structure.
- Customizable team compositions with various character types.
- Dynamic and responsive web-based user interface.

## Game Rules

- The game is played on a 5x5 grid.
- Two players, each controlling 5 characters, take turns to move.
- Each character has unique movement capabilities.
- The objective is to eliminate all of the opponent's characters.

For detailed rules, see the **Game Rules** section in the `game-rules.md` file.

## Setup Instructions

### Prerequisites

- **Node.js** and **npm** (Node Package Manager) installed on your machine.
- A web browser to run the client-side application (e.g., Chrome, Firefox).

### 1. Server Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/chess-like-game.git
   cd chess-like-game
