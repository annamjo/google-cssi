/* global createCanvas, background, colorMode, HSB, noStroke, backgroundColor, color, fill, ellipse, text, stroke, line, width, height, mouseX, mouseY */

// We'll use variables for most of our colors in this code-along.

let brushHue, prevX, prevY, strokeW, stokeDelta, strokeMax, strokeMin; //prev - to keep up with where mouse used to be

function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  brushHue = 0;
  strokeW = 5; //stroke weight from 5 to 15
  // strokeWeight(6);
  
  strokeDelta = 1;
  
  prevX = 0;
  prevY = 0;
  
  background(95); 
  //background isn't constantly being redrawn anymore, so previously drawn squares show up
  text("press and hold to start drawing. press the spacebar to clear", 20, 20);
}

function draw() { //always runs in a loop automatically
  // drawPalette();
  // background(95);
  chooseColors(); //rainbow option
  strokeWeight(strokeW);
  
//only draw when mouse button clicked
  if (mouseIsPressed) { //var defined by p5 js  - to chck status of mouse
    strokeW += strokeDelta;
    if (strokeW >= 18 || strokeW <= 5) {
      strokeDelta *= -1;  //oscillation
    }
    
    // rect(mouseX, mouseY, 15, 15); - too many gaps, can we change the framerate?
    // line(prevX, prevY, mouseX, mouseY); //line gets angulat but now no gaps
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
  // console.log(frameRate());
  prevX = mouseX;
  prevY = mouseY;
}

// function mouseClicked() {
  
// }

function keyPressed() { //if any key pressed...
  //specify key pressed - keyCode variable
  if (keyCode === 32) { //LEFT_ARROW; c -> 67 or key == 'c', space -> 32
      background(95);
    // clear();
  }  
  //changing stroke width, cycle through thick and thin, use key press, etc; instead of line, use ellipses?, s&b
}

// function mousePressed() { //processing calls this whenever mouse clicked
//   ellipse(56, 46, 55, 55);
// }

// function drawPalette() {
//   noStroke();
//   fill('Red');
//   rect(0, height-width/5, width/5, width/5);
//   fill("Blue");
//   rect(width/5, height-width/5, width/5, width/5);
//   fill("Green");
//   rect(2*width/5, height-width/5, width/5, width/5);
//   // fill('Purple');
//   // rect(width-70, height-70, 70, 70);
// }

function chooseColors() {
  //change brush hue to change color
    brushHue += 1;
  
  // brushHue = (brushHue+1)%360

  if (brushHue >= 360) {
    brushHue = 0; //reset to 0 hue (after red 360 hue)
  }
  
  console.log(brushHue);
  
  //stroke color set until changed again
  //set the color for any drawing - including the brush for the ellipse, until we choose another color
  stroke(brushHue, 50, 80); 
  fill(brushHue, 50, 80);
}

//fill(0);
  // textSize(18);
  // text("Click on #1-9 for stroke thickness", 517, 117);

//need eraser, black, white