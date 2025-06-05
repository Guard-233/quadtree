import { Quadtree, Rectangle, Point } from "./Quadtree";
import p5 from "p5";
import { Mover } from "./Vector";

export function setupQuadree(element: HTMLButtonElement) {
  // 创建一个容器用于p5 canvas
  const sketchContainer = document.createElement("div");
  sketchContainer.id = "sketch-container";
  element.parentElement?.appendChild(sketchContainer);

  // p5 sketch function
  const sketch = (p: p5) => {
    let quadtree: Quadtree;
    let points: Point[] = [];
    const width = 800;
    const height = 800;

    p.setup = () => {
      p.createCanvas(width, width);
      p.background(200);

      quadtree = new Quadtree(
        new Rectangle(width / 2, height / 2, width / 2, height / 2)
      );

      for (let i = 0; i < 1500; i++) {
        const point = new Point(p.random(0, width), p.random(0, height));
        points.push(point);
        quadtree.insert(point);
      }
    };
    p.draw = () => {
      p.background(0);

      quadtree.draw(p);

      p.stroke(0, 255, 0);
      p.strokeWeight(5);

      for (const point of points) {
        p.point(point.x, point.y);
      }

      const mouseRect = new Rectangle(p.mouseX, p.mouseY, 50, 30);
      p.rectMode(p.CENTER);
      p.rect(
        mouseRect.x,
        mouseRect.y,
        mouseRect.halfWidth * 2,
        mouseRect.halfHeight * 2
      );

      const containsPoints = quadtree.query(mouseRect);

      p.stroke(255, 0, 0);
      p.strokeWeight(5);
      for (const point of containsPoints) {
        p.point(point.x, point.y);
      }
    };
  };

  // 创建p5实例
  new p5(sketch, sketchContainer);
}

export function setupMover(element: HTMLButtonElement) {
  const sketchContainer = document.createElement("div");
  sketchContainer.id = "sketch-container";
  element.parentElement?.appendChild(sketchContainer);
  const sketch = (p: p5) => {
    let mover: Mover;
    p.setup = () => {
      p.createCanvas(800, 800);
      p.background(200);
      mover = new Mover(p.createVector(p.width / 2, p.height / 2), p);
    };

    p.keyPressed = () => {
      console.log(
        "%c [ p.keyCode ]-81",
        "font-size:13px; background:pink; color:#bf2c9f;",
        p.keyCode
      );
      if (p.keyCode === 38) {
        mover.speedUp();
      } else if (p.keyCode === 40) {
        mover.slowDown();
      }
    };

    p.draw = () => {
      p.background(200);

      mover.toMouse();
      mover.move();
      mover.checkEdges();
      mover.render();
    };
  };

  new p5(sketch, sketchContainer);
}
export function setupForce(element: HTMLButtonElement) {
  const sketchContainer = document.createElement("div");
  sketchContainer.id = "sketch-container";
  element.parentElement?.appendChild(sketchContainer);
  const sketch = (p: p5) => {
    let mover: Mover;
    let mover2: Mover;
    p.setup = () => {
      p.createCanvas(800, 400);
      p.background(200);
      mover = new Mover(p.createVector(p.width / 3, p.height / 2), 2, p);
      mover2 = new Mover(p.createVector(p.width / 2, p.height / 2), 20, p);
    };

    p.keyPressed = () => {
      if (p.keyCode === 38) {
        mover.applyForce(new p5.Vector(0.1, -30));
        mover2.applyForce(new p5.Vector(0.1, -3000));
      }
    };

    p.draw = () => {
      p.background(200);
      if (p.mouseIsPressed) {
        mover.applyForce(new p5.Vector(0.1, 0));
        mover2.applyForce(new p5.Vector(0.1, 0));
      }
      mover.applyForce(new p5.Vector(0, 0.098).mult(mover.mass));

      mover.move();
      mover.checkEdges();
      mover.render();

      mover2.applyForce(new p5.Vector(0, 0.098).mult(mover2.mass));

      mover2.move();
      mover2.checkEdges();
      mover2.render();
    };
  };

  new p5(sketch, sketchContainer);
}
