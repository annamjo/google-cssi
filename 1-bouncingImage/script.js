/* global createCanvas, background, ellipse, rect, strokeWeight, color, stroke, noFill, loadImage, image, tint, random */

let x, xVelocity, y, yVelocity, lwidth, lheight, width, height, r, g, b, num, icebear, h, s; //variable declaration, like var, let variables can be defined outside of funcs

function setup() {
  createCanvas(800, 600); //width, length of screen - built in vars for canvas?
  
  // num = prompt("How many logos do you want?");
  // print(typeof(num));
  // num = parseInt(prompt("How many logos do you want?"));

  // r = 255;
  // g = 255;
  // b = 255;
  
  colorMode(HSB, 360, 100, 100); //ranges for h,s,b ; hue - like color wheel; 0 and 360=red
  
  h = 0;
  s = 0;
  b = 100;
  
  x = 50;
  y = 20;
  xVelocity = 5;
  yVelocity = 3;
  
  lwidth = 141; //avoid using magic numbers
  lheight = 270;

  // We only want to load the logo once.
  // for (var i =0; i < num; i++) {
  icebear = loadImage("https://cdn.glitch.com/4152b096-2a76-488c-b8fa-f1e12c72e2a9%2Fbear.png?v=1594169089930"); //todo: get the image URL from the assets
    // x += 50;
  // }
}

function draw() {
  background('Black');
  
  //update the x position
  // if (x < 600) { //800-200 b/c pos of image defined at top left corner; 800 - canvas width, 200 - image width
  x += xVelocity;
  y += yVelocity;
  // }
  
  //bounce off the side if it's on the edge
  if (x >= 800-lwidth || x <= 0) { //width of canvas = 800  -a global built in var for canvas size  
    randomizeColor();
    xVelocity *= -1;
    // x += xVelocity;
    console.log(xVelocity);
    console.log(x);
  }
  
  if (y >= 600-lheight || y <= 0) { //600-150
    randomizeColor();
    yVelocity *= -1;
  }
  
  // Draw the logo at the new position.
  // tint(r, g, b);
  tint(h, s, b);
  
  image(icebear, x, y, lwidth, lheight);
}

function randomizeColor() {
  // r = random(0,255); //seed: where ran num gen starts off of
  // g = random(0,255);
  // b = random(0,255);
  
  //or hsb - hue, saturation, and brightness
  h = random(0, 360);
  s = random(0, 80);
  b = random(50, 100);
}
