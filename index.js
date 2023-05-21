const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const canvasSize = 400;
const tileSize = 20;
const tileCount = canvasSize / tileSize; // узнаем кол-во клеток на поле
let snake = [{ x: 10, y: 10 }];
let dx = 0;
let dy = -1;
let food = { x: 5, y: 5 };

function update() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
  } else {
    snake.pop();
  }
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= tileCount ||
    head.y >= tileCount ||
    snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(updateInterval);
    clearInterval(drawInterval);
    context.fillStyle = "#fff";
    context.font = "40px Arial blod";
    context.fillText("Game Over", canvasSize / 2 - 100, canvasSize / 2);
    return;
  }
}

function draw() {
  context.clearRect(0, 0, canvasSize, canvasSize);
  snake.forEach(({ x, y }, index) => {
    const radius = tileSize / 2;
    context.beginPath();
    context.arc(x * tileSize + radius, y * tileSize + radius, radius, 0, 2 * Math.PI);
    context.fillStyle = index === 0 ? "#00ff00" : "#00cc00";
    context.fill();
    context.closePath();
  });
  context.fillStyle = "#ff0000";
  context.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
}

document.addEventListener("keydown", ({ key }) => {
  const directions = { w: [0, -1], a: [-1, 0], s: [0, 1], d: [1, 0] };
  if (directions[key]) {
    const [newDx, newDy] = directions[key];
    if (dx + newDx !== 0 || dy + newDy !== 0) {
      dx = newDx;
      dy = newDy;
    }
  }
});

const updateInterval = setInterval(update, 100);
const drawInterval = setInterval(draw, 100);
