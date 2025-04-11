import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { BrowserRouter } from "react-router";

import { WindowUtils } from "@/lib/window.utils";
import { nextTick } from "./composables";

const w = new WindowUtils("main");
nextTick(() => {
  w.renderFocus();
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
