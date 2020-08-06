/* global createCanvas, frameRate, background, keyCode, UP_ARROW, DOWN_ARROW, stroke
   noFill, rect, fill, key, keyIsDown, circle, collideRectCircle, random, tan, round,
   PI, textSize, text, delayTime, noLoop, redraw, loop, cos, sin, colorMode, HSB
*/

//modified for Google CSSI

let width,
  height,
  player1,
  player2,
  pongBall,
  paddleWidth,
  paddleHeight,
  circleRadius,
  player1Score,
  player2Score;
function setup() {
  width = 800;
  height = 600;
  colorMode(HSB, 360, 100, 100)
  paddleWidth = 20;
  paddleHeight = 80;
  circleRadius = 10; //actually circle diameter
  player1Score = 0;
  player2Score = 0;
  createCanvas(width, height);
  frameRate(30);

  //creates two Paddle objects, player1 and player 2
  player1 = new Paddle(20, 20, 1); //left
  player2 = new Paddle(760, 400, 2); //right

  //creates a Ball object, names pongBall
  pongBall = new Ball(width / 2, height / 2, 255, 0, 0);
}

function draw() {
  background(0, 0, 90.2);
  movePlayer1();
  player1.showSelf();
  movePlayer2();
  player2.showSelf();
  pongBall.moveSelf();
  pongBall.showSelf();
  displayScores();

  checkCollisions();
  checkWin();
}

class Ball {
  constructor(x, y, r, g, b) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.g = g;
    this.b = b;
    this.angle = random(PI/6, PI/3) + (round(random(0, 3)) * (PI / 2));
    this.vel = 20;
  }

  showSelf() {
    stroke(this.r, this.g, this.b);
    fill(this.r, this.g, this.b);
    circle(this.x, this.y, circleRadius);
  }

  moveSelf() {
    if (this.y - circleRadius < 0 || this.y + circleRadius > height) {
      this.angle = 2 * PI - this.angle;
    }

    this.x += this.vel * cos(this.angle);
    this.y += this.vel * sin(this.angle);
  }
}

class Paddle {
  //TODO 1: Complete the constructor and showSelf methods
  constructor(x, y, playerNum) {
    this.x = x;
    this.y = y;
    this.speed = 13;
    this.h = 120;
    this.w = 20;
    if (playerNum == 1) {
      this.hue = 146;
      this.s = 50.3;
      this.l = 65;
    } else {
      this.hue = 300;
      this.s = 100;
      this.l = 50;
    }
  }
  randomize() {
    this.hue = random(0, 360);
    this.s = random(50, 100);
    this.l = random(40, 100);
  }
  showSelf() {
    stroke(this.hue, this.s, this.l);
    fill(this.hue, this.s, this.l);
    rect(this.x, this.y, this.w, this.h);
  }
}

//TODO 3: Complete movePlayer1() and movePlayer2()
function movePlayer1() {
  //if certain keys are pressed, then player1.y should either increment or decrement
  if (keyIsDown(87) && player1.y > 0) {
    //w
    player1.y -= player1.speed;
  } else if (keyIsDown(83) && player1.y < height - player2.h) {
    //s
    player1.y += player1.speed;
  }
}

function movePlayer2(up) {
  //if certain keys are pressed, then player2.y should either increment or decrement
  if (keyIsDown(73) && player2.y > 0) {
    //i
    player2.y -= player2.speed;
  } else if (keyIsDown(75) && player2.y < height - player2.h) {
    //k
    player2.y += player2.speed;
  }
}

function checkCollisions() {
  //use collide2D to check for collisions between either of the paddles and the ball
  //if a collision happens, the ball should move in the opposite direction and "speed" (deltaX)
  let hit1 = collideRectCircle(
    player1.x + circleRadius / 2,
    player1.y,
    player1.w,
    player1.h,
    pongBall.x,
    pongBall.y,
    circleRadius
  );
  let hit2 = collideRectCircle(
    player2.x - circleRadius / 2,
    player2.y,
    player2.w,
    player2.h,
    pongBall.x,
    pongBall.y,
    circleRadius
  );

  if (hit1 || hit2) {
    if (hit1) {
      player1.randomize();
    } else if (hit2) {
      player2.randomize();
    }
    pongBall.deltaX = -pongBall.deltaX;
    pongBall.angle = PI - pongBall.angle;
  }
}

function displayScores() {
  stroke("black");
  fill("black");
  textSize(12);
  text(`Player 1: ${player1Score}`, 10, 20);
  text(`Player 2: ${player2Score}`, width - 80, 20);
}

function checkWin() {
  if (pongBall.x < player1.x + 10) {
    //out of bounds on left
    player2Score++;
    resetBall();
  }

  if (pongBall.x > player2.x + 10) {
    //out of bounds on right
    player1Score++;
    resetBall();
  }
  //checks if either player has won and displays message
  if (player1Score === 10) {
    background(0, 0, 90.2);
    textSize(50);
    text("Player One Wins!", width / 4, height / 2);
    textSize(20);
    text("Press R to play Again", width / 3, height / 3);
  }
  if (player2Score === 10) {
    background(0, 0, 90.2);
    textSize(50);
    text("Player Two Wins!", width / 4, height / 2);
    textSize(20);
    text("Press R to play Again", width / 3, height / 3);
  }
}

 function keyPressed()
  {
    if (keyCode === 82) { //resets the game 
      resetBall();
      player1Score = 0;
      player2Score = 0;
    }
  } 

function resetBall() {
  pongBall.x = width / 2;
  pongBall.y = height / 2;
  pongBall.angle = random(PI/6, PI/3) + (round(random(0, 3)) * (PI / 2));
  // var i = 0;
  // while (i < 100000000) { // pause before the next round
  //   i += 1;
  //   noLoop();
  // }
  loop();
}
