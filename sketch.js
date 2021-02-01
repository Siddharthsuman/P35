var balloon,ground,balloonImg;
var backgroundImg,balloonImg2,balloonImg3;
var database,position;

function preload(){
backgroundImg=loadImage("B1.png");
balloonImg=loadImage("B2.png");
balloonImg2=loadImage("B3.png");
balloonImg3=loadImage("B4.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1365,625);
 balloon=createSprite(160, 420, 10, 10);
 balloon.addImage(balloonImg);
  balloon.scale=0.7;
  balloon.setCollider("rectangle",0,150,balloon.width,160);
  //
  var balloonPosition=database.ref('balloon/position');
  balloonPosition.on("value",readHeight,showError);
  //Creating ground for gravity
 ground=createSprite(width/2,605,1365,20);
}

function draw() {
  background(backgroundImg);  
  balloon.velocityY = balloon.velocityY + 0.01;
  ground.visible=false;

fill(98, 247, 69)
strokeWeight(5);
stroke(255, 174, 0);
textSize(40);
text("*Use Arrow Keys to Move the Balloon*",20,50)
  if(balloon.isTouching(ground)){
    balloon.scale=0.8;
  }
  balloon.collide(ground);
//Giving keyCommands
if(keyDown(UP_ARROW)){
 
  balloon.addAnimation("hotAirBalloon",balloonImg2);
}
 if(keyDown(LEFT_ARROW)){
  updateHeight(-5,0);

  
  balloon.addImage(balloonImg2);
 }
else if(keyDown(RIGHT_ARROW)){
  updateHeight(5,0);

  balloon.addImage(balloonImg3);
}
else if(keyDown(UP_ARROW)){
 // balloon.y=balloon.y-10;
  updateHeight(0,-5);
  balloon.scale=balloon.scale -0.01;

}
else if(keyDown(DOWN_ARROW)){
  updateHeight(0,5);
  balloon.scale=balloon.scale +0.01;
}
  drawSprites();


}

function updateHeight(x,y){
  database.ref('balloon/position').set({
    'x': position.x+x,
    'y': position.y+y
  })
}

function readHeight(data){
 position=data.val();
 balloon.x=position.x;
 balloon.y=position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
