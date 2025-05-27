import "./style.css";
import { setupCounter } from "./counter.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div id="counter">
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
