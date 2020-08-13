var monkey, monkeyAnimation;
var rock, banana,ground,invisibleGround;

var rockGroup, rockImage;
var bananaGroup, bananaImage;

var score = 0;
var gameOver, restart;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  //monkeyAnimation = loadAnimation("monkey_monkeygame.png");
  
  rockImage = loadImage("rock_monkeygame.png");
  
  bananaImage = loadImage("banana_monkeygame-1.png");
  

}

function setup() {
  createCanvas(600, 200);
  
  monkey = createSprite(50,180,20,50);
  monkey.addAnimation("running", monkeyAnimation);
  monkey.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  rockGroup = new Group();
  bananaGroup = new Group();
  
  score = 0;
  
  
}

function draw() {
  background(180);
  
  
  text("Score: "+ score, 500,50);
  
  if(gameState === PLAY){
    
  
    if(keyDown("space") && trex.y >= 159) {
    monkey.velocityY = -14;
      
  }
  
  monkey.velocityY = monkey.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }

    
  monkey.collide(invisibleGround);
    
 spawnbanana();
  spawnrock();
  //reset();  
    
    if(rockGroup.isTouching(monkey)){
    gameState = END;
    
  }
  }
  else if(gameState === END){
  
    monkey.velocityY = 0;
    
    rockGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    
    rockGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    if(mousePressedOver("r")){
      reset();
  }
     banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  }
  
  
  drawSprites();
}

function reset(){
 gameState = PLAY;
  
  
  bananaGroup.destroyEach();
  rockGroup.destroyEach();
  
  
  score = 0;
}
  
  
  
function spawnbanana() {
  // code to spawn the bananas
  if (frameCount % 60 === 0) {
    var banana = createSprite(400,155,20,20);
    banana.scale = 0.5;
    banana.velocityX = -4;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
  
}

function spawnrock() {
  if(frameCount % 60 === 0) {
    var rock = createSprite(600,165,10,40);
    rock.velocityX = -(6 + 3* score/100);
    
    
    //assign scale and lifetime to the obstacle           
    rock.scale = 0.5;
    rock.lifetime = 300;
    //add each obstacle to the group
    rockGroup.add(rock);
  }
}