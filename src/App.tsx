import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { BrowserView, MobileView, TabletView } from "react-device-detect";
import "./App.css";
import "./i18n";
import { Home } from "./pages/Home/index";
import { UserTest } from "./pages/UserTest/index";
import { UserSignIn } from "./pages/UserSignIn";
import { UserEdit } from "./pages/UserEdit";
import { NotAllowedViewPage } from "./pages/NotAllowedViewPage";
import Auth0ProviderWithNavigate from "./auth/Auth0-provider-with-navigate";
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
              <Route path="/user/edit" element={<UserEdit />} />
              <Route path="/usertest" element={<UserTest />} />
            </Routes>
          </BrowserView>
          <MobileView>
            <Routes>
              <Route path="/notallowedview" element={<NotAllowedViewPage />} />
            </Routes>
          </MobileView>
          <TabletView>
            <Routes>
              <Route path="/notallowedview" element={<NotAllowedViewPage />} />
            </Routes>
          </TabletView>
        </Auth0ProviderWithNavigate>
      </Suspense>
    </>
  );
}

export default App;
