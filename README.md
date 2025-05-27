# Quadtree Visualization with p5.js and Vite

这个项目演示了如何在 Vite + TypeScript 项目中集成 p5.js 来创建交互式的 Quadtree 可视化。

## 依赖安装

```bash
# 安装 p5.js 核心库
npm install p5

# 安装 TypeScript 类型定义
npm install --save-dev @types/p5
```

## p5.js 在 Vite 中的集成方式

### 1. 导入方式

```typescript
import p5 from "p5"; // 推荐：ES6 默认导入
// 或者
import * as p5 from "p5"; // 命名空间导入
```

### 2. 实例模式（推荐）

```typescript
const sketch = (p: p5) => {
	p.setup = () => {
		p.createCanvas(400, 400);
	};

	p.draw = () => {
		p.background(220);
	};
};

// 创建 p5 实例并绑定到 DOM 元素
new p5(sketch, document.getElementById("container"));
```

### 3. 优势

- ✅ 更好的 TypeScript 支持
- ✅ 可以与其他 JavaScript 框架（React, Vue 等）集成
- ✅ 避免全局命名空间污染
- ✅ 支持多个 p5 实例

## 项目结构

```
src/
├── Point.ts          # 点类定义
├── Rectangle.ts      # 矩形类（支持 p5 绘制）
├── Quadtree.ts       # 四叉树实现（支持可视化）
├── counter.ts        # p5.js 集成和交互逻辑
└── main.ts          # 应用入口
```

## 运行项目

```bash
# 开发模式
npm run dev

# 构建
npm run build

# 预览构建结果
npm run preview
```

## 功能特性

- 🎨 实时 Quadtree 可视化
- 🖱️ 点击添加新点
- 📊 动态显示统计信息
- 🔍 自动重新构建 Quadtree

## 关键实现要点

1. **实例模式**: 使用 `new p5(sketch, container)` 而不是全局模式
2. **类型安全**: 所有 p5 方法都有完整的 TypeScript 类型支持
3. **模块化**: 每个类都可以独立导入和使用
4. **可视化方法**: 为业务类添加 `draw(p: p5)` 方法来支持 p5 绘制

## 常见问题

### Q: 为什么使用实例模式？

A: 实例模式更适合现代 JavaScript 开发，特别是与框架集成时。它避免了全局变量污染，支持多个画布实例。

### Q: 如何处理 TypeScript 类型？

A: 安装 `@types/p5` 并使用 `p: p5` 参数类型注解即可获得完整的类型支持。

### Q: 如何优化性能？

A: 在 `draw()` 循环中避免创建新对象，使用对象池，合理使用 `noLoop()` 和 `redraw()`。
