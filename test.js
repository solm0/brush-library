var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,

    Render = Matter.Render,
    Runner = Matter.Runner;
    
// create engine
var engine = Engine.create();
engine.gravity.y = -1;
engine.gravity.scale = 0.0001;
var world = engine.world;

var boxes = [];
var boundaries = [];

// create render
var render = Render.create({
    element: document.body,
    engine: engine
});

// create mouse, mconstraint
var mouse = Mouse.create(render.canvas);
var mConstraint = MouseConstraint.create(engine, {mouse: mouse});
World.add(world, mConstraint);

// create bodies
boxes.push(new Box(400, 200, 80, 80));
boxes.push(new Box(450, 250, 80, 80));
boxes.push(new Box(350, 230, 80, 80));
boxes.push(new Box(430, 220, 80, 80));
boxes.push(new Box(230, 210, 80, 80));
boxes.push(new Box(230, 200, 80, 80));
boundaries.push(new Boundary(400, 0, 800, 100));
boundaries.push(new Boundary(400, 600, 800, 100));
boundaries.push(new Boundary(0, 300, 100, 600));
boundaries.push(new Boundary(800, 300, 100, 600));



// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);





function Box(x,y,w,h) {
    var options = {
        friction: 0.05,
        restitution: 0.6
    }
    var box = Bodies.rectangle(x,y,w,h,options);
    World.add(world, box);
    console.log(box);
}

function Boundary(x,y,w,h) {
    var options = {
        friction: 0.05,
        restitution: 0.6,
        isStatic: true
    }
    var boundary = Bodies.rectangle(x,y,w,h,options);
    World.add(world, boundary);
}