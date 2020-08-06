/* global collideCircleCircle, random, mouseIsPressed, clear, createCanvas, strokeWeight, rect, background, colorMode, HSB, noStroke, backgroundColor, color, fill, ellipse, text, stroke, line, width, height, mouseX, mouseY */

let backgroundColor, coinX, coinY, score, time, gameIsOver, hit;

function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  coinX = random(width);
  coinY = random(height);
  time = 1000;
  score = 0;
  gameIsOver = false;
}

function draw() {
  background(backgroundColor);
  ellipse(coinX, coinY, 20);
  ellipse(mouseX, mouseY, 20);
  text(`Time remaining: ${time}`, 20, 40);
  text(`Score: ${score}`, 20, 60);

  hit = collideCircleCircle(coinX, coinY, 20, mouseX, mouseY, 20);
  //text(hit, 20, 60);
  if (hit && !gameIsOver) {
    handleCollision();
  }

  handleTime();
}

function handleCollision() {
  score++;
  coinX = random(width);
  coinY = random(height);
}

function handleTime() {
  if (time > 0) {
    time -= 1;
  } else {
    gameIsOver = true;
  }
}
