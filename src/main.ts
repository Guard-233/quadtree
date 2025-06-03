import "./style.css";
import { setupMover, setupQuadree } from "./setup.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div id="counter">
  </div>
`;

setupMover(document.querySelector<HTMLButtonElement>("#counter")!);
