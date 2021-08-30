var PLAY = 1;
var END = 0;
var gameState = PLAY;

var fairy, fairy_running, fairy_collided 
var  ground, invisibleGround, groundImage


var coin
var obstaclesGroup, obstacle1, obstacle2, obstacle3

var gameOverImg,restartImg
var score;


function preload(){

    jumpSound = loadSound("jump.wav")
    collidedSound = loadSound("collided.wav")

    fairy_running = loadAnimation("fly1.png","fly2.png");
    fairy_collided = loadAnimation("lose.png");

    
    groundImage =loadImage("bgGood.jpg")

    coin = loadImage("coin.png")

    obstacle1 = loadImage("obstacle1.png");
    obstacle2 = loadImage("obstacle2.jpg");
    obstacle3 = loadImage("obstacle3.png");

    restartImg = loadImage("restart.png")
    gameOverImg = loadImage("Game Over.png")
  

}

function setup() {

  createCanvas(500,300)

    ground = createSprite(350,150,700,300);
    ground.addImage("ground",groundImage);
    ground.scale = 2
    //ground.x = ground.width /2;
    
 
    fairy= createSprite(100,180,20,50);
    fairy.addAnimation("running", fairy_running);
    fairy.addAnimation("collided" ,fairy_collided);
    fairy.scale = 0.3;
    fairy.frameDelay = 10;

    
    
    
     gameOver = createSprite(300,100);
    gameOver.addImage(gameOverImg);
    
    restart = createSprite(300,140);
    restart.addImage(restartImg);
    
    gameOver.scale = 0.5;
    restart.scale = 0.5;
    
    invisibleGround = createSprite(200,190,400,10);
    invisibleGround.visible = false;
        
    obstaclesGroup = createGroup();
       
    fairy.debug = true
    
    score = 0;
}

function draw() {
 
    background(180);
    //displaying score
   
    
    console.log("this is ",gameState)
    
    
    if(gameState === PLAY) {
      gameOver.visible = false
      restart.visible = false
      //move the ground
      ground.velocityX = -(4 + score/100)
      //scoring
      score = score + Math.round(getFrameRate()/60);
  
      
      if (ground.x < 175){
        ground.x = 350;
      }
    
     if(keyDown("space")&& fairy.y >= 100) {
      jumpSound.play( )
        fairy.velocityY = -12;
      }
    
    //add gravity
    fairy.velocityY = fairy.velocityY + 0.8;

    spawnObstacles();

    if(obstaclesGroup.isTouching(fairy)){
      //fairy.velocityY = -12;
      collidedSound.play()
      gameState = END;
    }

}
    
else if (gameState === END) {
   gameOver.visible = true;
   restart.visible = true;
  
   ground.velocityX = 0;
   fairy.velocityY = 0
  
   //change the trex animation
   fairy.changeAnimation("collided", fairy_collided);
  
   //set lifetime of the game objects so that they are never destroyed
  obstaclesGroup.setLifetimeEach(-1);
  
  obstaclesGroup.setVelocityXEach(0);
}

  fairy.collide(invisibleGround);
  drawSprites();
  fill("red")
  text("Score: "+ score, 300,50);
}

function spawnObstacles() {
  if (frameCount % 60 === 0){
    var obstacle = createSprite(400,165,10,40);
    obstacle.velocityX = -(6 + score/100)
    
     //generate random obstacles
     var rand = Math.round(random(1,2));
     switch(rand) {
       case 1: obstacle.addImage(obstacle1);
               break;
       case 2: obstacle.addImage(obstacle3);
               break;
       default: break;
     }
       //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }

}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  fairy.changeAnimation("running",fairy_running);
  
  score = 0;
  
}


    




