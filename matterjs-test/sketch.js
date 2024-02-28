var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;
    
var engine;
var world;
var boxes = [];
var boundaries = [];
var mConstraint;
var mouse;

function setup() {
    var canvas = createCanvas(400,400);
    engine = Engine.create();
    engine.gravity.y = -1;
    engine.gravity.scale = 0.0001;
    world = engine.world;
    

    boundaries.push(new Boundary(200, height, width, 50, 0));
    boundaries.push(new Boundary(200, 0, width, 50, 0));
    boundaries.push(new Boundary(0, 200, 50, height, 0));
    boundaries.push(new Boundary(width, 200, 50, height, 0));

    for (var i = 0; i < 6; i++) {
        boxes.push(new Box(random(50,350), random(50,100), 50, 50));
    }

    var canvasmouse = Mouse.create(canvas.elt);
    canvasmouse.pixelRatio = pixelDensity();
    var options = {
        mouse: canvasmouse
    }
    mConstraint = MouseConstraint.create(engine, options);
    World.add(world, mConstraint);
}

function draw() {
    background(50);
    Engine.update(engine);
    
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].show();
    }
    for (var i = 0; i < boundaries.length; i++) {
        boundaries[i].show();
    }
}