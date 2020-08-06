/* global collideCircleCircle, random, mouseIsPressed, keyCode, ENTER, clear, createCanvas, strokeWeight, rect, background, colorMode, HSB, noStroke, backgroundColor, color, fill, ellipse, text, stroke, line, width, height, mouseX, mouseY, vX, vY, rad */

let backgroundColor,
  coinX,
  coinY,
  redCoinX,
  redCoinY,
  needRed,
  score,
  time,
  gameIsOver,
  hit,
  hitRed1,
  hitRed2,
  hitRed3,
  coinColor,
  highScore;

let redcoins = [];

/* to do
  - create multiple red coin that spawn in random places
  - if you hit a red coin, the score decreases
  - play again function
  - keep track of high score
*/

function setup() {
  setGame();
  highScore = 0;
  rad = 20;
  vX = 1;
  vY = 2;
}

function draw() {
  background(backgroundColor);
  fill("yellow");
  ellipse(coinX, coinY, 20);
  fill("blue");
  ellipse(mouseX, mouseY, 20);
  fill("black");
  text(`Time remaining: ${time}`, 20, 40);
  handleTime();
  handleCollision();
  if (redcoins.length == 3) {
    needRed = false;
  }
  if (needRed) {
    redcoins.push(new redCoin());
  }
  for (let c of redcoins) {
    c.display();
  }

  if (!gameIsOver) {
    moveCoin();
  }
  fill("Black");
  text(`Score: ${score}`, 20, 60);
  text(`Highest Score: ${highScore}`, 20, 80);
  handleGameOver();
}

function setGame() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  coinX = random(width);
  coinY = random(height);
  score = 0;
  time = 1000;
  gameIsOver = false;
  needRed = false;
}

function keyPressed() {
  if (keyCode == ENTER) {
    setGame();
  }
}

function handleGameOver() {
  if (gameIsOver) {
    text(`Game Over`, width / 2 - 40, height / 2);
    text(`Your score was ${score}`, width / 2 - 55, height / 2 + 20);
    text(
      `Press enter to beat your high score`,
      width / 2 - 100,
      height / 2 + 40
    );
  }
}

function handleCollision() {
  // We'll write code for what happens if your character hits a coin.
  hit = collideCircleCircle(coinX, coinY, 20, mouseX, mouseY, 20);

  if (!gameIsOver && hit == true) {
    randomlyPlaceCoin();
    score++;
    needRed = true;
    redcoins = [];
  }

  if (redcoins.length == 3) {
    hitRed1 = collideCircleCircle(
      redcoins[0].posX,
      redcoins[0].posY,
      20,
      mouseX,
      mouseY,
      20
    );
    hitRed2 = collideCircleCircle(
      redcoins[1].posX,
      redcoins[1].posY,
      20,
      mouseX,
      mouseY,
      20
    );
    hitRed3 = collideCircleCircle(
      redcoins[2].posX,
      redcoins[2].posY,
      20,
      mouseX,
      mouseY,
      20
    );
  }

  if (!gameIsOver && redcoins.length == 3 && (hitRed1 || hitRed2 || hitRed3)) {
    if (hitRed1) {
      redcoins[0].remove(0);
    } else if (hitRed2) {
      redcoins[1].remove(1);
    } else if (hitRed3) {
      redcoins[2].remove(2);
    }
    needRed = true;
    // redcoins = [];
    score -= 5;
  }

  if (score == 10 && hit == true) {
    console.log("hello");
    fill("red");
    if (score == 10) {
      fill("red");
      redCoinX = random(width);
      redCoinY = random(height);
      ellipse(redCoinX, redCoinY, 20);
    }
    score -= 5;
  }
  if (score < 0) {
    score = 0;
    gameIsOver = true;
  }
}

function handleTime() {
  if (time > 0) {
    time--;
  } else {
    gameIsOver = true;
    if (score >= highScore) {
      highScore = score;
    }
  }
}

function randomlyPlaceCoin() {
  fill("yellow");
  coinX = random(width);
  coinY = random(height);
}

function generateRedCoin() {
  if (score == 10) {
    needRed = true;
    redCoinX = random(width);
    redCoinY = random(height);
    fill("red");
    ellipse(redCoinX, redCoinY, 20);
  }
}

function moveCoin() {
  coinX += vX;
  coinY += vY;

  if (coinX >= width - rad / 2 || coinX <= 0 + rad / 2) {
    vX *= -1;
  }

  if (coinY >= height - rad / 2 || coinY <= 0 + rad / 2) {
    vY *= -1;
  }
}

//redcoin object class
function redCoin() {
  // initialize position
  this.posX = random(width);
  this.posY = random(height);
  this.radius = rad;

  this.display = function() {
    fill("Red");
    ellipse(this.posX, this.posY, this.radius);
  };

  this.remove = function(index) {
    redcoins.splice(index, 1);
  };
}
