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
  balloon.scale=0.8;
  //balloon.setCollider("rectangle",0,150,balloon.width,160);
  //
  var balloonPosition=database.ref('balloon/height');
  balloonPosition.on("value",readHeight,showError);
  //Creating ground for gravity
  ground=createSprite(width/2,955,1365,20);
}

function draw() {
  background(backgroundImg);  
  balloon.velocityY = balloon.velocityY + 0.03;
  ground.visible=false;
  if(balloon.isTouching(ground)){
    balloon.scale=0.8;
  }
  balloon.collide(ground);
//Giving keyCommands
/*if(keyDown(UP_ARROW)){
  updateHeight(0,-10);
  balloon.addAnimation("hotAirBalloon",balloonImg2);
  balloon.scale=balloon.scale -0.01;
}*/
 if(keyDown(LEFT_ARROW)){

  balloon.x=balloon.x-10;
  balloon.addImage(balloonImg2);
 }
else if(keyDown(RIGHT_ARROW)){
  balloon.x=balloon.x+10;
  balloon.addImage(balloonImg3);
}
else if(keyDown(UP_ARROW)){
  balloon.y=balloon.y-10;
  balloon.scale=balloon.scale -0.01;

}
else if(keyDown(DOWN_ARROW)){
  balloon.y=balloon.y+10;
  balloon.scale=balloon.scale +0.01;
}
  drawSprites();


}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x':updateHeight.x+x,
    'y':updateHeight.y+y
  })
}

function readHeight(data){
  height=data.val();
  balloon.x=height.x;
  balloon.y=height.y;
}

function showError(){
  console.log("Error in writing to the database");
}