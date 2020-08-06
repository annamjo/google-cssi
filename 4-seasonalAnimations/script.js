//references:
//https://p5js.org/examples/motion-linear.html
//https://p5js.org/examples/color-linear-gradient.html
//https://creative-coding.decontextualize.com/media/
//https://p5js.org/reference/#/p5/textSize

//assets:
//https://www.clipartmax.com/png/middle/50-501322_computer-icons-green-leaf-clip-art-green-leaf-icon.png
//https://f0.pngfuel.com/png/632/735/silhouette-photo-of-coconut-trees-png-clip-art.png
//https://www.pngkit.com/png/detail/3-31079_rain-cloud-shape-with-a-few-raindrops-icon.png
//https://image.flaticon.com/icons/png/512/66/66557.png

/* global createCanvas, text, map, lerpColor, frameRate, ellipseMode, image, RADIUS, fill, loadImage, rect, background, triangle, quad ellipse, rect, strokeWeight, color, stroke, noFill, colorMode, noStroke, HSB, line, width, height, mouseX, mouseY, textSize */
let snowflakes = []; // array to hold snowflake objects
let rainDrops = []; // array hold raindrop
let a, b;
let leaf, drop, palmtree, snowman;
let leaves = [];

var rad = 60*1.2; // Width of the shape
var xpos, ypos; // Starting position of shape

var xspeed = 2.8; // Speed of the shape
var yspeed = 2.2;

var xdirection = 1; // Left or Right
var ydirection = 1; // Top to Bottom
let c1, c2;

function preload() {
  leaf = loadImage("https://cdn.glitch.com/5421320a-696a-4948-af8b-e9568aa807fc%2Fleaf.png?v=1594421993927");
  drop = loadImage("https://cdn.glitch.com/5421320a-696a-4948-af8b-e9568aa807fc%2Fdrop.png?v=1594504767119");
  palmtree = loadImage('https://cdn.glitch.com/5421320a-696a-4948-af8b-e9568aa807fc%2Fpalms.png?v=1594509889202');
  snowman = loadImage('https://cdn.glitch.com/5421320a-696a-4948-af8b-e9568aa807fc%2Fsnowmanicon.png?v=1594525932196');
}

function setup() {
  // Canvas & color settings
  createCanvas(500, 600);
  colorMode(HSB, 360, 100, 100);
  
  frameRate(30);
  ellipseMode(RADIUS);
  
  xpos = width / 2;
  ypos = height / 3.5;

  c1 = color(255, 102, 30);
  c2 = color(300, 102, 153);

  fill(240);
  noStroke();

  a = height;
  fill("blue");
  b = height;
}

function draw() {
  background(95);
  
  textSize(16);
  fill("Black");
  text("Hover over the seasons to see animations!", width/6, height/2);

  if (mouseX >= width / 16 && mouseX <= width / 16 + 90 && mouseY <= 3 + 40 && mouseY >= 3) {
    drawWinter();
  } else if (mouseX >= width / 4 && mouseX <= width / 4 + 90 && mouseY <= 3 + 40 && mouseY >= 3) {
    drawSpring();
  } else if (mouseX >= width / 2 && mouseX <= width / 2 + 90 && mouseY <= 3 + 40 && mouseY >= 3) {
    // console.log("summer");
    drawSummer();
  } else if (mouseX >= (3 * width) / 4 && mouseX <= (3 * width) / 4 + 90 && mouseY <= 3 + 40 && mouseY >= 3) {
    drawFall();
  }

  drawButtons();

  fill("White");
  text("Winter", width / 16 + 30, 20);
  text("Spring", (4 * width) / 16 + 40, 20);
  text("Summer", (8 * width) / 16 + 25, 20);
  text("Fall", (12 * width) / 16 + 30, 20);
}

//functions for animated scenes:
function drawWinter() {
  drawSnowflakes();
}
function drawFall() {
  drawLeaf();
}
function drawLeaf() {
  background(191, 60, 80);

  let t = frameCount / 60; // update time

  // create a random number of leaves each frame
  for (let i = 0; i < random(3); i++) {
    leaves.push(new Leaf());
  }

  for (let leaf1 of leaves) {
    leaf1.update(t);
    leaf1.display();
  }
}

