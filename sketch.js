var earth, earthImg, myFont, start, startImg, gameState;
var Co2, penguin, penguinImg, iceberg1, iceberg2, iceberg3;
var iceberg4, water, edge1, edge2, penguin2Img, penguinFacing;
var penguin3Img, penguin4Img, fish, fishImg, fishCatchability;
var fishGroup, penguinCollider, nightframe, pengImg, pengStill;
var hunger, lastEaten, pengImgL;

function preload(){
    earthImg = loadImage('earth.png');
    myFont = loadFont('Minecraft.ttf');
    startImg = loadImage('start.png');
    penguinImg = loadImage('penguin.png');
    penguin2Img = loadImage('penguin2.png');
    penguin3Img = loadImage('penguin3.png');
    penguin4Img = loadImage('penguin4.png');
    fishImg = loadImage('fish.png');
    pengImg = loadAnimation('peng1.png', 'peng2.png', 'peng3.png', 'peng4.png');
    pengImgL = loadAnimation('pengl1.png', 'pengl2.png', 'pengl3.png', 'pengl4.png');
    pengStill = loadImage('peng1.png');
}

function setup(){
    createCanvas(450, 800);
    earth = createSprite(225, 200, 225, 400);
    earth.addImage(earthImg);
    earth.scale = 1.5;
    start = createSprite(225, 650, 200, 80);
    start.addImage(startImg);
    start.scale = 0.7;
    gameState = 0;
    Co2 = 0;

    water = createSprite(450, 700, 2250, 300);
    water.shapeColor = ('#396975');
    water.visible = false;
    penguin = createSprite(225, 400, 20, 20);
    penguin.addAnimation('peng', pengImg);
    penguin.velocityX = 3;
    penguin.scale = 0.2;
    penguin.visible = false;
    pengImg.frameDelay = 5;
    iceberg1 = createSprite(225, 550, 300, 40);
    iceberg1.shapeColor = ('#daedf2');
    iceberg1.visible = false;
    iceberg2 = createSprite(-500, 550, 300, 40);
    iceberg2.shapeColor = ('#daedf2');
    iceberg2.visible = false;
    iceberg3 = createSprite(725, 550, 300, 40);
    iceberg3.shapeColor = ('#daedf2');
    iceberg3.visible = false;
    iceberg4 = createSprite(1225, 550, 300, 40);
    iceberg4.shapeColor = ('#daedf2');
    iceberg4.visible = false;
    edge1 = createSprite(-725, 400, 100, 800);
    edge2 = createSprite(1580, 400, 100, 800);
    fishGroup = new Group();
    penguinCollider = createSprite(penguin.x, penguin.y, 150, 150);
    penguinCollider.visible = false;
    lastEaten = 0;
    hunger = 4
    //penguin.debug = true;
}

