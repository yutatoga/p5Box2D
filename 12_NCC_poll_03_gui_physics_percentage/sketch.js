var Settings = function() {
  this.width = 960;
  this.height = 540;
  this.surfaceWidth = 180;

  this.particleRadiusMin = 5;
  this.particleRadiusMax = 30;

  this.density = 3.0;
  this.friction = 0.1;
  this.restitution = 0.53;
  this.enableDebug = true;

  this.ratioLeft = 0.3;
  this.paritcleAddSpeed = 0.5; // 0~1: 1 is maximum speed

  this.drop = function(){
    // reset volumes
    volumeRight = 0;
    volumeLeft = 0;

    // destroy all particles from world
    for (var i = 0; i < particles.length; i++){
      particles[i].killBody();
    }

    // clear particles array
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

var volumeLeft = 0;
var volumeRight = 0;
var volumeMagicNumber = 1.25;

function setup() {
  createCanvas(settings.width, settings.height);

  // Initialize box2d physics and create the world
  world = createWorld();

  // Create the surface

  surface = new Surface(settings.surfaceWidth);

  var gui = new dat.GUI();
  gui.add(settings, 'drop');
  gui.add(settings, 'ratioLeft', 0, 1);
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
  world.Step(timeStep, 40, 20);

  // particles fall from the top every so often

  // LEFT
  if (random(1) < settings.paritcleAddSpeed && (volumeLeft * volumeMagicNumber) / (settings.surfaceWidth * height) <  settings.ratioLeft) {
    let radius = random(settings.particleRadiusMin, settings.particleRadiusMax);
    volumeLeft += radius * radius * Math.PI;

    let positionX = random(radius, settings.surfaceWidth - radius);
    let positionY = random(-settings.surfaceWidth, -radius);
    particles.push(new Particle(positionX, positionY, radius, settings.density, settings.friction, settings.restitution));
  }

  // RIGHT
  if (random(1) < settings.paritcleAddSpeed && (volumeRight * volumeMagicNumber) / (settings.surfaceWidth * height) < (1 - settings.ratioLeft)) {
    let radius = random(settings.particleRadiusMin, settings.particleRadiusMax);
    volumeRight += radius * radius * Math.PI;

    let positionX = random(width - settings.surfaceWidth + radius, width - radius);
    let positionY = random(-settings.surfaceWidth, -radius);
    particles.push(new Particle(positionX, positionY, radius, settings.density, settings.friction, settings.restitution));
  }

  // Display all the particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].display(settings.enableDebug);
    if (particles[i].done()) {
      particles.splice(i, 1);
    }
  }

  // Debug
  if(settings.enableDebug){
    // Draw the surface
    surface.display();

    // Draw the guide line for the ratio
    // - left
    stroke(0, 255, 255);
    line(0, height * (1 - settings.ratioLeft), settings.surfaceWidth, height * (1 - settings.ratioLeft));
    line(width - settings.surfaceWidth, height * settings.ratioLeft, width, height * settings.ratioLeft);
  }

}
