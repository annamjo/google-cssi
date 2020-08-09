/* global ml5, createCanvas, width, height, createCapture, VIDEO, background, image */
let posenet;
let webcam;
let pose;
let skeleton;

function setup() {
  let c = createCanvas(640, 500);
  c.position(8.75*width/10, height/8);
  c.style('border-radius: 6px')
  // Create the video
  
  webcam = createCapture(VIDEO);
  webcam.hide();
  posenet = ml5.poseNet(webcam, modelLoaded);
  posenet.on('pose', gotPoses);
}

function gotPoses(poses) {
  // console.log(poses)
  //object array in poses has 2 props: pose + skeleton
  if (poses.length > 0) {
    pose = poses[0].pose; //taking any pose they give me
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  //callback for when model is loaded
  console.log("posenet ready")
}

function draw() {
  background('#cccccc');

  // Draw the video
  image(webcam, 0, 0, 640, 500);

  //(typeof pose !== "undefined") works too
  if (pose) { //is there a valid pose? is it defined?
    // console.log(pose)
    
    //check dist fr cam by calc how far apart eyes are
    let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y)/2;
    noStroke();
    // fill(0,0,255);
    fill("#89cff0");
    ellipse(pose.rightWrist.x, pose.rightWrist.y, 64);
    ellipse(pose.leftWrist.x, pose.leftWrist.y, 64);
    //can loop all keypts (arr.len = 17)
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y
      // fill(0, 255, 0);
      fill("#a5f7bb");
      ellipse(x, y, 18, 18);
    }
    
    // fill(255, 0, 0);
    fill("#ff6961");
    ellipse(pose.nose.x, pose.nose.y, d); //64, d smaller/larger based on how close

    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(255);
      line(a.position.x, a.position.y, b.position.x, b.position.y);
    }
  }
}