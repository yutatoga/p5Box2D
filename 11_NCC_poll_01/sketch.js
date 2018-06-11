// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com


// A reference to our box2d world
let world;

// A list for all of our particles
let particles = [];

// An object to store information about the uneven surface
let surface;

var counter = 0;

function setup() {
  createCanvas(960, 540);

  // Initialize box2d physics and create the world
  world = createWorld();

  // Create the surface
  surface = new Surface();
}

function draw() {
  background(0);

  // We must always step through time!
  let timeStep = 1.0 / 30;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep, 10, 10);

  // particles fall from the top every so often
  if(counter <= 100){
    if (random(1) < 0.5) {
      counter++;
      let sz = random(3, 30);
      particles.push(new Particle(50, -50, sz));
    }

    if (random(1) < 0.5) {
      counter++;
      let sz2 = random(3, 30);
      particles.push(new Particle(width-50, -50, sz2));

    }
  }

  // Draw the surface
  // surface.display();

  // Display all the particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].display();
    if (particles[i].done()) {
      particles.splice(i, 1);
    }
  }
}
