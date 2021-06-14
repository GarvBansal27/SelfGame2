var adam, bush, key;
var groundGroup, platformGroup, invisiblePlatformGroup, bushGroup, keyGroup,coinGroup;

function preload(){
  BGImage=loadImage("images/BG.png");
  RunImage=loadAnimation("images/Run/Run1.png","images/Run/Run2.png","images/Run/Run3.png","images/Run/Run4.png","images/Run/Run5.png",
  "images/Run/Run6.png","images/Run/Run7.png","images/Run/Run8.png","images/Run/Run9.png","images/Run/Run10.png"
  );
  DeadImage=loadAnimation("images/Dead/Dead1.png","images/Dead/Dead2.png","images/Dead/Dead3.png","images/Dead/Dead4.png","images/Dead/Dead5.png",
  "images/Dead/Dead6.png","images/Dead/Dead7.png","images/Dead/Dead8.png","images/Dead/Dead9.png","images/Dead/Dead10.png",
  );
  JumpImage=loadAnimation("images/Jump/Jump1.png","images/Jump/Jump2.png","images/Jump/Jump3.png","images/Jump/Jump4.png","images/Jump/Jump5.png",
  "images/Jump/Jump6.png","images/Jump/Jump7.png","images/Jump/Jump8.png","images/Jump/Jump9.png","images/Jump/Jump10.png"
  );
  IdleImage=loadAnimation("images/Idle/Idle1.png","images/Idle/Idle2.png","images/Idle/Idle3.png","images/Idle/Idle4.png","images/Idle/Idle5.png",
  "images/Idle/Idle6.png","images/Idle/Idle7.png","images/Idle/Idle8.png","images/Idle/Idle9.png","images/Idle/Idle10.png",
  );
  SlideImage=loadAnimation("images/Slide/Slide1.png","images/Slide/Slide2.png","images/Slide/Slide3.png","images/Slide/Slide4.png","images/Slide/Slide5.png",
  "images/Slide/Slide6.png","images/Slide/Slide7.png","images/Slide/Slide8.png","images/Slide/Slide9.png","images/Slide/Slide10.png",
  );

  CoinImage=loadAnimation("images/Coin/Coin1.png","images/Coin/Coin2.png","images/Coin/Coin3.png","images/Coin/Coin4.png","images/Coin/Coin5.png",
  "images/Coin/Coin6.png",)

  groundImage=loadImage("images/Tile/1.png"); 

  platformImage=loadImage("images/Tile/14.png");

  bushImage=loadImage("images/objects/Bush.png");

  keyImage=loadImage("images/objects/Key.png");
}
function setup() {
  createCanvas(displayWidth, displayHeight-170);
  console.log(displayWidth);
  adam=createSprite(displayWidth/2,displayHeight/2,100,100);
  adam.addAnimation("Run",RunImage);
  adam.addAnimation("idle",IdleImage);
  adam.addAnimation("Jump",JumpImage);
  adam.scale=0.3;

  groundGroup =new Group(); 
  platformGroup= new Group();
  invisiblePlatformGroup= new Group();
  bushGroup= new Group();
  keyGroup = new Group();
  coinGroup= new Group();

    ground=createSprite(displayWidth/2,740,displayWidth,50);
    ground.addImage("groundImage", groundImage);
    ground.velocityX=-6;
    ground.scale=2.2;
}

function draw() {
  background(BGImage);
  edges=createEdgeSprites();
  adam.collide(edges[0]);
  adam.collide(edges[1]);
  adam.collide(edges[2]);
  adam.collide(edges[3]);
  //adam.changeAnimation("Run",RunImage);

  if(ground.x<0){
    ground.x=ground.width/2;
  }

  if(keyDown(LEFT_ARROW)){
    adam.x=adam.x-10
    adam.changeAnimation("Run",RunImage);
  }

  if(keyDown(RIGHT_ARROW)){
    adam.x=adam.x+10;
    adam.changeAnimation("Run",RunImage);
  }

  if(keyDown("space")){
    adam.velocityY=-15;
    adam.changeAnimation("Jump",JumpImage);
  }
 adam.velocityY=adam.velocityY+1;

 for (var i=0;i<coinGroup.length;i=i+1){
   if(coinGroup.get(i).isTouching(adam)){
     coinGroup.get(i).destroy()
   }
 }

 

  spawnPlatform();
  //spawnGround();
  spawnBush();
  spawnCoin();
  drawSprites();
  adam.collide(ground);
  adam.collide(platformGroup);
  adam.collide(bushGroup);
  if(adam.isTouching(invisiblePlatformGroup)){
    adam.changeAnimation("idle",IdleImage);
  }
}

function spawnGround(){
  if(frameCount%100===0){
    var ground=createSprite(0,700,70,50);
    ground.addImage("groundImage", groundImage);
    ground.velocityX=-1;
    groundGroup.add(ground);
  }
}

function spawnPlatform(){
  if(frameCount%300===0){
    var platform=createSprite(displayWidth,350,40,30);
    platform.addImage("Platform", platformImage);
    platform.velocityX=-3;
    platform.y=Math.round(random(250,400));
    platform.scale=0.7;
    platformGroup.add(platform);

    var invisiblePlatform=createSprite(displayWidth,platform.y-40,250,30);
    invisiblePlatform.velocityX=-3;
    invisiblePlatform.visible=false;
    invisiblePlatformGroup.add(invisiblePlatform);

    var key=createSprite(displayWidth,platform.y-40,250,30);
    key.addImage("key",keyImage);
    key.velocityX=-3;
    key.scale=0.5;
    keyGroup.add(key);
  }
}

function spawnBush(){
  if(frameCount%200===0){
    var bush=createSprite(displayWidth,600,20,20);
    bush.addImage("Bush", bushImage);
    bush.velocityX=-6;
    bush.scale=1.5;
    bushGroup.add(bush);
  }
}

function spawnCoin(){
  if(frameCount%40===0){
var coin=createSprite(displayWidth/2,0,20,20);
coin.addAnimation("coin",CoinImage);
coin.scale=0.3;
coin.x=Math.round(random(100,displayWidth-100));
coin.velocityY=4;
coin.depth=ground.depth;
coin.depth=coin.depth-1;
coinGroup.add(coin);
}}