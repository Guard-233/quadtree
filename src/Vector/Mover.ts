import p5 from "p5";

export class Mover {
  position: p5.Vector;
  velocity: p5.Vector;
  acceleration: p5.Vector;
  topVelocity = 10;

  p: p5;

  constructor(position: p5.Vector, p: p5) {
    this.position = position;
    this.velocity = p.createVector(0, 0);
    this.acceleration = p.createVector(0, 0);
    this.p = p;
  }

  move() {
    this.velocity.add(this.acceleration);
    console.log(
      "%c [ this.velocity ]-20",
      "font-size:13px; background:pink; color:#bf2c9f;",
      this.velocity.mag()
    );
    this.velocity.limit(this.topVelocity);
    this.position.add(this.velocity);
    // if (this.velocity.x <= 0) {
    //   this.velocity.x = 0;
    //   this.acceleration.x = 0;
    // }
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
    if (this.position.x < 0) {
      this.velocity.x = -this.velocity.x * 0.3;
    } else if (this.position.y < 0) {
      this.velocity.y = -this.velocity.y * 0.3;
    } else if (this.position.x > this.p.width) {
      this.velocity.x = -this.velocity.x * 0.3;
    } else if (this.position.y > this.p.height) {
      this.velocity.y = -this.velocity.y * 0.3;
    }
  }

  render() {
    this.p.stroke(255);
    this.p.strokeWeight(3);
    this.p.circle(this.position.x, this.position.y, 5);
  }
}
