import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { BrowserView, MobileView, TabletView } from "react-device-detect";
import "./App.css";
import "./i18n";
import { Home } from "./pages/Home/index";
import { UserTest } from "./pages/UserTest/index";
import { NotAllowedView } from "./components/NotAllowedView";
import { UserSignIn } from "./pages/UserSignIn";
import Auth0ProviderWithNavigate from "./auth/Auth0-provider-with-navigate";
import ExternalApi from "./pages/ExternalApi";
// import { ProtectedRoute } from "./components/ProtectedRoute";

const loadingMarkup = <div>Loading translation ...</div>;

function App() {
  return (
    <>
      <Suspense fallback={loadingMarkup}>
        <Auth0ProviderWithNavigate>
          <BrowserView>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/signin" element={<UserSignIn />} />
              <Route path="/usertest" element={<UserTest />} />
              <Route path="/externalapi" element={<ExternalApi />} />
            </Routes>
          </BrowserView>
          {/* ////// */}
          <MobileView>
            <NotAllowedView />
          </MobileView>
          <TabletView>
            <NotAllowedView />
          </TabletView>
          {/* ////// */}
        </Auth0ProviderWithNavigate>
      </Suspense>
    </>
  );
}

export default App;
