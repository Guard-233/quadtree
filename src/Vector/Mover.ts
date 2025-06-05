import p5 from "p5";

export class Mover {
  position: p5.Vector;
  velocity: p5.Vector;
  acceleration: p5.Vector;
  topVelocity = 10;

  p: p5;
  mass: number;
  r: number;

  constructor(position: p5.Vector, r: number, p: p5) {
    this.position = position;
    this.velocity = p.createVector(0, 0);
    this.acceleration = p.createVector(0, 0);
    this.p = p;
    this.r = r;
    this.mass = Math.PI * Math.pow(r, 2);
  }

  move() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topVelocity);
    this.acceleration.mult(0);
    this.position.add(this.velocity);
  }

  applyForce(force: p5.Vector) {
    const f = force.copy();

    f.div(this.mass);

    this.acceleration.add(f);
  }
  speedUp() {
    this.acceleration.add(this.p.createVector(0.1, 0.0));
    this.acceleration.limit(this.topVelocity);
  }

  slowDown() {
    this.acceleration.sub(this.p.createVector(0.1, 0.0));

    if (this.acceleration.mag() < 0.2) {
      this.velocity.set(0, 0);
    }
  }

  toMouse() {
    const mouse = this.p.createVector(this.p.mouseX, this.p.mouseY);
    const subMouseVector = p5.Vector.sub(mouse, this.position);

    subMouseVector.normalize();

    const gravitational = 1 - subMouseVector.mag() / this.p.width;

    subMouseVector.mult(gravitational / 5);

    if (gravitational > 0.7) {
      this.acceleration = subMouseVector;
    } else {
      this.acceleration = subMouseVector.mult(-1);
    }
  }

  checkEdges() {
    if (this.position.x - this.r < 0) {
      this.position.x = this.position.x + 1;
      this.velocity.x = -this.velocity.x * 0.9;
    } else if (this.position.y - this.r < 0) {
      this.position.y = this.position.y + 1;
      this.velocity.y = -this.velocity.y * 0.9;
    } else if (this.position.x + this.r > this.p.width) {
      this.position.x = this.position.x - 1;
      this.velocity.x = -this.velocity.x * 0.9;
    } else if (this.position.y + this.r > this.p.height) {
      this.position.y = this.position.y - 1;
      this.velocity.y = -this.velocity.y * 0.9;
    }
  }

  render() {
    this.p.stroke(255);
    this.p.strokeWeight(3);
    this.p.circle(this.position.x, this.position.y, this.r);
  }
}
