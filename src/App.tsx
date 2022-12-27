import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContextComponent } from "./contexts/authContext";
import { BrowserView, MobileView, TabletView } from "react-device-detect";
import "./App.css";
import "./i18n";
import { Home } from "./pages/Home/index";
import { NotAllowedView } from "./components/NotAllowedView";

function App() {
  return (
    <>
      <AuthContextComponent>
        <BrowserView>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </BrowserView>
      </AuthContextComponent>

      <MobileView>
        <NotAllowedView />
      </MobileView>
      <TabletView>
        <NotAllowedView />
      </TabletView>
    </>
  );
}

export default App;
