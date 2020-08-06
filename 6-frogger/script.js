/* global keyCode, UP_ARROW, ENTER, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, collideRectCircle, collideRectRect, collideCircleCircle, random, mouseIsPressed, clear, textSize, createCanvas, strokeWeight, rect, background, colorMode, HSB, noStroke, backgroundColor, color, fill, ellipse, text, stroke, line, width, height, mouseX, mouseY */
/*
The green dot is the frog, the dark red rectangles are the obstacles, the moving red rectangles are cars, and the orangle rectangle is a powerup
*/
let backgroundColor,
  frogX,
  frogY,
  frogV,
  highScore,
  score,
  lives,
  gameIsOver,
  car1,
  car2,
  car3,
  car1X,
  car1Y,
  car1V,
  powerUpX,
  powerUpY,
  wall1X,
  wall1Y,
  wall2X,
  wall2Y,
  timer,
  needcars,
  hasPowerUp;

let cars = [];

function setup() {
  highScore = 0;
  setBoard();

  setupFrog();

  setVariables();
  
}

function setBoard() {
  // Canvas & color settings
  createCanvas(500, 500); // defines the canvas 500 x 500
  colorMode(HSB, 360, 100, 100); // HSB color
  backgroundColor = 95; //grey background
}


function setVariables() {
  score = 0; //score starts off as 0
  lives = 3; //3 lives
  gameIsOver = false;
  hasPowerUp = false;
  //car cant mov
  car1X = 0;
  car1Y = 100;
  car1V = 5;
  needcars = true;
  timer = 0;
  wall1X = random(width - 100);
  wall1Y = random(200, height - 50);
  wall2X = random(width - 100);
  wall2Y = random(200, height - 50);
  setupPowerUp();
}
function setupFrog() {
  frogX = width / 2;
  frogY = 450;
  frogV = 10;
}

function draw() {
  background(backgroundColor);
  // Code for gold goal line
  fill(60, 80, 80);
  rect(0, 0, width, 50);
  // Code to display Frog
  fill(120, 80, 80);
  ellipse(frogX, frogY, 20);

  moveCars();
  drawCars();
  drawPowerUp();
  drawWalls();
  checkCollisions();
  checkWin();
  displayScores();
}
function setupPowerUp() {
  powerUpX = random(width - 30);
  powerUpY = random(200, height - 30);

  // while loop that checks collision of rectangle and rectangle AKA if the obstacles and powerUp overlap
  while (
    collideRectRect(
      powerUpX,
      powerUpY,
      10,
      20,
      wall1X,
      wall1Y,
      50,
      40 && collideRectRect(powerUpX, powerUpY, 10, 20, wall2X, wall2Y, 50, 40)
    )
  ) {
    powerUpX = random(width - 30);
    powerUpY = random(200, height - 30);
  }
}
function drawPowerUp() {
  // Code for car 1
  fill("orange");
  rect(powerUpX, powerUpY, 10, 20);

  if (timer > 0) {
    timer--;
  }

  if (hasPowerUp && timer == 0) {
    hasPowerUp = false;
  }
}
function keyPressed() {
  if (gameIsOver && keyCode === ENTER) {
    setBoard();

    setupFrog();

    setVariables();
    cars = [];
  } else if (gameIsOver) {
    return;
  }

  if (keyCode === UP_ARROW) {
    frogY -= frogV;
  } else if (keyCode === DOWN_ARROW) {
    frogY += frogV;
  } else if (keyCode === RIGHT_ARROW) {
    frogX += frogV;
  } else if (keyCode === LEFT_ARROW) {
    frogX -= frogV;
  }
}

function moveCars() {
  // Move the car
  //   car1X += car1V;

  //   // Reset if it moves off screen
  //   if (car1X > width) {
  //     car1X = -40;
  //   }

  for (let c of cars) {
    c.posX += c.vX;
    if (c.posX > width) {
      c.posX = -40; //car resets to left
    }
  }
}

function drawCars() {
  // Code for car 1
  // fill(0, 80, 80);
  // rect(car1X, car1Y, 40, 30);
  if (cars.length == 3) {
    needcars = false;
  } else if (needcars) {
    cars.push(new car());
  }
  for (let c of cars) {
    c.display();
  }
  // Code for additional cars
}

function drawWalls() {
  fill(1, 82, 60);
  while (collideRectRect(wall1X, wall1Y, 50, 40, wall2X, wall2Y, 50, 40)) {
    wall1X = random(width - 50);
    wall1Y = random(200, height - 5030);
    wall2X = random(width - 50);
    wall2Y = random(200, height - 5030);
  }

  rect(wall1X, wall1Y, 50, 40);
  rect(wall2X, wall2Y, 50, 40);
}

function checkCollisions() {
  // If the frog collides with the car, reset the frog and subtract a life.
  if (!hasPowerUp && cars.length == 3) {
    //collideRectCircle(car1X, car1Y, 40, 30, frogX, frogY, 20
    for (let c of cars) {
      if (collideRectCircle(c.posX, c.posY, 40, 30, frogX, frogY, 20)) {
        setupFrog();
        setupPowerUp();
        lives--;
      }
    }
    // setupFrog();
    // lives--;
  }
  //If the frog collides with the walls, reset the frog and subtract a life
  if (
    !hasPowerUp &&
    (collideRectCircle(wall1X, wall1Y, 50, 40, frogX, frogY, 20) ||
      collideRectCircle(wall2X, wall2Y, 50, 40, frogX, frogY, 20))
  ) {
    setupFrog();
    setupPowerUp();
    lives--;
  }

  // if the frog collides with the POWERUP, then it becomes invincible for a short amount of time
  if (collideRectCircle(powerUpX, powerUpY, 10, 20, frogX, frogY, 20)) {
    setupPowerUp();
    timer += 200;
    hasPowerUp = true;
  }

  // if the frog has no more lives, game over
  if (lives === 0) {
    gameIsOver = true;
    // cars = [];
    if (score > highScore) {
      highScore = score;
    }
  }
}

function checkWin() {
  // If the frog makes it into the yellow gold zone, increment the score
  // and move the frog back down to the bottom.
  if (frogY <= 50) {
    score++;
    console.log(score);
    // cars = [];
    setupFrog();
  }
}

function displayScores() {
  textSize(12);
  fill(0);
  // Display Lives
  text(`Lives: ${lives}`, 10, 15);
  // Display Score
  text(`Score: ${score}`, 10, 30);
  text(`High Score: ${highScore}`, 10, 45);
  text(`Time left with Power Up: ${timer}`, 100, 45);

  // Display game over message if the game is over
  if (gameIsOver) {
    textSize(40);
    text("Game Over!", width / 2 - 100, height / 2);
    textSize(20);
    text("Press enter to play again", width / 2 - 100, height / 2 + 40);
  }
}

function car() {
  this.posX = random(-40, 0);
  this.posY = random(50, height - 100);
  this.vX = random(1, 5);

  this.display = function() {
    fill(0, 80, 80);
    rect(this.posX, this.posY, 40, 30);
  };

  this.remove = function(index) {
    cars.splice(index, 1);
  };
}
