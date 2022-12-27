import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18n";

const loadingMarkup = <div>Loading translation ...</div>;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Suspense>
);
