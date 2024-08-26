const socket = new WebSocket('ws://localhost:3001');
let playerId = null;
let currentPlayer = 'A';

socket.addEventListener('open', () => {
    console.log('Connected to WebSocket server');
});

socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);

    if (data.type === 'assignPlayer') {
        playerId = data.playerId;
        console.log(`You are player ${playerId}`);
    } else if (data.type === 'gameState') {
        renderBoard(data.state);
        currentPlayer = data.state.currentPlayer;
        if (playerId === currentPlayer) {
            console.log('Your turn!');
        } else {
            console.log('Waiting for opponent...');
        }
    } else if (data.type === 'invalidMove') {
        alert('Invalid move: ' + data.reason);
    } else if (data.type === 'gameOver') {
        alert('Game Over! Winner: ' + data.winner);
    }
});

function renderBoard(state) {
    const board = document.getElementById('board');
    board.innerHTML = '';

    state.grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            if (cell) {
                cellDiv.classList.add(`player-${cell.player}`);
                cellDiv.textContent = `${cell.character}`;
            }
            cellDiv.addEventListener('click', () => {
                if (playerId === currentPlayer) {
                    const character = cell ? cell.character : null;
                    makeMove(character, rowIndex, colIndex);
                }
            });
            board.appendChild(cellDiv);
        });
    });
}

function makeMove(character, row, col) {
    const move = prompt('Enter your move (e.g., L, R, F, B):');
    socket.send(JSON.stringify({ type: 'move', character, move, playerId }));
}

function resetGame() {
    socket.send(JSON.stringify({ type: 'reset' }));
}
