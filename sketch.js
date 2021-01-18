var towerImg,tower;
var doorImg,door,doorGroup;
var climberImg,climber,climbersGroup;
var ghost,ghostImg;
var invisibleBlockGroup,invisibleBlock;
var spookySound;

var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
  spookySound=loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  
  tower=createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY=1;
  
  ghost=createSprite(200,200,50,50);
  ghost.scale=0.3;
  ghost.addImage("ghost",ghostImg);
  
  doorGroup=new Group();
  
  climbersGroup=new Group();
  
  invisibleBlockGroup=new Group();

  
}

function draw(){
  background(0);
  
  if(gameState===PLAY){
    if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
  
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
  
  ghost.velocityY=ghost.velocityY+0.8;
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }

  if(tower.y>400){
    tower.y=300;
  }
    spawnDoors();
  
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
    ghost.destroy();
    gameState=END;
  }
  
  drawSprites();
    
  }
  if(gameState===END){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("gameOver",230,250);
    spookySound.stop();
  }
  
  
}

function spawnDoors(){
  if(frameCount%240===0){
    var door=createSprite(200,-50);
    var climber=createSprite(200,10);
    var invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    
  
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.x=Math.round(random(120,400));
    door.velocityY=1;
    
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;
    
    invisibleBlock.debug=true;
    
    invisibleBlock.lifetime=800;
    
    door.lifetime=800;
    climber.lifetime=800;
    
    climber.x=door.x;
    climber.velocityY=1;
    
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    
    doorGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}