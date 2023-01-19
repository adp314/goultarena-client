import { GlobalLayout } from "../../components/GlobalLayout/index";
import { FooterLayout } from "../../components/FooterLayout";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export function TeamView() {
  let { userId, teamId } = useParams();

  const [fetchedTeamData, setFetchedTeamData] = useState({
    _id: "",
    teamName: "",
    teamTag: "",
    teamKeyImg: "",
    teamMembers: [],
    totalTeamPointsScore: 0,
    teamAllStatsCount: { Wins: 0, Draws: 0, Looses: 0 },
  });

  useEffect(() => {
    async function fetchTeamViewData() {
      try {
        const resTeam = await axios.get(
          `http://localhost:4000/api/team/publicfetch?_id=${teamId}`
        );
        setFetchedTeamData(resTeam.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchTeamViewData();
  }, []);

  return (
    <GlobalLayout
      pageContainer={
        <div className="w-full h-full flex justify-center">
          <div className="flex flex-col w-5/6 h-max box-shadow-md ">
            <div className="drop-shadow-md">
              <div className="bg-no-repeat bg-[url('/src/images/banner.jpg')] w-full h-32 bg-cover drop-shadow-md" />
            </div>
            <section className="bg-[#181818] text-white font-KoHo flex flex-col h-full w-full drop-shadow-md">
              <h1>
                team view page of {fetchedTeamData.teamName} with id: {teamId}{" "}
              </h1>

              <div>
                <form>
                  <input type="text" />
                  <button className="text-white bg-green-800 ml-4">
                    submit postulation
                  </button>
                </form>
              </div>
            </section>
            <FooterLayout />
          </div>
        </div>
      }
    />
  );
}
