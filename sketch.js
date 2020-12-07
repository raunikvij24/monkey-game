
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage

var foodGroup, obstacleGroup
var score=0;
var ground,invisible;
var survivaltime=0;
var gamestate;
var play,end;
var end;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(500,500);
  
  play=1;
  gamestate= play;
  end=0;
   
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400,350,900,10)
  ground.velocityX=4;
  ground.x=ground.width/2;
  console.log(ground.x)
}



function draw() {
 background("white");
  console.log(monkey.y)
  if (gamestate=== play){
    score = Math.round(frameCount/3)
    survivalTime=Math.ceil(frameCount / frameRate());
    
    ground.x=ground.width/2;
    ground.velocityX = -(5+2* score / 100);
    
   if (keyDown("space")&& monkey.y > 310){
   monkey.velocityY =-10;
   }
   monkey.velocityY = monkey.velocityY+0.5
 
    
    food();
    obstacle();
  
    if (foodGroup.isTouching(monkey)){
     foodGroup.destroyEach();
    }
  
 
  
    if(monkey.isTouching(obstacleGroup)){
     gamestate = end;
    }
 
  }
  
else if(gamestate===end) {
 ground.velocityX=0;
 //invisible.velocityX=0;
 obstacleGroup.setVelocityXEach(0);
 foodGroup.setVelocityXEach(0);
  
  
 foodGroup.setLifetimeEach(-1)
 obstacleGroup.setLifetimeEach(-1);
}
  
  

  
monkey.collide(ground);
 
stroke("black");
textSize(20);
fill("red");
text("score: "+ score,500,50);
  
stroke("black");
textSize(20);
fill("black");
survivalTime=Math.ceil(frameCount/frameRate())
text("survial Time:" + survivalTime,100,50);
  
  drawSprites();
} 

function food() {

  if (frameCount%80===0){
    var banana =  createSprite(500,10,10,20);
    banana.addImage("banana",bananaImage);
    banana.velocityX = -(5+2* score /100);
    banana.y=Math.round(random(120,200));
    banana.scale = 0.1;
    foodGroup.add(banana);
     foodGroup.setLifetimeEach(100);
      //banana.setcollider("rectangle",0,0,400,400); 
    }
  
  
}

function obstacle () {
  if (frameCount%100===0) {
    var obstacle = createSprite(400,305,23,32);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.velocityX = -(5+2* score /100);
    obstacle.scale = 0.2;
    obstacleGroup.add(obstacle);
    obstacleGroup.setLifetimeEach(100)
    //obstacle.setcollider("circle",0,0,400,400);
}
}




