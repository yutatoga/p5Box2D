var Settings = function() {
  this.density = 1.0;
  this.friction = 0.1;
  this.restitution = 0.5;
  this.enableDebug = true;

  this.surfaceWidth = 180;

  this.drop = function(){
    for (var i = 0; i < particles.length; i++){
      particles[i].killBody();
    }
    particles.length = 0;
  };
}


// A reference to our box2d world
let world;

// A list for all of our particles
let particles = [];

// An object to store information about the uneven surface
let surface;

var settings = new Settings();

function setup() {
  createCanvas(960, 540);

  // Initialize box2d physics and create the world
  world = createWorld();

  // Create the surface

  surface = new Surface(settings.surfaceWidth);

  var gui = new dat.GUI();
  gui.add(settings, 'drop');
  gui.add(settings, 'density', 0, 100);
  gui.add(settings, 'friction', 0, 100);
  gui.add(settings, 'restitution', 0, 1);
  gui.add(settings, 'enableDebug');
}

function draw() {
  background(0);

  // We must always step through time!
  let timeStep = 1.0 / 60;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep, 10, 10);

  // particles fall from the top every so often
  if(particles.length <= 100){
    if (random(1) < 0.5) {
      let radius = random(3, 30);
      let positionX = random(radius, settings.surfaceWidth-radius);
      let positionY = random(-settings.surfaceWidth/2.0, settings.surfaceWidth/2.0);
      particles.push(new Particle(positionX, positionY, radius, settings.density, settings.friction, settings.restitution));
    }

    if (random(1) < 0.5) {
      let sz2 = random(3, 30);
      particles.push(new Particle(width-50, +50, sz2, settings.density, settings.friction, settings.restitution));
    }
  }

  // Draw the surface
  // surface.display();

  // Display all the particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].display(settings.enableDebug);
    if (particles[i].done()) {
      particles.splice(i, 1);
    }
  }
}
