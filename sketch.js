//var gamestate = 0; //FALTA EL 0
//var playerCount;
var database;
var position;

var heroe1, heroe2;
var villano;
var rayosGroup;
var rayos;

function preload() {
    heroe1v = loadImage("Verde.png");
    heroe2v = loadImage("Rojo.png");
    villanov = loadImage("Villano.png");
    rayosv = loadImage("Rayo.png");
    fondo1 = loadImage("Fondo de batalla.jpg");
}

function setup() {
    createCanvas(1200, displayHeight - 50);
    database = firebase.database();

    heroe1 = createSprite(200, 200, 10, 10);
    heroe1.addImage(heroe1v);
    heroe1.scale = 0.2;

    heroe2 = createSprite(200, 250, 10, 10);
    heroe2.addImage(heroe2v);
    heroe2.scale = 0.2;

    villano = createSprite(1050, 300, 10, 10);
    villano.addImage(villanov);
    villano.scale = 1.0;

    rayos = createSprite(200, 350, 10, 10);
    rayos.addImage(rayosv);
    rayos.scale = 0.2;
    rayosGroup = new Group();

    var heroe1Position = database.ref('heroe1/position');
    heroe1Position.on("value", readPosition, showError);

    var heroe2Position2 = database.ref('heroe2/position');
    heroe2Position2.on("value", readPosition2, showError);
}

function draw() {
    background(fondo1)
    drawSprites();

    if (position !== undefined) {

        if (keyDown(LEFT_ARROW)) {
            writePosition(-5, 0);
        } else if (keyDown(RIGHT_ARROW)) {
            writePosition(5, 0);
        } else if (keyDown(UP_ARROW)) {
            writePosition(0, -5);
        } else if (keyDown(DOWN_ARROW)) {
            writePosition(0, 5);
        }

        if (keyDown("A")) {
            writePosition2(-5, 0);
        } else if (keyDown("D")) {
            writePosition2(5, 0);
        } else if (keyDown("W")) {
            writePosition2(0, -5);
        } else if (keyDown("S")) {
            writePosition2(0, 5);
        }
    }
}

function readPosition(data) {
    position = data.val();
    heroe1.x = position.x;
    heroe1.y = position.y;
}

function readPosition2(data) {
    position = data.val();
    heroe2.x = position.x;
    heroe2.y = position.y;
}

function writePosition(x, y) {
    database.ref('heroe1/position').set({
        'x': position.x + x,
        'y': position.y + y
    });

}

function writePosition2(x, y) {
    database.ref('heroe2/position').set({
        'x': position.x + x,
        'y': position.y + y
    });
}

function showError() {
    console.log("error")
}