function draw(){
    background('#daedf2');
    if(mousePressedOver(start)){
        gameState = 'start';
    }
    if(gameState === 'start'){
        background('#bfe7f2');
        earth.visible = false;
        start.visible = false;
        penguin.visible = true;
        iceberg1.visible = true;
        iceberg2.visible = true;
        iceberg3.visible = true;
        iceberg4.visible = true;
        water.visible = true;
        penguin.velocityY += 0.65;

        console.log(hunger);

        if(hunger > 6){
            hunger -= 1;
        }

        if(penguin.isTouching(iceberg1) && penguin.y >= 550){
            penguin.bounceOff(iceberg1);
            penguin.velocityY -= 1;
        }
        else{
            penguin.collide(iceberg1);
        }
        if(penguin.isTouching(iceberg2) && penguin.y >= 550){
            penguin.bounceOff(iceberg2);
            penguin.velocityY -= 1;
        }
        else{
            penguin.collide(iceberg2);
        }
        if(penguin.isTouching(iceberg3) && penguin.y >= 550){
            penguin.bounceOff(iceberg3);
            penguin.velocityY -= 1;
        }
        else{
            penguin.collide(iceberg3);
        }
        if(penguin.isTouching(iceberg4) && penguin.y >= 550){
            penguin.bounceOff(iceberg4);
            penguin.velocityY -= 1;
        }
        else{
            penguin.collide(iceberg4);
        }
        penguin.collide(edge1);
        penguin.collide(edge2);
        camera.position.x = penguin.x;
        penguinCollider.x = penguin.x;
        penguinCollider.y = penguin.y;
        if(penguin.y >= 800){
            penguin.velocityY -= 3;
        }
        if(penguin.y >= 800 && penguin.velocityY < 0.9){
            penguin.velocityY = 0;
        }
        if(keyDown('w') && penguin.y >= 550){
            penguin.velocityY -= 0.75;
        }
        if(keyDown('s') && penguin.y >= 550){
            penguin.velocityY += 0.5;
        }
        if(penguin.y >= 550){
            penguin.velocityY -= 0.7
            //tint(255, 128);
        }
        if(keyWentDown('space') && penguin.y >= 490 && penguin.y<= 550){
            for(var i = 0; i < 10; i++){
                penguin.velocityY -= 0.7;
            }
        }
        if(keyWentDown('a')){
            penguin.velocityX = -3;
        }
        if(keyWentDown('d')){
            penguin.velocityX = 3;
        }
        if(camera.position.x>= 1300){
            camera.position.x = 1300;
        }
        if(camera.position.x<= -450){
            camera.position.x = -450;
        }
        if(penguin.velocityX < 0){
            penguin.addAnimation('pengl', pengImgL);
        }
        if(penguin > 0){
            penguin.addAnimation('peng', pengImg);
        }
        if(frameCount%200 === 0 && fishCatchability === 'true'){
            fish = createSprite(1600, random(600, 780), 20, 10);
            fish.addImage(fishImg);
            fish.scale = 0.07;
            fish.velocityX = random(-2, -6);
            fish.lifetime = 550;
            fish.depth = 1000;
            fishCatchability = 'false';
            fishGroup.add(fish);
        }
        if(fishCatchability === 'true'){
            fishGroup.setVisibleEach(true);
            if(penguinCollider.isTouching(fishGroup)){
                fishGroup.setVelocityXEach(fish.velocityX * -1);
            }
        }
        if(frameCount >= 100){
            fishCatchability = 'true';
        }
        if(fishCatchability === 'true' && penguin.isTouching(fishGroup)){
            console.log('caught some fish');
            fishGroup.destroyEach();
            hunger += 1;
            lastEaten = frameCount;
        }
        if(fishCatchability === 'false'){
            fishGroup.setVisibleEach(false);
        }
        if(frameCount % 900 === 0 && frameCount !== 0){
            nightframe = frameCount + 240;
        }
        if(frameCount < nightframe){
            background(0);
            Co2 += .3;
        }
        if(frameCount > 1140 && frameCount < 1800){
            day2();
        }
        if(frameCount > 2040 && frameCount < 2700){
            day3();
        }
        if(frameCount > 2940 && frameCount < 3600){
            day4();
        }
        if(frameCount > 3840 && frameCount < 4500){
            day5();
        }
        if(frameCount > 4740 && frameCount < 5400){
            day6();
        }
        if(frameCount > 5640 && frameCount < 6300){
            day7();
        }
        if(frameCount > 6540 && frameCount < 7200){
            day8();
        }
        if(frameCount > 7440 && frameCount < 8100){
            day9();
        }
        if(frameCount > 8340 && frameCount < 9000){
            day10();
        }
        if(frameCount > 9100 && hunger > 0){
            survive();
        }
        if(lastEaten + 300 === frameCount){
            hunger -= 1
            lastEaten = frameCount
        }
        if(hunger < 1){
            starve();
        }
    }
    if(gameState === 'survive'){
        background('#3ff2ce');
        fill('#095a9c');
        textFont(myFont, 27);
        text('You Survived For 5 minutes!', camera.position.x - 200, camera.position.y);
        text('Congradulations! You Win!', camera.position.x - 190, camera.position.y);
        penguin.visible = false;
        iceberg1.visible = false;
        iceberg2.visible = false;
        iceberg3.visible = false;
        iceberg4.visible = false;
        fish.visible = false;
        water.visible = false;
    }
    if(gameState === 'starve'){
        background('#3ff2ce');
        fill('#095a9c');
        textFont(myFont, 25);
        text('You Starved! You Can Do Better', camera.position.x - 185, camera.position.y);
        penguin.visible = false;
        iceberg1.visible = false;
        iceberg2.visible = false;
        iceberg3.visible = false;
        iceberg4.visible = false;
        fishGroup.setLifetimeEach(0);
        water.visible = false;
    }
    drawSprites();

    if(gameState === 0){
        fill('#095a9c');
        textFont(myFont, 30);
        text('Environmental Choices', 49, 500);
    }

    if(gameState === 'start'){
        fill('#095a9c');
        textFont(myFont, 30);
        text('Co2 in PPM: ' + Math.round(Co2), camera.position.x - 200, camera.position.y -330);
        fill('#b56c35');
        if(hunger >= 4){
            text('Food Level: Good For Now', camera.position.x - 200, camera.position.y -300);
        }
        else if(hunger <= 3 && hunger > 1){
            text('Food Level: Hungry', camera.position.x - 200, camera.position.y -300);
        }
        else if(hunger === 1){
            text('Food Level: EAT NOW', camera.position.x - 200, camera.position.y -300);
        }
    }
}

function day2(){
    background('#bad6de');
    iceberg1.width = 270;
    iceberg2.width = 270;
    iceberg3.width = 270;
    iceberg4.width = 270;
    fish.velocityX = -3;
}
function day3(){
    background('#b8ced4');
    iceberg1.width = 240;
    iceberg2.width = 240;
    iceberg3.width = 240;
    iceberg4.width = 240;
    fish.velocityX = -3.5;
}
function day4(){
    background('#afc4c9');
    iceberg1.width = 210;
    iceberg2.width = 210;
    iceberg3.width = 210;
    iceberg4.width = 210;
    fish.velocityX = -4;
}
function day5(){
    background('#a0b5ba');
    iceberg1.width = 180;
    iceberg2.width = 180;
    iceberg3.width = 180;
    iceberg4.width = 180;
    fish.velocityX = -4.5;
}
function day6(){
    background('#95a8ad');
    iceberg1.width = 150;
    iceberg2.width = 150;
    iceberg3.width = 150;
    iceberg4.width = 150;
    fish.velocityX = -5;
}
function day7(){
    background('#87979c');
    iceberg1.width = 120;
    iceberg2.width = 120;
    iceberg3.width = 120;
    iceberg4.width = 120;
    fish.velocityX = -5.5;
}
function day8(){
    background('#748387');
    iceberg1.width = 90;
    iceberg2.width = 90;
    iceberg3.width = 90;
    iceberg4.width = 90;
    fish.velocityX = -6;
}
function day9(){
    background('#636f73');
    iceberg1.width = 45;
    iceberg2.width = 45;
    iceberg3.width = 45;
    iceberg4.width = 45;
    fish.velocityX = -6.5;
}
function day10(){
    background('#525c5e');
    iceberg1.width = 0;
    iceberg2.width = 0;
    iceberg3.width = 0;
    iceberg4.width = 0;
    fish.velocityX = -7;
}
function survive(){
    gameState = 'survive'
}
function starve(){
    gameState = 'starve'
}

//day3 === true && day4 === true && day5 === true && day6 === true && day7 === true && day8 === true && day9 === true && day10 === true