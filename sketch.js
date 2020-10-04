//Create variables here
var dog;
var happyDog;
var database;
var foodS = 0;
var foodStock;
var dogImg;
var happyDogImg;

function preload() {
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
	var canvas = createCanvas(500, 500);
  
   dog = createSprite(width/2,height/2,10,10);
   dog.addImage(dogImg);
   dog.scale = 0.12;
}


function draw() {  
  background(46,139,87);


  drawSprites();
  //add styles here
  textSize(14);
  fill("white");
  stroke(0.5);
  text("NOTE: PRESS UP ARROW KEY TO FEED DRAGO MILK!",65,50);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  text("FOOD REMAINING: " + foodS, 170,180);
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<= 0){
    x=0;
  }else {
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  });
}

