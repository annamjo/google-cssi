/* global createCanvas, background, colorMode, HSB, noStroke, backgroundColor, color, fill, ellipse, text, stroke, line, width, height, mouseX, mouseY, rect */

// We'll use variables for most of our colors in this code-along.
let backgroundColor,
  color1,
  color2,
  textColor,
  globalBrightness,
  globalSaturation;

function setup() {
  // Canvas & color settings
  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100); //hue: 360 deg color wheel, saturation and brightness - 0 to 100%
  noStroke(); // prevents edges fr being drawn on circles

  // When used with only one argument, the color mode is greyscale.
  // 0 is black and 100 is white.

  // backgroundColor = color(95); //one arg - a greyscale color, lines for initializing
  // textColor = color(20);
  dayMode();

  // When used with three arguments, the function takes, in this order:
  // HUE - 0 to 360 degrees on a color wheel - 0 is red, 120 is green and 240
  //       is blue.
  // SATURATION - 0 is no color (greyscale), and 100 is as bold as possible.
  // BRIGHTNESS - 0 is no light (black), and 100 is as bright as possible.
  // When used with three arguments, the function takes, in this order:
  // HUE - 0 to 360 degrees on a color wheel - 0 is red, 120 is green and 240
  //       is blue.
  // SATURATION - 0 is no color (greyscale), and 100 is as bold as possible.
  // BRIGHTNESS - 0 is no light (black), and 100 is as bright as possible.

  globalBrightness = 80;
  globalSaturation = 55;

  // Suggested saturation,brightness settings:
  // 50, 100: pastel
  // 100,100: neon
  // 100, 50: bold
  // 80, 80: neutral

  // color1 = color(0, 80, 80);
  // color1 = color(181, globalSaturation, 59);
  // // color2 = color(200, 80, 80);
  // color2 = color(123, globalSaturation, globalBrightness);
}

function draw() {
  background(backgroundColor);

  if (mouseX <= 70 && mouseY <= 70 && mouseX < width/2) {
    backgroundColor = '#779ecb';
  } 
  else if (mouseX >= width - 70 && mouseY <=70 && mouseX > width/2) {
    backgroundColor = '#fade85';
  }
  else if (mouseX <=70 && mouseY >= height - 70 && mouseX < width/2) {
    backgroundColor = '#cae7c1';
  }
  else if (mouseX >= width - 70 && mouseY >= height - 70 && mouseX > width/2) {
    backgroundColor = '#b19cd9';
  }
  else if (mouseX > width / 2 && mouseY > height/2) {
    nightMode();
    // console.log("mouse on the right");
  } else if(mouseX > width/2 && mouseY < height/2) {
    duskMode()
  } else if(mouseX < width / 2 && mouseY > height/2) {
    dawnMode()
  }
  else {
    //if mouse isn;t on right
    dayMode();
  }


  // Call the drawCenterLine function here to run the three lines of code
  // contained in that function.
  drawCenterLine();
  drawEquator();
  drawCorners();
  
  // The red and blue circles:
  fill(color1);
  //   ellipse(100, 200, 50);
  ellipse(width / 4, height / 2, 50);
  fill(color2);
  // ellipse(300, 200, 50);
  ellipse((3 * width) / 4, height / 2, 50);

  // The grey circle and the text:
  fill(textColor);
  ellipse(mouseX, mouseY, 50);
  // text("Flip the switch", 20, 20);
}

function drawCenterLine() {
  // This function will turn stroke on, draw the line, and then turn stroke
  // back off.
  // Remember a line segment in p5.js has four arguments: x1, y1, x2, y2
  stroke(textColor);
  line(width / 2, 0, width / 2, height);
  noStroke();
}

function drawEquator() {
  stroke(textColor);
  line(0, height/2, width, height/2);
  noStroke();
}

function nightMode() {
  backgroundColor = color(20); //inverted their colors
  textColor = color(95);
  // globalSaturation = 0;
  color2 = color(181, globalSaturation - 20, 59);
  color1 = color(123, globalSaturation - 20, globalBrightness - 20);
}

function dayMode() {
  backgroundColor = color(95);
  textColor = color(20);
  color1 = color(181, globalSaturation, 59);
  color2 = color(123, globalSaturation, globalBrightness);
}

function duskMode() {
  backgroundColor = color(50);
  textColor = color(20);
  color1 = color(181, 94, 59);
  color2 = color(123, 94, globalBrightness);
  
}

function dawnMode() {
  backgroundColor = color(95);
  textColor = color(20);
  color1 = color(181, globalSaturation, 94);
  color2 = color(123, globalSaturation, 94);
}

function drawCorners() {
  fill('#779ecb');
  rect(0, 0, 70, 70);
  fill("#fade85");
  rect(width-70, 0, 70, 70);
  fill("#cae7c1");
  rect(0, height-70, 70, 70);
  fill('#b19cd9');
  rect(width-70, height-70, 70, 70);
}