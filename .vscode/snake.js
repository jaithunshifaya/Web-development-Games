const board = document.getElementById("game-board");
const scoreDisplay = document.getElementById("score");
const gameOverDisplay = document.getElementById("game-over");
const boardSize = 20;

let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let direction = { x: 1, y: 0 }; // Start moving right
let score = 0;
let interval;

function createBoard() {
  board.innerHTML = "";
  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (snake.some(segment => segment.x === x && segment.y === y)) {
        cell.classList.add("snake");
      }
      if (food.x === x && food.y === y) {
        cell.classList.add("food");
      }
      board.appendChild(cell);
    }
  }
}

function moveSnake() {
  const head = { ...snake[0] };
  head.x += direction.x;
  head.y += direction.y;

  if (
    head.x < 0 || head.x >= boardSize ||
    head.y < 0 || head.y >= boardSize ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(interval);
    gameOverDisplay.style.display = "block";
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreDisplay.textContent = "Score: " + score;
    placeFood();
  } else {
    snake.pop();
  }
}

function placeFood() {
  let newFood;
  do {
    newFood = {
      x: Math.floor(Math.random() * boardSize),
      y: Math.floor(Math.random() * boardSize),
    };
  } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
  food = newFood;
}

function gameLoop() {
  moveSnake();
  createBoard();
}

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp": if (direction.y === 0) direction = { x: 0, y: -1 }; break;
    case "ArrowDown": if (direction.y === 0) direction = { x: 0, y: 1 }; break;
    case "ArrowLeft": if (direction.x === 0) direction = { x: -1, y: 0 }; break;
    case "ArrowRight": if (direction.x === 0) direction = { x: 1, y: 0 }; break;
  }
});

function restartGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 1, y: 0 };
  score = 0;
  scoreDisplay.textContent = "Score: 0";
  placeFood();
  gameOverDisplay.style.display = "none";
  clearInterval(interval);
  interval = setInterval(gameLoop, 200);
  createBoard();
}

// Start the game
interval = setInterval(gameLoop, 200);
createBoard();
