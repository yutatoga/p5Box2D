// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A rectangular box


// Constructor
class Particle {
  constructor(x, y, r, density, friction, restitution) {

    this.r = r;
    this.density = density || 1.0;
    this.friction = friction || 0.1;
    this.restitution = restitution || 0.5;

    // Define a body
    let bd = new box2d.b2BodyDef();
    bd.type = box2d.b2BodyType.b2_dynamicBody;
    bd.position = scaleToWorld(x, y);

    // Define a fixture
    let fd = new box2d.b2FixtureDef();
    // Fixture holds shape
    fd.shape = new box2d.b2CircleShape();
    fd.shape.m_radius = scaleToWorld(this.r);

    // Some physics
    fd.density = this.density;
    fd.friction = this.friction;
    fd.restitution = this.restitution;

    // Create the body
    this.body = world.CreateBody(bd);
    // Attach the fixture
    this.body.CreateFixture(fd);

    // Some additional stuff
    // initial force
    this.body.SetLinearVelocity(new box2d.b2Vec2(random(-5, 5), random(30, 50)));
    this.body.SetAngularVelocity(random(-5, 5));
  }

  // This function removes the particle from the box2d world
  killBody() {
    world.DestroyBody(this.body);
  }

  // Is the particle ready for deletion?
  done() {
    // Let's find the screen position of the particle
    let transform = this.body.GetTransform();
    let pos = scaleToPixels(transform.position);
    // Is it off the bottom of the screen?
    if (pos.y > height + this.r * 2) {
      this.killBody();
      return true;
    }
    return false;
  }

  // Drawing the Particle
  display(enableDebug) {
    // Get the body's position
    let pos = scaleToPixels(this.body.GetPosition());
    // Get its angle of rotation
    let a = this.body.GetAngleRadians();

    // Draw it!
    rectMode(CENTER);
    push();
    translate(pos.x, pos.y);
    rotate(a);

    if(pos.x < width/2){
      fill(255, 20, 160);
    }else{
      fill(60, 80, 230);
    }

    if(enableDebug){
      stroke(255);
      strokeWeight(1);
    } else {
      strokeWeight(0);
    }
    ellipse(0, 0, this.r * 2, this.r * 2);
    // Let's add a line so we can see the rotation
    line(0, 0, this.r, 0);
    pop();
  }
}
