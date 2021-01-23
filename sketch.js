var balloon,backgroundImg;
var balloonImg;
var position,database;
function preload(){
  backgroundImg=loadImage("background.png")
  balloonImg=loadAnimation("HotAirBallon1.png","HotAirBallon2.png","HotAirBallon3.png")
  balloonImg2=loadImage("HotAirBallon2.png")
  balloonImg3=loadImage("HotAirBallon3.png")
  balloonImg1=loadImage("HotAirBallon1.png")


}
function setup() {
  background(backgroundImg); 
  database = firebase.database();
  console.log(database);
  createCanvas(1400,900);
  balloon=createSprite(200,650,10,10)
  balloon.addAnimation("flying",balloonImg)
  balloon.scale=1
  var balloonPosition=database.ref("balloon/position");
    balloonPosition.on("value",readHeight,showError);
  
}

function draw() {
  background(backgroundImg);

  
 
 if(keyDown(UP_ARROW)){
   updateHeight(0,-10)
   balloon.addAnimation("upside",balloonImg2)
  balloon.scale=balloon.scale -0.02
}
else if(keyDown(DOWN_ARROW)){
  updateHeight(0,10)
   balloon.addAnimation("downside",balloonImg3)
  balloon.scale=balloon.scale +0.02
  
}  
if(keyDown(LEFT_ARROW)){
  updateHeight(-10,0)
   balloon.addAnimation("leftside",balloonImg1)
  
}
else if(keyDown(RIGHT_ARROW)){
  updateHeight(10,0)
  balloon.addAnimation("rightside",balloonImg1)
}
  drawSprites();
  textSize(20)
  stroke ("black")
  text ("use arrow keys to move the hot air balloon",80,80)
}

function updateHeight(x,y){

  database.ref("balloon/position").set( {
      'x': height.x + x,
      'y': height.y + y
  })
}

function readHeight(data)
{
  height=data.val();
  console.log(height.x);
  balloon.x=height.x;
  balloon.y=height.y;

}

function showError()
{
  console.log("Error in writing to the database");
}