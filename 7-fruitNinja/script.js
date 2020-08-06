/* global keyCode, image, loadImage, windowWidth, windowHeight, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, collideRectCircle, collideCircleCircle, random, mouseIsPressed, clear, textSize, createCanvas, strokeWeight, rect, background, colorMode, HSB, noStroke, backgroundColor, color, fill, ellipse, text, stroke, line, width, height, mouseX, mouseY */

let dots,
  watermelons,
  watermelonImage,
  bananaIcon,
  bananas,
  strawberryImage,
  bg,
  strawberries,
  score;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  colorMode(HSB, 360, 100, 100);

  score = 0;

  dots = [];
  bg = loadImage(
    "https://cdn.glitch.com/0a94bd14-2e61-4f18-b6c9-4a7eabeeca53%2FfruitNinjaBackground.jpg?v=1594935325731"
  );
  watermelons = [];
  bananas = [];
  strawberries = [];
  watermelonImage = loadImage(
    "https://cdn.glitch.com/39904289-ad0b-4eef-9878-9b014d69d762%2Fwatermelon.jpg.png?v=1594936951018"
  );
  bananaIcon = loadImage(
    "https://cdn.glitch.com/0a94bd14-2e61-4f18-b6c9-4a7eabeeca53%2Fcroppedbanana.png?v=1594934546203"
  );
  strawberryImage = loadImage(
    "https://cdn.glitch.com/0a94bd14-2e61-4f18-b6c9-4a7eabeeca53%2FstrawberryImage.png?v=1594935123818"
  );

  for (let i = 0; i < 8; i++) {
    // dots.push(new BouncyDot());
    watermelons.push(new Watermelon());
    bananas.push(new Banana());
    strawberries.push(new Strawberry());
  }
}

function draw() {
  background(bg);
  fill("tan");
  rect(0, 0, width, 50);
  fill("black");
  text(`Score: ${score}`, 5, 15);

  // for (let i = 0; i < dots.length; i++) {
  //   dots[i].float();
  //   dots[i].display();
  // }

  for (let i = 0; i < watermelons.length; i++) {
    watermelons[i].float();
    watermelons[i].display();
  }

  for (let i = 0; i < bananas.length; i++) {
    bananas[i].float();
    bananas[i].display();
  }

  for (let i = 0; i < strawberries.length; i++) {
    strawberries[i].float();
    strawberries[i].display();
  }

  /*if (watermelons[i].y == windowHeight - 20 || bananas[i].y == windowHeight - 20 || strawberries[i].y == windowHeight - 20) {
  lives--;
  if (lives < 1) {
    gameIsOver();
    }
}*/
}

function gameIsOver() {}

function mousePressed() {
  // We'll use this for console log statements only.
}

class BouncyDot {
  constructor() {
    // Randomly generate position
    this.x = random(width);
    this.y = random(height);
    // Randomly generate radius
    this.r = random(5, 12);
    // Randomly generate color
    this.color = random(360);
    // Randomly generate a master velocity (broken into components)...
    this.masterXvelocity = random(0.5, 3);
    this.masterYvelocity = random(0.5, 3);
    // ...and use those as starting velocities.
    this.xVelocity = this.masterXvelocity;
    this.yVelocity = this.masterYvelocity;
  }

  float() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    // Standard bounce code - like the DVD logo, but for spheres.
    if (this.x + this.r > width) {
      this.xVelocity = -1 * this.masterXvelocity;
    }
    if (this.x - this.r < 0) {
      this.xVelocity = this.masterXvelocity;
    }
    if (this.y + this.r > height) {
      this.yVelocity = -1 * this.masterYvelocity;
    }
    if (this.y - this.r < 0) {
      this.yVelocity = this.masterYvelocity;
    }
  }

  display() {
    fill(this.color, 80, 70);
    noStroke();
    ellipse(this.x, this.y, this.r * 2);
  }

  checkIfMouseClicked() {
    function mouseClicked(event) {
      for (let i = 0; i < watermelons.length; i++) {
        if (
          event.clientX > watermelons[i].x &&
          event.clientX < watermelons[i].x + 50 &&
          event.clientY > watermelons[i].y &&
          event.clientY < watermelons[i].y + 50
        ) {
          watermelons.splice(i, 1);
          console.log(watermelons);
        } else {
          console.log("No watermelons detected.");
        }
      }

      return false;
    }
  }
}

