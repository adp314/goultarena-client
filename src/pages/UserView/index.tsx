import { GlobalLayout } from "../../components/GlobalLayout/index";
import { FooterLayout } from "../../components/FooterLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { GiUpgrade } from "react-icons/Gi";
import { FaTwitter } from "react-icons/fa";
import { BsDiscord } from "react-icons/Bs";
import { AiFillTrophy } from "react-icons/Ai";
import { IoMdStats } from "react-icons/Io";
import axios from "axios";

export function UserView() {
  let { userId, teamId } = useParams();
  const navigate = useNavigate();

  // const [goultarenaIsLoaded, setGoultarenaIsLoaded] = useState(false);

  const [fetchedUserData, setFetchedUserData] = useState({
    email: "",
    userName: "",
    sub: "",
    keyProfileImg: "",
    characterSkinUploaded: ["", ""],
    description: "",
    socialNetworkDiscord: "",
    socialNetworkTwitter: "",
    team: { _teamId: "", teamName: "", teamTag: "" },
    playerStats: { totalWins: 0, totalDraws: 0, totalLooses: 0 },
    playerPoints: "",
  });

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
    async function fetchUserViewData() {
      try {
        const resUser = await axios.get(
          `http://localhost:4000/api/user/publicfetch?_id=${userId}`
        );
        setFetchedUserData(resUser.data);

        // fetch team data if the player have a team

        if (fetchedUserData.team._teamId) {
          const resTeam = await axios.get(
            `http://localhost:4000/api/team/publicfetch?_id=${userId}`
          );
          setFetchedTeamData(resTeam.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchUserViewData();
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
              <div className="h-full mr-24 ml-24 border-r border-l border-white border-opacity-10">
                <div className="flex items-center justify-between my-12 mx-24 ">
                  <div
                    className={`w-36 h-36 rounded border-2 border-gray-600 bg-no-repeat bg-cover drop-shadow-md`}
                    style={{
                      backgroundImage: `url(https://goultarena-aws3.s3.eu-west-3.amazonaws.com/${fetchedUserData?.keyProfileImg})`,
                    }}
                  />
                  <div>
                    <h1 className="text-4xl uppercase text-center">
                      {fetchedUserData.userName}
                    </h1>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center gap-1.5">
                        {fetchedUserData.socialNetworkDiscord && (
                          <>
                            <BsDiscord className="text-indigo-700 text-lg mt-0.5" />
                            <p className="uppercase">
                              {" "}
                              {fetchedUserData.socialNetworkDiscord}
                            </p>
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        {fetchedUserData.socialNetworkDiscord && (
                          <>
                            <FaTwitter className="text-blue-500 text-lg mt-0.5" />
                            <p className="uppercase">
                              {" "}
                              {fetchedUserData.socialNetworkTwitter}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-36 h-36 rounded border-2 border-gray-600 justify-center items-center drop-shadow-md">
                    <GiUpgrade className="text-6xl" />
                    <p>Unranked</p>
                  </div>
                </div>

                <div className="flex justify-center items-center border-t border-white border-opacity-10 py-16">
                  <div className="flex justify-between w-[57%]">
                    <div className="flex flex-col gap-4 justify-center items-center my-10 ">
                      <img
                        alt="character skin"
                        src={
                          "data:image/png;base64," +
                          fetchedUserData.characterSkinUploaded[0]
                        }
                      />
                      <div className="flex flex-col gap-1">
                        <div className="flex gap-2">
                          <p className="text-blue-600">
                            W {fetchedUserData.playerStats.totalWins}
                          </p>
                          <span>-</span>
                          <p className="text-gray-300">
                            {" "}
                            D {fetchedUserData.playerStats.totalWins}
                          </p>
                          <span>-</span>
                          <p className="text-red-600">
                            L {fetchedUserData.playerStats.totalWins}
                          </p>
                        </div>
                        <div className="flex justify-start items-center gap-2">
                          <AiFillTrophy />{" "}
                          <p>{fetchedUserData.playerPoints} pts</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 w-[50%]">
                      <div className=" flex flex-col w-full h-full gap-1.5 ">
                        <h2 className="uppercase">derniers matchs</h2>
                        <div className="border-gray-600 rounded h-full w-full border"></div>
                      </div>

                      <div className="flex flex-col w-full h-full gap-1.5">
                        <h2 className="uppercase">équipe</h2>
                        <div className="border-gray-600 rounded h-full w-full border flex justify-between items-center text-sm p-6">
                          {fetchedUserData.team._teamId ? (
                            <>
                              <div
                                className={`w-28 h-28 rounded border-2 border-gray-600 border-opacity-30 bg-no-repeat bg-cover drop-shadow-md cursor-pointer`}
                                onClick={() =>
                                  navigate(
                                    `/team/view/${fetchedUserData.team._teamId}`
                                  )
                                }
                                style={{
                                  backgroundImage: `url(https://goultarena-aws3.s3.eu-west-3.amazonaws.com/${fetchedTeamData.teamKeyImg})`,
                                }}
                              />
                              <div className="flex flex-col justify-start gap-3">
                                <div className="flex gap-2 items-center">
                                  <span className="uppercase ">name :</span>
                                  <p>{fetchedUserData.team.teamName}</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                  <span className="uppercase ">Points :</span>
                                  <p>{fetchedTeamData.totalTeamPointsScore}</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                  <span className="uppercase ">stats :</span>
                                  <p className="text-blue-600">
                                    W {fetchedTeamData.teamAllStatsCount.Wins}
                                  </p>
                                  <span>-</span>
                                  <p className="text-gray-300">
                                    {" "}
                                    D {fetchedTeamData.teamAllStatsCount.Draws}
                                  </p>
                                  <span>-</span>
                                  <p className="text-red-600">
                                    L {fetchedTeamData.teamAllStatsCount.Looses}
                                  </p>
                                </div>
                              </div>{" "}
                            </>
                          ) : (
                            <div>no team</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex w-full justify-center items-center pb-16">
                  <div className="flex justify-center border-gray-600 bg-[#1f1f1f] items-center border rounded w-[57%] py-8 drop-shadow-md ">
                    <p>{fetchedUserData.description}</p>
                  </div>
                </div>
              </div>
            </section>
            <FooterLayout />
          </div>
        </div>
      }
    />
  );
}
