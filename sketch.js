var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImage;
var cloudGroup;
var ob1, ob2, ob3, ob4, ob5, ob6;
var obGroup;
var score = 0;
var gameState = "play";
var gameOverImage, gameOver
var restartImage, restart
var checkPoint, jump, die

function preload() {
  trex_running = loadAnimation("trex1.png", "trex2.png", "trex3.png");
  trex_collided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
  checkPoint = loadSound("checkPoint.mp3");
  die = loadSound("die.mp3");
  jump = loadSound("jump.mp3");
}

function setup() {

  createCanvas(600, 200)
  // create cloud group
  cloudGroup = createGroup()

  //create restart and gameOver sprite
restart = createSprite(300,110)
restart.addImage(restartImage)
restart.scale = 0.35
restart.visible = false;
gameOver = createSprite(300,90)
gameOver.addImage(gameOverImage)
gameOver.visible = false;

  // create ob group
  obGroup = createGroup()

  //create a trex sprite
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  //trex.debug = true
  trex.setCollider("rectangle",0,0,40,trex.height)

  //create a ground sprite
  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;

  //creating invisible ground
  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

}

function draw() {
  //set background color
  background("white");

  console.log(frameCount)
  if (gameState == "play") {
    //Score system
    score = score + Math.round(getFrameRate() / 60)
    fill("black")
    text("Score : " + score, 500, 50)
    // jump when the space key is pressed
    if (keyDown("space") && trex.y >= 160) {
      trex.velocityY = -13;
      jump.play()
    }
    trex.velocityY = trex.velocityY + 0.8
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    //Spawn Clouds
    makeClouds()

    // make ob
    makeOb()
     
    if (score > 0 && score % 300 == 0){
      checkPoint.play()
    }
    if(trex.isTouching(obGroup)){
      gameState = "end"
      die.play()
      //trex.velocityY = -13;
      //jump.play()
    }
    ground.velocityX = -(4+score/300);
  } else {
ground.velocityX = 0
cloudGroup.setVelocityXEach(0)
obGroup.setVelocityXEach(0)
trex.velocityY=0
cloudGroup.setLifetimeEach(-1)
obGroup.setLifetimeEach(-1)
trex.changeAnimation("collided",trex_collided);
restart.visible = true;
gameOver.visible = true;
if (mousePressedOver(restart)){
  reset()
}
  }
  //stop trex from falling down
  trex.collide(invisibleGround);



  drawSprites();
}

//function to reset the game
function reset(){
  restart.visible = false;
  gameOver.visible = false;
  gameState = "play";
  score = 0;
  obGroup.destroyEach();
  cloudGroup.destroyEach();
  trex.changeAnimation("running", trex_running);
}

//function to spawn the clouds
function makeClouds() {
  // write your code here 
  if (frameCount % 60 == 0) {
    var cloud = createSprite(600, random(10, 60))
    cloud.addImage(cloudImage)
    cloud.velocityX = -4;
    cloud.scale = random(0.4, 0.7)
    cloudGroup.add(cloud)
    cloud.depth = trex.depth
    trex.depth += 1
    cloud.lifetime = 170
  }
}
//function make clouds
function makeOb() {
  if (frameCount % 80 == 0) {
    var ob = createSprite(600, 165)
    ob.velocityX = -(4+score/300);
    ob.scale = 0.5;
    //ob.debug = true
    obGroup.add(ob);
    ob.lifetime = 170
    var rand = Math.round(random(1, 6))
    switch (rand) {
      case 1: ob.addImage(ob1);
        break;
      case 2: ob.addImage(ob2);
        break;
      case 3: ob.addImage(ob3);
        break;
      case 4: ob.addImage(ob4);
        break;
      case 5: ob.addImage(ob5);
        break;
      case 6: ob.addImage(ob6);
        break;
    }
  }
}


