/* global windowWidth, windowHeight, sqrt, keyCode, keyIsDown, keyIsPressed, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, collideRectCircle, collideCircleCircle, random, mouseIsPressed, clear, textSize, createCanvas, strokeWeight, rect, background, colorMode, HSB, noStroke, backgroundColor, color, fill, ellipse, text, stroke, line, width, height, mouseX, mouseY */

let backgroundColor, spherePosition, rectPosition, mousePosition;

function setup() {
  // Canvas & color settings
  createCanvas(500, 400);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  // The spherePosition variable contains object, it is initialized using "Object Notation"
  spherePosition = {
    "x": 100,
    "y": 100
  } 
  
  rectPosition = {
    "x": 130,
    "y": 140
  }

  

}

function draw() {
  background(backgroundColor);
  ellipse(spherePosition.x, spherePosition.y, 20, 20);
  //can also do spherePosition['x'], b/c objects in JS are like arrays
  rect(rectPosition.x, rectPosition.y, 20, 20);
  line(spherePosition.x, spherePosition.y, rectPosition.x, rectPosition.y);
  
  let distance = computeDistance(spherePosition, rectPosition);
  text('the distance between the circle and rectangle is ' + distance, 20, 20)
  
//   noStroke();
//   fill('Black');
//   for (let i = 0; i < 10; i ++) {
//     ellipse(0, 30, 20, 80);
//     rotate(PI/5);
//   }
    
  mousePosition = {
    x: mouseX, 
    y: mouseY
  };
  
  // let distance2 = round(computeDistance(mousePosition, rectPosition));
  // text('The distance between the mouse and rectangle is ' + distance2, 20, 50);
  
  text("you're getting..." + findDistanceCategory(mousePosition, rectPosition), 20, 40);
}

function mousePressed() {
  spherePosition.x = random(width);
  spherePosition.y = random(height);
}

function computeDistance(pointA, pointB) {
  let deltaX = pointA.x - pointB.x;
  let deltaY = pointA.y - pointB.y;
  
  let distance = sqrt((deltaX**2) + (deltaY**2)); //exponentiation - **
  
  return round(distance); //round - closest/nearest int, floor - down, ceil - next largest int (up)
} //if function needs to return multile vals/objs, can pack them in an object: function getvals() { return { first: getfirstval(), second: get secondVal(), };}

function findDistanceCategory(pointA, pointB) {
  let distance = computeDistance(pointA, pointB);
  
  if (distance > 200) {
    //cold
    backgroundColor = color(240, 10, 100);
    return "cold";
  }
  else if (distance>50) {
    //warm
    backgroundColor = color(120, 10, 100);
    return 'warm';
  }
  else {
    //hot
    backgroundColor = color(0, 10, 100);
    return 'hot';
  }
}