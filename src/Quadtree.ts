import { Point } from "./Point";
import { Rectangle } from "./Rectangle";
import p5 from "p5";

export class Quadtree {
	boundary: Rectangle;
	points: Point[] = [];
	capacity: number;
	rt?: Quadtree;
	lt?: Quadtree;
	rb?: Quadtree;
	lb?: Quadtree;
	divided = false;

	constructor(boundary: Rectangle, capacity = 4) {
		this.boundary = boundary;
		this.capacity = capacity;
	}

	initChildrenQuadtree() {
		const { x, y, halfWidth, halfHeight } = this.boundary;
		const newHalfWidth = halfWidth / 2;
		const newHalfHeight = halfHeight / 2;

		// 左上象限 (left-top)
		this.lt = new Quadtree(
			new Rectangle(
				x - newHalfWidth,
				y - newHalfHeight,
				newHalfWidth,
				newHalfHeight
			),
			this.capacity
		);
		// 右上象限 (right-top)
		this.rt = new Quadtree(
			new Rectangle(
				x + newHalfWidth,
				y - newHalfHeight,
				newHalfWidth,
				newHalfHeight
			),
			this.capacity
		);
		// 右下象限 (right-bottom)
		this.rb = new Quadtree(
			new Rectangle(
				x + newHalfWidth,
				y + newHalfHeight,
				newHalfWidth,
				newHalfHeight
			),
			this.capacity
		);
		// 左下象限 (left-bottom)
		this.lb = new Quadtree(
			new Rectangle(
				x - newHalfWidth,
				y + newHalfHeight,
				newHalfWidth,
				newHalfHeight
			),
			this.capacity
		);
	}

	insert(point: Point) {
		if (!this.boundary.contains(point)) {
			return;
		}

		if (this.points.length < this.capacity) {
			this.points.push(point);
		} else {
			this.divided = true;
			if (this.divided && !this.lt) {
				this.initChildrenQuadtree();
			}

			this.lt?.insert(point);
			this.rt?.insert(point);
			this.rb?.insert(point);
			this.lb?.insert(point);
		}
	}

	query(rect: Rectangle): Point[] {
		if (!rect.intersects(this.boundary)) {
			return [];
		}

		const lb = this.lb?.query(rect) || [];
		const rb = this.rb?.query(rect) || [];
		const lt = this.lt?.query(rect) || [];
		const rt = this.rt?.query(rect) || [];

		const self = this.points.filter((point) => {
			return rect.contains(point);
		});

		return [...self, ...lb, ...rt, ...lt, ...rb];
	}

	draw(p: p5) {
		this.boundary.draw(p);

		if (this.divided) {
			this.lt?.draw(p);
			this.rt?.draw(p);
			this.rb?.draw(p);
			this.lb?.draw(p);
		}
	}
}
