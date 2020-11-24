//declariing variables for different objects
var PLAY = 1;
var END = 0;
var gameState = 1;

var knife, knifeI, knifeS;

var fruit1, fruit2, fruit3, fruit4;
var fruitsGroup;

var monster, monsterI;
var enemyGroup;

var score;

var gameOver, gameOverI;

var knifeSwooshSound;
var gameOverSound;

var Ninja;
function preload() {

  //load animations for different variables
  
  Ninja = loadImage("Fruit Ninja.png");
  
  knifeI = loadAnimation("sword.png");
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");

  monsterI = loadAnimation("alien1.png", "alien2.png");

  gameOverI = loadAnimation("gameover.png");
  
  //load sounds
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");
}

function setup() {
  //create the canvas
  createCanvas(500, 400);

  //creating sprite object for knife and allowing its movement
  knife = createSprite(250, 200);
  knife.addAnimation("sword", knifeI);
  knife.scale = 0.75;
  knife.setCollider("circle", 0, 0, 40);
 // knife.debug = true;

  //creating sprite object for game over animation
  gameOver = createSprite(250, 200);
  gameOver.addAnimation("over", gameOverI);
  gameOver.scale = 1.75;
  gameOver.visible = false;

  //creating groups
  fruitsGroup = createGroup();
  enemyGroup = createGroup();

  //making the initial score 0
  score = 0;
}

function draw() {

  //clear the background
  background(Ninja);

  //display text for "SCORE"
  fill("white");
  textFont("broadway");
  textSize(20);
  text("SCORE : " + score, 370, 30);

  //PLAY state
  if (gameState === PLAY) {

    //make the knife/sword move with the movement of mouse
    knife.x = mouseX;
    knife.y = mouseY;

    //increase score when knife is touching any fruit as well as add sound
    if (fruitsGroup.isTouching(knife)) {
      fruitsGroup.destroyEach();
      
      //add sound and increase score 
      knifeSwooshSound.play();
      score = score + 2;
    }

    //changing state when knife is touching the enemy
    if (enemyGroup.isTouching(knife)) {
      
      //add sound and change state
      gameOverSound.play();
      gameState = END;
    }

    //calling the functions for movement of fruits and of the enemy
    spawn_fruit();
    enemy();

    //END state
  } else if (gameState === END) {

    //destroy/remove each object on the canvas
    fruitsGroup.destroyEach();
    enemyGroup.destroyEach();

    //stop all the movements on the cavas
    fruitsGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);

    //remove knife from the canvas
    knife.visible = false;
    knife.velocityX = 0;
    knife.velocityY = 0;

    //GAMEOVER
    gameOver.visible = true;
  }

  //display output
  drawSprites();
}
//movement of fruits
function spawn_fruit() {
  //random movement of fruits using frameCount
 if(World.frameCount % 80 === 0){
    position = Math.round(random(1,2))
    fruit = createSprite(500,200,20,20);
    fruit.scale = 0.2;
    
     //fruit.debug=true;
    
   //use random function to choose between fruits
     r = Math.round(random(1,4));
  if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y = Math.round(random(50,340));
    fruit.velocityX = -9;
    fruit.setLifetime = 100;
    
   //use random func. to make the fruits come frm diferent sides(right or left)
    if(position == 1){
      fruit.x = 600 ;
      fruit.velocityX = -(9+(score/4));
    }
    else {
    if (position == 2){
      fruit.x = 0;
      fruit.velocityX = (9+(score/4));
      }
    }
   //add all the fruits to one group 'fruitsGroup'
    fruitsGroup.add(fruit);
  }
  
}

//movement of Enemy using frameCount
function enemy() {
  if (frameCount % 200 === 0) {
    monster = createSprite(500, Math.round(random(100,300)), 20, 20);
    monster.addAnimation("moving", monsterI);
    monster.velocityX = -(9+score/10);
    monster.setLifetime = 60;

    //add monster to "enemyGroup"
    enemyGroup.add(monster);
  }
}
//#DhRiTi
//#DD