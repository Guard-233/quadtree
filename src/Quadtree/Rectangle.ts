import { Point } from "./Point";
import p5 from "p5";

export class Rectangle {
	x: number;
	y: number;
	halfWidth: number;
	halfHeight: number;

	constructor(x: number, y: number, width: number, height: number) {
		this.x = x;
		this.y = y;
		this.halfWidth = width;
		this.halfHeight = height;
	}

	contains(point: Point) {
		return (
			point.x >= this.x - this.halfWidth &&
			point.x <= this.x + this.halfWidth &&
			point.y >= this.y - this.halfHeight &&
			point.y <= this.y + this.halfHeight
		);
	}

	intersects(rect: Rectangle) {
		const r1 = rect;
		const r2 = this;

		// 检查是否不相交
		return !(
			(
				r2.x - r2.halfWidth > r1.x + r1.halfWidth || // r2 在 r1 右边
				r2.x + r2.halfWidth < r1.x - r1.halfWidth || // r2 在 r1 左边
				r2.y - r2.halfHeight > r1.y + r1.halfHeight || // r2 在 r1 下边
				r2.y + r2.halfHeight < r1.y - r1.halfHeight
			) // r2 在 r1 上边
		);
	}

	draw(p: p5) {
		p.noFill();
		p.stroke(255);
		p.strokeWeight(1);
		p.rectMode(p.CENTER);
		p.rect(this.x, this.y, this.halfWidth * 2, this.halfHeight * 2);
	}
}
