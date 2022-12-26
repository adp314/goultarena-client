import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserView, MobileView, TabletView } from "react-device-detect";
import "./i18n";

const loadingMarkup = <div>Loading translation ...</div>;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
      <BrowserView>
        <App />
      </BrowserView>
      <MobileView>
        <h1>This is rendered only on mobile</h1>
      </MobileView>
      <TabletView>
        <h1>This is rendered only on tablet</h1>
      </TabletView>
    </React.StrictMode>
  </Suspense>
);
