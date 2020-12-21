// here we are globally declaring all the variables
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survival,ground;

function preload(){
  
  // here we are loading all images,animation and sound
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  
  monkeysound=loadSound("Monkeys.mp3");
 
}



function setup() {
createCanvas(400,400);
  
  
  
  // here we are creating the monkey
monkey=createSprite(80,315,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.1;
  // here we are creating the ground
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  // here we are creating groups for bananas and stones
 FoodGroup=new Group();
  obstacleGroup=new Group();
  
// here we are marking survival time as 0
  survival=0;
  
}


function draw() {
  background("white");
  // here we are adding all the conditions 
  
  monkey.collide(ground);
  
  if(FoodGroup.isTouching(monkey)){
    banana.destroy();
  }
  
  if(obstacleGroup.isTouching(monkey)){
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    survival=0;
    monkeysound.play();
  }
  
  if(keyDown("space") && monkey.y>=314.3){
    monkey.velocityY=-13;
  }
  monkey.velocityY=monkey.velocityY+0.8;
  
  //console.log("tell me ",monkey.y);
  
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
  bananas();
  obsticles();
  
  // here we are displaying survival time
  stroke("black");
  textSize(20);
  fill("black");
  survival=Math.ceil(frameCount/frameRate());
  text("Survival Time "+ survival,150,50);
  

  drawSprites();
}
// here we are creating userdefined functions for bananas and stones
function bananas(){
  // % gives us the remainder
  // 5%2=1
  //5/2=2.5
 if(frameCount % 80 ===0){
  banana=createSprite(400,Math.round(random(180,250)),20,20);
   banana.addImage(bananaImage);
   banana.scale=0.1;
   banana.velocityX=-4;
   monkey.depth=banana.depth+1;
   
   banana.lifetime=100;
   
   FoodGroup.add(banana);
 } 
}

function obsticles(){
  
  if (frameCount % 300 ===0){
    obstacle=createSprite(350,330,20,20);
    obstacle.addImage(obstaceImage);
    obstacle.lifetime=100;
    obstacle.scale=0.1;
    obstacle.velocityX=-4
    
    obstacleGroup.add(obstacle);
  }
}



