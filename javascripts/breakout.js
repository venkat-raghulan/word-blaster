// Global variables

var scoreDiv = document.getElementById("score");
var livesDiv = document.getElementById("lives");
var bonusDone = false;
var highScore;
if (!window.localStorage.getItem("highScore")) {
  highScore = "0";
} else {
  highScore = window.localStorage.getItem("highScore");
}

// canvas variables

var canvas = document.getElementById("breakout");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 30;

//Game Mechanics

var score = 0;
var lives = 1;

// ball
const ballRadius = 10;

//ball speed
var dx = 2;
var dy = -2;
var speedRate = 1.02;

// paddle
const paddleHeight = 10;
const paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

//controls

var rightPressed = false;
var leftPressed = false;
var spacePressed = false;

//bricks

const brickRowCount = 5;
const brickColumnCount = 8;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
var pausedFlag = false;
const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1, letter: "", activateToken: false };
  }
}

function letterActive() {
  letterBoxes.forEach(element => {
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
        if (
          bricks[c][r].letter == element.textContent &&
          bricks[c][r].activateToken == false &&
          bricks[c][r].status == 0 &&
          !element.classList.contains("active")
        ) {
          element.classList.add("active");
          bricks[c][r].activateToken = true;
          break;
        }
      }
    }
  });
}

//

//event listeners

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function bonus() {
  if (
    letterBoxes[0].classList.contains("active") &&
    letterBoxes[1].classList.contains("active") &&
    letterBoxes[2].classList.contains("active") &&
    letterBoxes[3].classList.contains("active") &&
    letterBoxes[4].classList.contains("active") &&
    !bonusDone
  ) {
    score = score + 50;
    bonusDone = true;
  }
}

function keyDownHandler(e) {
  if (e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "ArrowLeft") {
    leftPressed = true;
  } else if (e.code == "Space") {
    spacePressed = true;
    if (pausedFlag) {
      pausedFlag = false;
      document.querySelector(".overlay").classList.remove("active");
      document.querySelector(".life-lost").classList.remove("active");
    }
  }
}

function keyUpHandler(e) {
  if (e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "ArrowLeft") {
    leftPressed = false;
  } else if (e.code == "Space") {
    spacePressed = false;
  }
}

// Detect collision

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          score++;
          if (score == brickRowCount * brickColumnCount) {
            // alert("YOU WIN, CONGRATULATIONS!");
            // document.location.reload();
          }
        }
      }
    }
  }
}

//update score

function updateScore() {
  scoreDiv.innerHTML = "Your Score: " + score;
}

//update lives

function updateLives() {
  livesDiv.innerHTML = "Lives: " + lives;
}

// Draw ball

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// Draw paddle

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#000000";
  ctx.fill();
  ctx.closePath();
}

// Draw bricks

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#cb4154";
        ctx.fill();
        ctx.font = "12px Montserrat";
        ctx.fillStyle = "white";
        ctx.fillText(
          lettersArray[c * brickRowCount + r],
          brickX + 35,
          brickY + 15
        );
        bricks[c][r].letter = lettersArray[c * brickRowCount + r];
        ctx.closePath();
      }
    }
  }
}

// Ball control

function moveBall() {
  if (y + dy < ballRadius) {
    dy = -speedRate * dy;
  } else if (y + dy > canvas.height - ballRadius) {
    // change direction depending on where it hits the paddle
    if (x > paddleX && x <= paddleX + paddleWidth / 2) {
      if (dx > 0) {
        dx = -speedRate * dx;
      }
      dy = -dy;
    } else if (x > paddleX + paddleWidth / 2 && x < paddleX + paddleWidth) {
      if (dx < 0) {
        dx = -speedRate * dx;
      }
      dy = -dy;
    } else {
      if (!lives) {
        if (score > highScore) {
          highScore = score;
          window.localStorage.setItem("highScore", JSON.stringify(highScore));
        }

        document.getElementById("score-span").innerHTML += `${score}`;
        document.getElementById("high-score-span").innerHTML += `${highScore}`;
        document.querySelector(".game-over").classList.add("active");

        overlay.classList.add("active");

        pausedFlag = true;
        if (spacePressed) {
          document.location.reload();
          overlay.classList.remove("active");
        }
      } else {
        lives--;
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
        pausedFlag = true;
        document.querySelector(".life-lost").classList.add("active");
        document.getElementById("lives-span").innerHTML = `${lives}`;
        overlay.classList.add("active");
      }
    }
  }
  if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
    dx = -speedRate * dx;
  }
  x += dx;
  y += dy;
}

// Paddle control

function movePaddle() {
  if (rightPressed) {
    paddleX += 7;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  } else if (leftPressed) {
    paddleX -= 7;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }
}

// Overall game

function draw() {
  // drawing code
  if (!pausedFlag) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    updateScore();
    updateLives();
    collisionDetection();
    letterActive();
    moveBall();
    movePaddle();
    bonus();
    console.log("drawing");
  }
  requestAnimationFrame(draw);
}

populateWord(randomword);
shuffle(lettersArray);
draw();
$highScore.innerHTML += highScore;
