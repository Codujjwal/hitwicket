// server.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3001 });
let players = {};
let gameState = initializeGameState();

function initializeGameState() {
    return {
        grid: Array(5).fill().map(() => Array(5).fill(null)),
        currentPlayer: 'A',
        players: {
            A: { pieces: [], defeated: false },
            B: { pieces: [], defeated: false }
        }
    };
}

function broadcastGameState() {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'gameState', state: gameState }));
        }
    });
}

function handleMove(message) {
    const { playerId, character, move } = message;
    const playerPieces = gameState.players[playerId].pieces;

    const piece = playerPieces.find(p => p.character === character);

    if (!piece || !validateMove(piece, move)) {
        return { type: 'invalidMove', reason: 'Invalid move or character' };
    }

    // Update piece position based on the move
    updateGameState(piece, move);

    if (checkVictoryCondition()) {
        return { type: 'gameOver', winner: playerId };
    }

    gameState.currentPlayer = gameState.currentPlayer === 'A' ? 'B' : 'A';
    return null;
}

function validateMove(piece, move) {
    // Validate move based on piece type and grid boundaries
    return true; // Replace with actual validation logic
}

function updateGameState(piece, move) {
    // Update the position of the piece based on the move
}

function checkVictoryCondition() {
    // Check if any player has won
    return false; // Replace with actual victory condition
}

wss.on('connection', (ws) => {
    if (Object.keys(players).length < 2) {
        const playerId = Object.keys(players).length === 0 ? 'A' : 'B';
        players[playerId] = ws;

        ws.send(JSON.stringify({ type: 'assignPlayer', playerId }));

        if (Object.keys(players).length === 2) {
            broadcastGameState();
        }

        ws.on('message', (message) => {
            const data = JSON.parse(message);

            if (data.type === 'move') {
                const result = handleMove(data);
                if (result) {
                    ws.send(JSON.stringify(result));
                } else {
                    broadcastGameState();
                }
            } else if (data.type === 'reset') {
                gameState = initializeGameState();
                broadcastGameState();
            }
        });
    } else {
        ws.close();
    }
});

console.log('WebSocket server is running on ws://localhost:3001');
