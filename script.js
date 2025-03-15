document.getElementById("submit").addEventListener("click", startGame);

let player1 = "";
let player2 = "";
let currentPlayer = "";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function startGame() {
  player1 = document.getElementById("player-1").value;
  player2 = document.getElementById("player-2").value;

  if (!player1 || !player2) {
    alert("Please enter names for both players.");
    return;
  }

  document.querySelector(".player-inputs").style.display = "none";
  document.querySelector(".game-board").style.display = "block";
  
  currentPlayer = player1; // Player 1 starts the game
  updateMessage();
}

function updateMessage() {
  const message = document.querySelector(".message");
  message.textContent = `${currentPlayer}, you're up!`;
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6] // diagonal
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameActive = false;
      document.querySelector(".message").textContent = `${currentPlayer} congratulations you won!`;
      return;
    }
  }

  if (!gameBoard.includes("")) {
    gameActive = false;
    document.querySelector(".message").textContent = "It's a draw!";
  }
}

function handleCellClick(cellId) {
  if (!gameActive || gameBoard[cellId - 1]) return;

  gameBoard[cellId - 1] = currentPlayer === player1 ? "X" : "O";
  document.getElementById(cellId).textContent = gameBoard[cellId - 1];

  checkWinner();
  
  if (gameActive) {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    updateMessage();
  }
}

const cells = document.querySelectorAll(".cell");
cells.forEach(cell => {
  cell.addEventListener("click", function() {
    handleCellClick(cell.id);
  });
});
