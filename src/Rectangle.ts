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
		this.halfWidth = width / 2;
		this.halfHeight = height / 2;
	}

	contains(point: Point) {
		return (
			point.x >= this.x - this.halfWidth &&
			point.x <= this.x + this.halfWidth &&
			point.y >= this.y - this.halfHeight &&
			point.y <= this.y + this.halfHeight
		);
	}

	// 添加绘制方法用于p5.js可视化
	draw(p: p5) {
		p.noFill();
		p.stroke(0);
		p.strokeWeight(1);
		// 从中心点转换为左上角坐标
		p.rect(
			this.x - this.halfWidth,
			this.y - this.halfHeight,
			this.halfWidth * 2,
			this.halfHeight * 2
		);
	}
}
