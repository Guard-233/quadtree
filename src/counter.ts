import { Quadtree } from "./Quadtree";
import { Rectangle } from "./Rectangle";
import { Point } from "./Point";
import p5 from "p5";

export function setupCounter(element: HTMLButtonElement) {
	// 创建一个容器用于p5 canvas
	const sketchContainer = document.createElement("div");
	sketchContainer.id = "sketch-container";
	element.parentElement?.appendChild(sketchContainer);

	// p5 sketch function
	const sketch = (p: p5) => {
		let quadtree: Quadtree;
		let points: Point[] = [];
		const width = 400;
		const height = 400;

		p.setup = () => {
			p.createCanvas(width, width);
			p.background(200);

			quadtree = new Quadtree(
				new Rectangle(width / 2, height / 2, width / 2, height / 2)
			);

			for (let i = 0; i < 300; i++) {
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
