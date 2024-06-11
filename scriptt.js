// script.js

let currentPlayer = 'X';
let gameState = Array(9).fill(null);
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    if (gameState[cellIndex] || checkWinner() || currentPlayer === 'O') {
        return;
    }

    makeMove(cell, cellIndex);
    if (!checkWinner() && !gameState.every(cell => cell)) {
        currentPlayer = 'O';
        setTimeout(makeComputerMove, 500);
    }
}

function makeMove(cell, index) {
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(`player-${currentPlayer}`);

    if (checkWinner()) {
        setTimeout(() => alert(`Player ${currentPlayer} wins!`), 100);
        highlightWinningCells();
    } else if (gameState.every(cell => cell)) {
        setTimeout(() => alert('Draw!'), 100);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function makeComputerMove() {
    let availableCells = gameState.map((val, index) => val === null ? index : null).filter(val => val !== null);
    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    let cell = document.querySelector(`.cell[data-index='${randomIndex}']`);
    makeMove(cell, randomIndex);
}

function checkWinner() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

function highlightWinningCells() {
    const winningCondition = winningConditions.find(condition => {
        const [a, b, c] = condition;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });

    if (winningCondition) {
        winningCondition.forEach(index => {
            document.querySelector(`.cell[data-index='${index}']`).classList.add('winner');
        });
    }
}

function resetGame() {
    gameState.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('player-X', 'player-O', 'winner');
    });
    currentPlayer = 'X';
}
