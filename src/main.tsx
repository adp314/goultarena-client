import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18n";
import { Auth0Provider } from "@auth0/auth0-react";

const loadingMarkup = <div>Loading translation ...</div>;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
      <Auth0Provider
        domain="goultarena.eu.auth0.com"
        clientId="YfvoocEqSWvbHVaVODpwWK1LwSWF5C04"
        redirectUri={"http://127.0.0.1:5174/signin"}
        audience="Goutarena unique identifier"
        scope="openid profile email"
      >
        <App />
      </Auth0Provider>
    </React.StrictMode>
  </Suspense>
);
