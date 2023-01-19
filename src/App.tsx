import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrowserView, MobileView, TabletView } from "react-device-detect";
import "./App.css";
import "./i18n";
import { LoadingMarkup } from "./components/LoadingMarkup";
import { Home } from "./pages/Home/index";
import { Ladders } from "./pages/Ladders/index";
import { Directory } from "./pages/Directory/index";
import { Ranking } from "./pages/Ranking/index";
import { Help } from "./pages/Help/index";
import { ErrorPage } from "./pages/ErrorPage";
import { UserEdit } from "./pages/UserEdit";
import { UserView } from "./pages/UserView";
import { TeamDashboard } from "./pages/TeamDashboard";
import { TeamView } from "./pages/TeamView";
import { TeamCreate } from "./pages/TeamCreate";
import { NotAllowedViewPage } from "./pages/NotAllowedViewPage";
import Auth0ProviderWithNavigate from "./auth/Auth0-provider-with-navigate";
import { QueryClient, QueryClientProvider } from "react-query";

// import { ProtectedRoute } from "./components/ProtectedRoute";
const queryClient = new QueryClient()
const loadingMarkup = <LoadingMarkup />;

function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={loadingMarkup}>
          <Auth0ProviderWithNavigate>
            <BrowserView>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/ladders" element={<Ladders />} />
                <Route path="/directory" element={<Directory />} />
                <Route path="/ranking" element={<Ranking />} />
                <Route path="/help" element={<Help />} />
                <Route path="/user/edit" element={<UserEdit />} />
                <Route path="/user/view/:userId" element={<UserView />} />
                <Route path="/team/create" element={<TeamCreate />} />
                <Route path="/team/dashboard" element={<TeamDashboard />} />
                <Route path="/team/view/:teamId" element={<TeamView />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </BrowserView>
            <MobileView>
              <Routes>
                <Route
                  path="/notallowedview"
                  element={<NotAllowedViewPage />}
                />
              </Routes>
            </MobileView>
            <TabletView>
              <Routes>
                <Route
                  path="/notallowedview"
                  element={<NotAllowedViewPage />}
                />
              </Routes>
            </TabletView>
          </Auth0ProviderWithNavigate>
        </Suspense>
      </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
