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

		p.setup = () => {
			p.createCanvas(400, 400);
			p.background(200);

			quadtree = new Quadtree(new Rectangle(100, 100, 200, 200));

			// 添加一些随机点
			for (let i = 0; i < 50; i++) {
				// 在矩形范围内生成随机点 (0, 0) 到 (200, 200)
				const point = new Point(p.random(0, 200), p.random(0, 200));
				points.push(point);
				quadtree.insert(point);
			}

			console.log(
				"%c [ quadtree ]-30",
				"font-size:13px; background:pink; color:#bf2c9f;",
				quadtree
			);

			quadtree.draw(p);
		};
	};

	// 创建p5实例
	new p5(sketch, sketchContainer);
}