function drawSpring() {
  //rain
  drawRainDrop();
}

function drawSummer() {
  drawSumm();
  //rays of sunlight
}

function drawButtons() {
  fill("Blue");
  rect(width / 16 + 10, 3, 90, 40);
  fill(202, 63, 85);
  rect((4 * width) / 16 + 20, 3, 90, 40);
  fill("Purple");
  rect((8 * width) / 16 + 10, 3, 90, 40);
  fill("Green");
  rect((12 * width) / 16, 3, 90, 40);
}

//functions for animated scenes:

//snow falling - ellipses/snowflakes; scene includes: snowman, tree
/* global random, frameCount, PI, pow, rect, sqrt, sin */

//got from online source:: https://p5js.org/examples/simulate-snowflakes.html
function drawSnowflakes() {
  background("darkblue");
  image(snowman, width/2, height-256, 256, 256);
  
  fill('White');
  rect(0, a, width, a);
  a = a - 0.25;
  if (a < 0) {
    a = height;
  }
  let t = frameCount / 60; // update time

  // create a random number of snowflakes each frame
  for (let i = 0; i < random(5); i++) {
    snowflakes.push(new snowflake()); // append snowflake object
  }

  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    flake.update(t); // update snowflake position
    flake.display(); // draw snowflake
  }
}

// snowflake class
function snowflake() {
  // initialize coordinates
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 5);

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function(time) {
    // x position follows a circle
    let w = 0.55; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.5);

    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function() {
    fill('White');
    ellipse(this.posX, this.posY, this.size);
  };
}

///rain drop
function drawRainDrop() {
  background("lightblue");
  fill(202, 63, 85);
  rect(0, b, width, b);
  b = b - 0.05;
  if (b < 0) {
    b = height;
  }
  let t = frameCount / 60; // update time

  // create a random number of snowflakes each frame
  for (let i = 0; i < random(5); i++) {
    rainDrops.push(new rainDrop()); // append snowflake object
  }

  // loop through snowflakes with a for..of loop
  for (let drop of rainDrops) {
    drop.update(t); // update snowflake position
    drop.display(); // draw snowflake
  }
}

// rain class
function rainDrop() {
  // initialize coordinates
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 5, 2, 5);

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function(time) {
    // x position follows a circle
    let w = 0.8; // angular speed
    let angle = w * time + this.initialangle / 2;
    this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.5);

    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = rainDrops.indexOf(this);
      rainDrops.splice(index, 1);
    }
  };

  this.display = function() {
    fill("blue");
    // rect(this.posX, this.posY, this.size);
    image(drop, this.posX, this.posY, 15, 27.4);
  };
}

function Leaf() {
  // initialize coordinates
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 5, 2, 5);

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function(time) {
    // x position follows a circle
    let w = 0.3; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.5);

    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = leaves.indexOf(this);
      leaves.splice(index, 1);
    }
  };

  this.display = function() {
    image(leaf, this.posX, this.posY, 40, 20);
  };
}

function drawSumm() {
  background(102);
  setGradient(0, 0, width, height, c1, c2);
  image(palmtree, width/8, height-2*154.75, 2*141.75, 2*154.75);

  // Update the position of the shape
  xpos = xpos + xspeed/2 * xdirection;
  // ypos = ypos + yspeed * ydirechttps://glitch.com/edit/#!/weather-animation?path=script.js%3A317%3A26tion;

  // Test to see if the shape exceeds the boundaries of the screen
  // If it does, reverse its direction by multiplying by -1

  if (xpos >= width-rad|| xpos <= rad) {
    xdirection *= -1;
  }

  // Draw the shape
  noStroke();
  fill("orange");
  ellipse(xpos, ypos, rad, rad);
}

function setGradient(x, y, w, h, c1, c2) {
  noFill();

  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}
