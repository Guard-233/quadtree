import "./style.css";
import { setupForce, setupMover, setupQuadree } from "./setup.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div id="counter">
  </div>
`;

setupForce(document.querySelector<HTMLButtonElement>("#counter")!);
