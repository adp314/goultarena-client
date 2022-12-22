import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContextComponent } from "./contexts/authContext";
import "./App.css";
import "./i18n";
import { Home } from "./pages/Home/index";

function App() {
  return (
    <>
      <AuthContextComponent>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </AuthContextComponent>
    </>
  );
}

export default App;
