//your JS code here. If required.
let player1Name = '';
let player2Name = '';
let currentPlayer = 1; // 1 for Player 1, 2 for Player 2
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Represents the state of the board

const player1Input = document.getElementById('player-1');
const player2Input = document.getElementById('player-2');
const submitButton = document.getElementById('submit');
const gameBoardDiv = document.querySelector('.game-board');
const cells = document.querySelectorAll('.cell');
const messageDiv = document.querySelector('.message');

submitButton.addEventListener('click', startGame);

function startGame() {
    player1Name = player1Input.value.trim();
    player2Name = player2Input.value.trim();

    if (!player1Name || !player2Name) {
        alert('Please enter both player names.');
        return;
    }

    document.querySelector('.name-inputs').style.display = 'none';
    gameBoardDiv.style.display = 'block';

    messageDiv.textContent = `${player1Name}, you're up!`;
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function handleCellClick(e) {
    const cellId = e.target.id;
    if (gameBoard[cellId - 1]) return; // If the cell is already taken

    gameBoard[cellId - 1] = currentPlayer === 1 ? 'X' : 'O';
    e.target.textContent = currentPlayer === 1 ? 'X' : 'O';
    e.target.classList.add('winner');

    if (checkWinner()) {
        messageDiv.textContent = `${currentPlayer === 1 ? player1Name : player2Name}, congratulations you won!`;
        return;
    }

    currentPlayer = currentPlayer === 1 ? 2 : 1;
    messageDiv.textContent = currentPlayer === 1 ? `${player1Name}, you're up!` : `${player2Name}, you're up!`;
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            cells[a].classList.add('winner');
            cells[b].classList.add('winner');
            cells[c].classList.add('winner');
            return true;
        }
    }
    return false;
}
