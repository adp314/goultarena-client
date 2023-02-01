import { GlobalLayout } from "../../components/GlobalLayout/index";
import { FooterLayout } from "../../components/FooterLayout";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { TeamDashboardEdit } from "../../components/TeamDashboardEdit";
import { TeamDashboardView } from "../../components/TeamDashboardView";

export function TeamDashboard() {
  let { userId, teamId } = useParams();

  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const [dashboardSelect, setDashboardSelect] = useState(true);

  return (
    <GlobalLayout
      pageContainer={
        <div className="w-full h-full flex justify-center">
          <div className="flex flex-col w-5/6 h-max box-shadow-md ">
            <div className="drop-shadow-md">
              <div className="bg-no-repeat bg-[url('/src/images/banner.jpg')] w-full h-32 bg-cover drop-shadow-md" />
            </div>
            <section className="bg-[#181818] text-white font-KoHo flex flex-col h-full w-full drop-shadow-md">
              <div className="h-full mr-24 ml-24 border-r border-l border-white border-opacity-10">
                <div className="flex gap-4 justify-center items-center my-10 cursor-pointer">
                  <div
                    className="flex justify-start items-center gap-1.5"
                    onClick={() => {
                      setDashboardSelect(true);
                    }}
                  >
                    {dashboardSelect ? (
                      <h2 className="uppercase text-2xl text-orange-400">
                        dashboard
                      </h2>
                    ) : (
                      <h2 className="uppercase text-2xl">dashboard</h2>
                    )}
                  </div>
                  <div className="h-5 w-1 bg-white bg-opacity-50 rounded" />
                  <div
                    className="flex justify-start items-center gap-1.5"
                    onClick={() => {
                      setDashboardSelect(false);
                    }}
                  >
                    {dashboardSelect ? (
                      <h2 className="uppercase text-2xl">edit</h2>
                    ) : (
                      <h2 className="uppercase text-2xl text-orange-400">
                        edit
                      </h2>
                    )}
                  </div>
                </div>
              </div>
              {dashboardSelect ? <TeamDashboardView /> : <TeamDashboardEdit />}
            </section>
            <FooterLayout />
          </div>
        </div>
      }
    />
  );
}
