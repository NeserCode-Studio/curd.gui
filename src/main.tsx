import ReactDOM from "react-dom/client";
import { App } from "./App";
import { BrowserRouter } from "react-router";

import { WindowUtils } from "@/lib/window.utils";
import { nextTick } from "./composables";

const $windowMain = new WindowUtils("main");
nextTick(() => {
  $windowMain.renderFocus();
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
