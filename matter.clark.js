// module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Common = Matter.Common,
    Constraint = Matter.Constraint,
    Composites = Matter.Composites,
    MouseConstraint = Matter.MouseConstraint;
    Vertices = Matter.Vertices;

canvasContainer = document.getElementById('canvas-container');
var canvasWidth = (document.getElementById('canvas-container').offsetWidth - 16);
var canvasHeight = document.getElementById('canvas-container').offsetHeight;

var screenWidth = window.innerWidth;
var sceneHeight = 690;
if(screenWidth < 640) {var sceneHeight = 800};

// create an engine
var engine = Engine.create(canvasContainer, {
  render: {
    options: {
      wireframes: false,
      showAngleIndicator: false,
      height: sceneHeight,
      width: 690,
      background: "transparent"
    }
  }
});

var mouseConstraint = MouseConstraint.create(engine);
var mouse = mouseConstraint.mouse;
mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

World.add(engine.world, mouseConstraint);
    
Matter.updateGravity = function(event) {

var orientation = window.orientation,
    gravity = engine.world.gravity;

if (orientation === 0) {
    gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
    gravity.y = Common.clamp(event.beta, -90, 90) / 90;
} else if (orientation === 180) {
    gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
    gravity.y = Common.clamp(-event.beta, -90, 90) / 90;
} else if (orientation === 90) {
    gravity.x = Common.clamp(event.beta, -90, 90) / 90;
    gravity.y = Common.clamp(-event.gamma, -90, 90) / 90;
} else if (orientation === -90) {
    gravity.x = Common.clamp(-event.beta, -90, 90) / 90;
    gravity.y = Common.clamp(event.gamma, -90, 90) / 90;
}
};

window.addEventListener('deviceorientation', function(event) {
            _deviceOrientationEvent = event;
            Matter.updateGravity(event);
        }, true);

window.addEventListener('orientationchange', function() {
            Matter.updateGravity(_deviceOrientationEvent);
        }, false);

// create two boxes and a ground
var rightTriangleA = Vertices.fromPath('0 200 200 200 0 0');
var rightTriangleB = Vertices.fromPath('90 90 0 90 90 0');
var rightTriangleC = Vertices.fromPath('120 120 0 120 120 0');

var rectangleA = Bodies.rectangle(540, 307, 120, 120, {
	isStatic: false, render:{
		fillStyle: '#E3E6F8',
		strokeStyle: 'transparent'
	}
});

var rectangleB = Bodies.rectangle(520, 93, 110, 110, {
	isStatic: false, render:{
		fillStyle: '#00FFAF',
		strokeStyle: 'transparent'
	}
});

var circleA = Bodies.circle(400, 210, 87.5, {
	isStatic: false, render:{
		fillStyle: '#1210DF',
		strokeStyle: 'transparent'
	}
});

var triangleA = Bodies.fromVertices(300, 300, rightTriangleA, {
                isStatic: false, render: {
                    fillStyle: '#00FFAF',
                    strokeStyle: 'transparent'
                }
            });

var triangleB = Bodies.fromVertices(294, 134, rightTriangleB, {
                isStatic: false, render: {
                    fillStyle: '#E3E6F8',
                    strokeStyle: 'transparent'
                }
            });

var triangleC = Bodies.fromVertices(560, 207, rightTriangleC, {
                isStatic: false, render: {
                    fillStyle: '#FF0068',
                    strokeStyle: 'transparent'
                }
            });

var screenWidth = window.innerWidth;
var groundY = 580;
if(screenWidth < 640) {var groundY = 800};

var ground = Bodies.rectangle(400, groundY, 800, 10, {
	isStatic: true, render: {
                    fillStyle: 'transparent',
                    strokeStyle: 'transparent'
                }
            });

var left = Bodies.rectangle(0, (canvasHeight / 2), 10, (canvasHeight * 4), {
    isStatic: true, render: {
                    fillStyle: 'transparent',
                    strokeStyle: 'transparent'
                }
            });
var right = Bodies.rectangle(690, (canvasHeight / 2), 10, (canvasHeight * 4), {
    isStatic: true, render: {
                    fillStyle: 'transparent',
                    strokeStyle: 'transparent'
                }
            });

// add all of the bodies to the world
World.add(engine.world, [circleA, triangleA, triangleB, triangleC, rectangleA, rectangleB, ground, left, right]);

// run the engine
Engine.run(engine);

function mover(){
    var el = document.getElementById('contact');
    var screenWidth = window.innerWidth;
    if(screenWidth < 640) {
        document.getElementById('aside').appendChild(el);
    }
    if(screenWidth > 640) {
        document.getElementById('main').appendChild(el);
    }
};

mover();

window.addEventListener("resize", function(){
    mover();
});