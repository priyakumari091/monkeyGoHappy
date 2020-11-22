
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var obstacleGroup,bananaGroup;
var score, gameOver,gameOverImg,restart,restartImg;
var ground,PLAY = 1, END = 0, gameState = PLAY;
var invisibleGround;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
 
}



function setup() {
  
  score =0;
  obstacleGroup = new Group();
  bananaGroup = new Group();
  
 //creating monkey
   monkey=createSprite(200, 380, 20, 20)
   monkey.addAnimation("moving", monkey_running);
  // monkey.addImage(bananaImage)
   monkey.scale=0.1
  monkey.setCollider("circle", 10, 0, 350)
  //monkey.debug = true;
  
  ground = createSprite(250, 380, 1000, 40);
  ground.shapeColor = ("#00994d");
  ground.x=ground.width/2;
  ground.velocityX = -7;
  
    invisibleGround = createSprite(250,390,1000,10);
  invisibleGround.visible = false;
  
    gameOver = createSprite(180,180);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.5;
    gameOver.visible = false;
         
    restart = createSprite(180,220);
    restart.addImage(restartImg);
    restart.scale =0.5;
    restart.visible = false;
  
  
 
}


function draw() {

   background("purple");
    
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time: "+ score, 100,50);
  
  
  
  
  if(gameState === PLAY){
    
    score = score + (Math.round(getFrameRate()/60));
      if(ground.x < 0){
    ground.x = ground.width/2;
  }
  
  
  if(keyDown("space") && monkey.y>296){
    monkey.velocityY = -18;
    
  }
  
  // Adding gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(invisibleGround);
    //monkey.collide(ground)
  spawnFood();
  spawnObstacle();
    
   if(bananaGroup.isTouching(monkey)){
    
    bananaGroup.destroyEach();
    
  }
    
  if(obstacleGroup.isTouching(monkey)){
    
        gameState = END;
  }
  
  }
  else if(gameState === END){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        bananaGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        bananaGroup.setLifetimeEach(-1);
        gameOver.visible = true;
        restart.visible = true;
        
        
        if(mousePressedOver(restart))
        {
            
            reset();
       }
    
  }
  
 
  drawSprites();
}


function spawnFood(){
  
  if(World.frameCount%80===0){
    banana = createSprite(600,Math.round(random(120,200)),20,20);
    banana.addImage(bananaImage);
    banana.scale =0.1;
    banana.velocityX = -5;
    bananaGroup.add(banana);
    bananaGroup.setLifetimeEach(100);
  }
}

function spawnObstacle(){
  
  if(World.frameCount%300===0){
    
    obstacle = createSprite(510, 350, 20, 20);
    obstacle.x = random(510, 550)
    obstacle.velocityX = -6;
    
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth+1;
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
   //obstacle.collide(ground);
  }
}

function reset(){
  
   gameState = PLAY;
  gameOver.visible = false;
        restart.visible = false;
  
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  score = 0;
  
}




