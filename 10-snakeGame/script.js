/* global collideRectRect, frameRate, noFill, round, sqrt, loop, windowWidth, windowHeight, keyCode, keyIsDown, keyIsPressed, SHIFT, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, collideRectCircle, collideCircleCircle, random, mouseIsPressed, clear, textSize, createCanvas, strokeWeight, rect, background, colorMode, HSB, noStroke, backgroundColor, color, fill, ellipse, text, stroke, line, width, height, mouseX, mouseY */

let backgroundColor, playerSnake, currentApple, score

function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  frameRate(12);//12 frames per s instead of 60 frames per s
  //snake moves rougher than 60 fps - easier to move snake
  playerSnake = new Snake();
  currentApple = new Apple();
  score = 0;
}

function draw() {
  background(backgroundColor);
  // The snake performs the following four methods:
  playerSnake.moveSelf();
  playerSnake.showSelf();
  playerSnake.checkCollisions();
  playerSnake.checkApples();
  // The apple needs fewer methods to show up on screen.
  currentApple.showSelf();
  // We put the score in its own function for readability.
  displayScore();
}

function displayScore() {
  // stroke(0);
  fill(0); //fill is like inside of text, stroke is like outline of text
  text(`Score: ${score}`, 20, 20);
  noFill();
  // noStroke(); //reset stroke back to 0
}

class Snake {
  constructor() {
    this.size = 10;
    this.x = width/2;
    this.y = height - 10;
    this.direction = 'N';
    this.speed = 12;
    this.tail = [new TailSegment(this.x, this.y)]; //now includes head as 1st el of tail arr
  }

  //if tail crashes against snake - game over
  moveSelf() { //need to change to move tail segs
    if (this.direction === "N" && this.y > 0) {
      this.y -= this.speed;
    } else if (this.direction === "S" && this.y < height - this.size) { 
      this.y += this.speed;
    } else if (this.direction === "E" && this.x < width - this.size) { 
      this.x += this.speed;
    } else if (this.direction === "W" && this.x > 0) { 
      this.x -= this.speed;
    } else {
      console.log("Error: invalid direction");
    }
    
    //move the tail
    
    //put head's current position in 1 end of the arr
    //create tail seg where head it, put it in arr
    let newTail = new TailSegment(this.x, this.y);
    this.tail.push(newTail); //puts it to last el
    
    //shift removes the first el of arr
    //remove the last item fr other end of arr
    this.tail.shift();
    
  }

  showSelf() {
    // console.log
    //dont need head anymore as special case
    // stroke(240, 100, 100);
    // noFill();
    // rect(this.x, this.y, this.size, this.size);
    noStroke();
    
    //for loop here b/c snakes showself method always being called in draw
    //could also do this loop in draw method, but related to snake so should be in this class
    for (let i = 0; i < this.tail.length; i++) {
      this.tail[i].show();
    }
  }

  checkApples() {
    //check if were colliding w/apple
    let hit = collideRectRect(this.x, this.y, this.size, this.size, currentApple.x, currentApple.y, currentApple.size, currentApple.size);
    if(hit) {
      //++ score
      score++

      //make new random apple
      currentApple = new Apple();
    
    //extend tail, make snake longer: create illusion of movement
      this.extendTail();
      
    }
    
  }

  checkCollisions() {
    //when snake collides with itself (head, tail); head is last thing in list
    for(let i = 0; i < this.tail.length-1; i++) {
      if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
        gameOver();
      }
    }
  }

  extendTail() {
    //first think in 1 dir - ++ each value pos in array
    //tail: [4, 3, 2, 1], head: [5]; ----*
    //-> tail[5,4, 3, 2], head[6];    ----*
    
    //in 2 dir - does moving right ++ and left-- work (no collides against)
    //if moving dir - put head where tail end was, and take start el out of arr
    //the last el o tail is the previous steps head?
    this.tail.push(new TailSegment(this.x, this.y)); //very first el goes where head is
    console.log(this.tail);
    
    
  }
}

class TailSegment {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;//same as snake
    this.color = color(240, 100, 100); //could make a color snake pattern
    // this.show();
  }
  
  show() {
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
    noFill()
  }
}

class Apple {
  constructor() {
    this.size = 10; //same size as snake
    //place apples on a grid
    this.x = Math.floor(random(width / 10 - 1)) * 10;// apple's coordinates are always a multiple of 10
    // this.x = random(width - 10);
    //this.y = random(height - 10);
    this.y = Math.floor(random(height/ 10 - 1)) * 10; 
    this.color = color(random(0, 360), 80, 80); // color(0, 80, 80)
  }

  showSelf() {
    // stroke(this.color)
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
    noFill(); 
    // noStroke();
    //keeps color used in other places leaking in other places, 
    //dont need to keep track later by getting rid of it
  }
}

function keyPressed() {
  console.log("key pressed: ", keyCode)
  if (keyCode === UP_ARROW && playerSnake.direction != 'S') {
    playerSnake.direction = "N";
  } else if (keyCode === DOWN_ARROW && playerSnake.direction != 'N') {
    playerSnake.direction = "S";
  } else if (keyCode === RIGHT_ARROW && playerSnake.direction != 'W') {
    playerSnake.direction = "E";
  } else if (keyCode === LEFT_ARROW && playerSnake.direction != 'E') {
    playerSnake.direction = "W";
  } else if (keyCode === 32) {
     playerSnake.extendTail();     
  } 
  
  else {
    console.log("wrong key");
  }
}

function restartGame() {
  //reset score, reset snake to baby snake, restart ani loop (draw)
  score = 0;
  playerSnake = new Snake();
  loop();
}

function gameOver() {
  noLoop(); //stops draw func fr looping
  restartGame();
}
