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
var viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
var viewportWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframeBackground: 'transparent',
        width: viewportWidth - 40,
        height: viewportHeight - 40
    }
});

// create mouse, mconstraint
var mouse = Mouse.create(render.canvas);
var mConstraint = MouseConstraint.create(engine, {mouse: mouse});
World.add(world, mConstraint);

// create bodies
for (var i = 0; i < 6; i++) {
    var options = {
        friction: 0.05,
        restitution: 0.6
    }
    var box = Bodies.circle(getRandomNumber(0, viewportWidth - 220), getRandomNumber(500, viewportHeight - 200), 110, options);
    boxes.push(box);
    World.add(world, box);
}

var mousebody;
document.body.addEventListener("mousedown", () => {
    mousebody = Bodies.circle(0,0,80);
    World.add(world, mousebody);

    document.body.addEventListener("mousemove", function(event) {
        var mouseX = event.pageX - render.canvas.getBoundingClientRect().left;
        var mouseY = event.pageY - render.canvas.getBoundingClientRect().top; 
        
        if (world.bodies.length > 10) {
            var mousebody = world.bodies[10];
            Matter.Body.setPosition(mousebody, { x: mouseX, y: mouseY });
        }
    });
});
document.body.addEventListener("mouseup", () => {
    if (mousebody) {
        World.remove(world, mousebody);
        // mousebody 변수를 null 또는 undefined로 설정하여 다음에 이벤트가 발생할 때 새로운 mousebody를 생성할 수 있도록 함
        mousebody = null;
    }
})


boundaries.push(new Boundary(viewportWidth/2, -50, viewportWidth, 100));
boundaries.push(new Boundary(viewportWidth/2, viewportHeight, viewportWidth, 100));
boundaries.push(new Boundary(-50, viewportHeight/2, 100, viewportHeight));
boundaries.push(new Boundary(viewportWidth + 10, viewportHeight/2, 100, viewportHeight));


// // run the renderer
// Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);


function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
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



// body의 위치를 svg에서 참조하기
function onSVGPositionChange() {
    let svgs = document.querySelectorAll('.container');
    svgs.forEach((svg, index) => {
        let boxIndex = index;
        let box = boxes[boxIndex];

        let posX = box.position.x - 125;
        let posY = box.position.y - 125;
        let angle = box.angle * 115;

        svg.style.left = posX + "px";
        svg.style.top = posY + "px"
        svg.style.transform = "rotate(" + angle + "deg)";
    });
}

setInterval(onSVGPositionChange, 60);