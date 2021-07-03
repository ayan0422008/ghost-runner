var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var score=0;

function preload(){
towerImg = loadImage("tower.png");
doorImg = loadImage("door.png");
climberImg = loadImage("climber.png");
ghostImg = loadImage("ghost-standing.png");
spookySound = loadSound("spooky.wav");
  }

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup = new Group();

  climbersGroup = new Group();
  ghost = createSprite(200,350,50,50);
  ghost.scale = 0.3;
  ghost.addImage(ghostImg);
  invisibleBlockGroup = new Group();
  spookySound.loop();
  var score = 0;
}

function draw() {
  background(200);
  textSize(20);
  fill("blue")
  text("Score: "+ score,30,50);



  if(gameState === "play"){
  if(tower.y > 400){
      tower.y = 300
    }
    if(invisibleBlockGroup.isTouching(ghost)|| ghost.y > 600){
      ghost.destroy();
      gameState = "end";
    }
    spawnDoors();
    if(keyDown("space")){
      ghost.velocityY = -5;
    }
    ghost.velocityY = ghost.velocityY + 0.8;
     if(keyDown("right_arrow")){
       ghost.x = ghost.x +3;
     }
     if(keyDown("left_arrow")){
       ghost.x = ghost.x -3;
     }
     if(climbersGroup.isTouching(ghost)){
       ghost.velocityY = 0;
     }
    drawSprites();
    }
    if(gameState === "end"){
      textSize(20);
    text("gameOver",200,250);
    }
    }
    function spawnDoors(){
      if(frameCount % 240 === 0){
        var door = createSprite(200,30);
        door.addImage(doorImg);
        door.velocityY = 2;
        door.x=Math.round(random(120,400))
        door.lifetime = 400;
        doorsGroup.add(door);
        var climber = createSprite(200,80);
        climber.addImage(climberImg);
        climber.velocityY = 2;
        climber.x = door.x;
        climber.lifetime = 400;
        climbersGroup.add(climber);
        ghost.depth = door.depth 
        ghost.depth  +=1;
        var invisibleBlock = createSprite(200,90);
        invisibleBlock.width = climber.width;
        invisibleBlock.height = 2;
        invisibleBlock.velocityY = 2;
        invisibleBlock.x = door.x;
        invisibleBlock.lifetime = 400;
        invisibleBlockGroup.add(invisibleBlock);
        invisibleBlock.debug = true;
      }
    }


    