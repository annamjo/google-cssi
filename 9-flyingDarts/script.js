/* global windowWidth, dist, round, windowHeight, sqrt, keyCode, keyIsDown, keyIsPressed, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, collideRectCircle, collideCircleCircle, random, mouseIsPressed, clear, textSize, createCanvas, strokeWeight, rect, background, colorMode, HSB, noStroke, backgroundColor, color, fill, ellipse, text, stroke, line, width, height, mouseX, mouseY, arc, HALF_PI, PI */

let backgroundColor, showDart, dartPosition, mousePosition, points, dart, pointer, index;
let darts = [];
function setup() {
  // Canvas & color settings
  createCanvas(500, 400);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  index = 0;
  for (let i = 0; i < 5; i++) {
    darts.push(new Dart());
  }
  
  // dart = new Dart();
  // dartPosition = {
  //   "x": 100,
  //   "y": 100
  // } 
    background(backgroundColor);
    points = 0;
  // displayScore();
  fill('black')
  ellipse(width/2, height/2, 400, 400); 
  fill(`rgb(255, 50, 50)`)
  arc(width/2, height/2, 350, 350, 0, HALF_PI/4);
  arc(width/2, height/2, 350, 350, HALF_PI/2, (1.6*HALF_PI)/2);
  arc(width/2, height/2, 350, 350, (1.1*HALF_PI), 2.8*PI/4);
  arc(width/2, height/2, 350, 350, 3.4*PI/4, PI) ;
  arc(width/2, height/2, 350, 350, -HALF_PI/2,HALF_PI/4 );
  arc(width/2, height/2, 350, 350, -3.4*PI/4,-2.8*PI/4 ) ;
  arc(width/2, height/2, 350, 350, -1.1*HALF_PI,(-1.6*HALF_PI)/2 );
  fill('green')
  arc(width/2, height/2, 350, 350, HALF_PI/4, HALF_PI/2);
  arc(width/2, height/2, 350, 350, (1.6*HALF_PI)/2, 1.1*HALF_PI);
  arc(width/2, height/2, 350, 350, 2.8*PI/4, 3.4*PI/4) ;
  arc(width/2, height/2, 350, 350, -HALF_PI/4,0 );
  arc(width/2, height/2, 350, 350, -PI,-3.4*PI/4 ) ;
  arc(width/2, height/2, 350, 350, -2.8*PI/4,(-1.1*HALF_PI));
  arc(width/2, height/2, 350, 350, (-1.6*HALF_PI)/2,-HALF_PI/2 );
  fill('yellow')
  ellipse(width/2, height/2, 300, 300);
  fill('green')
  ellipse(width/2, height/2, 200, 200);
  fill('orange')
  ellipse(width/2, height/2, 180, 180);
  fill('black')
  ellipse(width/2, height/2, 10, 10); 
  
  
  //points = 0;
  showDart = false;
  
}

function draw() {
  // background(backgroundColor);
  displayScore();
  // fill('black')
  // ellipse(width/2, height/2, 400, 400); 
  // fill(`rgb(255, 50, 50)`)
  // arc(width/2, height/2, 350, 350, 0, HALF_PI/4);
  // arc(width/2, height/2, 350, 350, HALF_PI/2, (1.6*HALF_PI)/2);
  // arc(width/2, height/2, 350, 350, (1.1*HALF_PI), 2.8*PI/4);
  // arc(width/2, height/2, 350, 350, 3.4*PI/4, PI) ;
  // arc(width/2, height/2, 350, 350, -HALF_PI/2,HALF_PI/4 );
  // arc(width/2, height/2, 350, 350, -3.4*PI/4,-2.8*PI/4 ) ;
  // arc(width/2, height/2, 350, 350, -1.1*HALF_PI,(-1.6*HALF_PI)/2 );
  // fill('green')
  // arc(width/2, height/2, 350, 350, HALF_PI/4, HALF_PI/2);
  // arc(width/2, height/2, 350, 350, (1.6*HALF_PI)/2, 1.1*HALF_PI);
  // arc(width/2, height/2, 350, 350, 2.8*PI/4, 3.4*PI/4) ;
  // arc(width/2, height/2, 350, 350, -HALF_PI/4,0 );
  // arc(width/2, height/2, 350, 350, -PI,-3.4*PI/4 ) ;
  // arc(width/2, height/2, 350, 350, -2.8*PI/4,(-1.1*HALF_PI));
  // arc(width/2, height/2, 350, 350, (-1.6*HALF_PI)/2,-HALF_PI/2 );
  // fill('yellow')
  // ellipse(width/2, height/2, 300, 300);
  // fill('green')
  // ellipse(width/2, height/2, 200, 200);
  // fill('orange')
  // ellipse(width/2, height/2, 180, 180);
  // fill('black')
  // ellipse(width/2, height/2, 10, 10); 
  
  mousePosition = {
    x: mouseX, 
    y: mouseY
  };
  //pointer shows where the dart will fall
  // pointer = ellipse(mousePosition.x, mousePosition.y, 12, 12);
  //mouseReleased(); 
  // mouseClicked(); 
  
  //not needed
  // for(let i = 0; i<darts.length; i++){
  //    darts[i].show; 
  //    darts[i].setPosition();  
  //  }
  
  // if (showDart && index < 5) {
  //   darts[index].setPosition();
  //   darts[index].show();
  // }
  
}

class Dart {
  constructor() {
    this.major = 20;
    this.minor = 50;
    this.posX = 0;
    this.posY = 0;
    console.log(this.posX + " " + this.posY);
    console.log(mouseX + " " + mouseY);
  }
  
  setPosition(posX, posY) {
    this.posX = random(mouseX-15, mouseX+15);
    this.posY = random(mouseY-15, mouseY+15);
  }
  
  show() {
    fill('White');
    // ellipse(x, y, this.major, this.minor);
    // rotate(PI/3);
    // this.setPosition(this.posX, random(mouseY-10, mouseY+10));
  
    ellipse(this.posX, this.posY, this.major, this.major);
  }
}

function mousePressed() {
  console.log(mouseX, mouseY);
  showDart = true;
  if (index < 5) {
  //   console.log('hi')
  // dart = new Dart();
    darts[index].setPosition();
    darts[index].show();
    findDistanceCategory();
    index++;
  }
}

function mouseReleased() {
  showDart = false;
}


function findDistanceCategory() {
  if (index < 5) {
    let deltaX = darts[index].posX - width/2;
    let deltaY = darts[index].posY - height/2;
    let distance = sqrt((deltaX**2) + (deltaY**2));
    //console.log("deltaX: " + deltaX);
    //console.log("detlaY: " + deltaY);
    console.log("distance: " + distance);

    //using radius of ellipses
    //outside of dart board
    if (distance > 200) {
      points -= 5;
    }
    //first ring
    else if (distance <= 200 && distance >= 150) {
      points += 1;
    }
    //second ring
    else if (distance < 150 && distance > 100) {
      points += 2;
    //third ring
    }else if (distance <= 100 && distance > 90){
      points += 3;
    }
    //fourth ring
    else if (distance <= 90 && distance > 5){
      points += 5;
    //bullseye
    }else{
      points += 10;
    }
   
    
  }
}

function displayScore(){
  noStroke();
  fill(backgroundColor);
  rect(33, 30, 80, 25);
  textSize(12);
  stroke('black');
  fill('black');
  text(`Points: ${points}`, 40, 50);
}
