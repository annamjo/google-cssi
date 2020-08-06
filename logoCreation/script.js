// Content behind double slashes is a comment. Use it for plain English notes,
// or for code that you want to temporarily disable.

/* global createCanvas, background, ellipse, rect, strokeWeight, stroke, noFill, arc */
//^all to make shapes be defined by p5js - js lib for js graphics, no spurious errors

function setup() {
  // Code here runs only once, at beg. of program
  createCanvas(800, 600); //computer graphics - origin is in top left
  // ellipseMode(CORNER);
  // ellipseMode(CENTER); //default mode
}

function draw() {
  // Code here runs continuously
  background(250); //draws the color

  // fill(0,0,255);
  noFill(); //theres also a noStroke()
  strokeWeight(12);

  // stroke('#0085C7'); //stroke(0,0,255); //or stroke(color(0,0,255)) 
  // ellipse(200, 100, 150); 
  
    //in js ;'s are optional, automatically assumes but not good prac
  //(x, y, width, height) ellipse arguments/inputs to function
  //height is optional - width also length - for circle - theres also a circle(x, y, width) func
  //also have detail param - for webgl (int # of radial sectors to draw)
  
  // rect(30, 20, 55, 550);
  // stroke('#f4C300');
  // ellipse(300, 150, 150);
  
  drawRing('#0085C7', 200, 100); //blue
  drawRing('#f4C300', 290, 177); //yellow
  drawRing('#000000', 380, 100); //black
  drawRing('#009f3D', 470, 177); //green
  drawRing('#DF0024', 560, 100); //red
  
  overlaps();

  // stroke('black');
  // arc(290, 177, 150, 150, Math.PI+Math.PI/4, Math.PI/2-Math.PI);
  
  //theres also 3d graphics and processing:
  // plane(50, 50); //with webgl arg in canvas
}

function drawRing(string, x, y) {
  stroke(string);
  ellipse(x, y, 150);
}

function overlaps() {
  //would need to use arcs to imitate ring overlaps
  
  stroke('#f4C300'); //for yellow overlap over black
  arc(290, 177, 150, 150, -Math.PI/2, -Math.PI/3); //using center x,y pos. of yellow ellipse
  
  stroke('#009f3D'); //for green overlap over red
  arc(470, 177, 150, 150, -Math.PI/2, -Math.PI/3); 
  
  stroke('#0085C7'); //for blue overlap over yellow
  arc(200, 100, 150, 150, -Math.PI/4, Math.PI/4); 
  
  stroke('black'); //for black overlap over green
  arc(380, 100, 150, 150, -Math.PI/4, Math.PI/4); 
}

// https://p5js.org/reference/#/p5/stroke
//https://www.schemecolor.com/olympic-logos-and-symbols-colors.php#:~:text=The%20Olympic%20Logos%20And%20Symbols,created%20by%20user%20Keshav%20Naidu
//https://p5js.org/reference/#/p5/arc