class Banana extends BouncyDot {
  constructor() {
    super();
    this.x = random(width);
    this.y = random(height);
    this.randomnum = random(0.5, 2);
    this.w = 95.6 * this.randomnum;
    this.l = 51.1 * this.randomnum;
    // this.r = this.randomnum;

    //     this.masterXvelocity = random(0.5, 3);
    //     this.masterYvelocity = random(0.5, 3);

    //     this.xVelocity = this.masterXvelocity;
    //     this.yVelocity = this.masterYvelocity;
  }

  float() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;

    if (this.x + this.w >= width) {
      this.xVelocity = -1 * this.masterXvelocity;
    }
    if (this.x <= 0) {
      this.xVelocity = this.masterXvelocity;
    }
    if (this.y + this.l >= height) {
      this.yVelocity = -1 * this.masterYvelocity;
    }
    if (this.y <= 0) {
      this.yVelocity = this.masterYvelocity;
    }
  }

  // rotate() {
  // imageMode(CENTER);
  // translate(this.x+this.w/2, this.y+this.l/2);
  // rotate(PI/180*angle);
  // image(img, 0, 0, img_width, img_height);
  // rotate(-PI / 180 * img_angle);
  // translate(-(img_x+img_width/2), -(img_y+img_width/2));
  // imageMode(CORNER);
  // }

  display() {
    image(bananaIcon, this.x, this.y, this.w, this.l);
  }
}

class Strawberry {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.w = 519 / 4;
    this.l = 498 / 4;
    this.fallSpeed = 2.5;
  }

  float() {
    this.y += this.fallSpeed;
    if (this.y > height) {
      this.x = random(width);
      this.y = 0;
    }
  }

  display() {
    image(strawberryImage, this.x, this.y, this.w, this.l);
  }
}

class Watermelon {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.d = 20;
    this.height = 18.2;
    this.fallSpeed = random(2, 4);
  }

  display() {
    noStroke();
    image(watermelonImage, this.x, this.y, 50, 50);
  }

  float() {
    this.y += this.fallSpeed;
    if (this.y > height) {
      this.y = 0;
      this.x = random(width);
    }
  }
}

function mouseClicked(event) {
//   need to refactor this & put into code
  
  for (let i = 0; i < watermelons.length; i++) {
    if (
      event.clientX > watermelons[i].x &&
      event.clientX < watermelons[i].x + 50 &&
      event.clientY > watermelons[i].y &&
      event.clientY < watermelons[i].y + 50
    ) {
      watermelons.splice(i, 1);
      score++;
    } else {
      console.log("No watermelons detected.");
    }
  }

  for (let i = 0; i < bananas.length; i++) {
    if (
      event.clientX > bananas[i].x &&
      event.clientX < bananas[i].x + bananas[i].w &&
      event.clientY > bananas[i].y &&
      event.clientY < bananas[i].y + bananas[i].l
    ) {
      bananas.splice(i, 1);
      score++;
    } else {
      console.log("No watermelons detected.");
    }
  }
  
  for (let i = 0; i < strawberries.length; i++) {
    if (
      event.clientX > strawberries[i].x &&
      event.clientX < strawberries[i].x + strawberries[i].w &&
      event.clientY > strawberries[i].y &&
      event.clientY < strawberries[i].y + strawberries[i].l
    ) {
      strawberries.splice(i, 1);
      score++;
    } else {
      console.log("No watermelons detected.");
    }
  }

  return false;
}
