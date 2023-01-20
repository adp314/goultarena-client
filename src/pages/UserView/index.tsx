import { GlobalLayout } from "../../components/GlobalLayout/index";
import { FooterLayout } from "../../components/FooterLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserPublicDataWithParam } from "../../lib/usersByParam";
import { useQuery } from "react-query";
import { GiUpgrade } from "react-icons/Gi";
import { FaTwitter } from "react-icons/fa";
import { BsDiscord } from "react-icons/Bs";
import { AiFillTrophy } from "react-icons/Ai";

const getTeamPublicDataInUserViewPage = () => {
  const userData = JSON.parse(sessionStorage.getItem("userData") as string);
  const userDataTeamId = userData.team._teamId;
  return useQuery(["getTeamPublicData", userDataTeamId], async () => {
    const response = await fetch(
      `http://localhost:4000/api/team/publicfetch?_id=${userDataTeamId}`,
      {
        method: "GET",
      }
    );
    const responseJSON = await response.json();

    return responseJSON;
  });
};

export function UserView() {
  const navigate = useNavigate();
  let { userId } = useParams();
  const { data: userData } = useGetUserPublicDataWithParam(userId);
  const { data: teamData } = getTeamPublicDataInUserViewPage();

  return (
    <GlobalLayout
      pageContainer={
        <>
          {userData && (
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
                          backgroundImage: `url(https://goultarena-aws3.s3.eu-west-3.amazonaws.com/${userData.keyProfileImg})`,
                        }}
                      />
                      <div>
                        <h1 className="text-4xl uppercase text-center">
                          {userData.userName}
                        </h1>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center gap-1.5">
                            {userData.socialNetworkDiscord && (
                              <>
                                <BsDiscord className="text-indigo-700 text-lg mt-0.5" />
                                <p className="uppercase">
                                  {" "}
                                  {userData.socialNetworkDiscord}
                                </p>
                              </>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5">
                            {userData.socialNetworkDiscord && (
                              <>
                                <FaTwitter className="text-blue-500 text-lg mt-0.5" />
                                <p className="uppercase">
                                  {" "}
                                  {userData.socialNetworkTwitter}
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
                              userData?.characterSkinUploaded[0]
                            }
                          />
                          <div className="flex flex-col gap-1">
                            <div className="flex gap-2">
                              <p className="text-blue-600">
                                W {userData.playerStats.totalWins}
                              </p>
                              <span>-</span>
                              <p className="text-gray-300">
                                {" "}
                                D {userData.playerStats.totalWins}
                              </p>
                              <span>-</span>
                              <p className="text-red-600">
                                L {userData.playerStats.totalWins}
                              </p>
                            </div>
                            <div className="flex justify-start items-center gap-2">
                              <AiFillTrophy />{" "}
                              <p>{userData.playerPoints} pts</p>
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
                              {userData.team._teamId ? (
                                <>
                                  <div
                                    className={`w-28 h-28 rounded border-2 border-gray-600 border-opacity-30 bg-no-repeat bg-cover drop-shadow-md cursor-pointer`}
                                    onClick={() =>
                                      navigate(
                                        `/team/view/${userData.team._teamId}`
                                      )
                                    }
                                    style={{
                                      backgroundImage: `url(https://goultarena-aws3.s3.eu-west-3.amazonaws.com/${teamData?.teamKeyImg})`,
                                    }}
                                  />
                                  <div className="flex flex-col justify-start gap-3">
                                    <div className="flex gap-2 items-center">
                                      <span className="uppercase ">name :</span>
                                      <p>{teamData?.teamName}</p>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                      <span className="uppercase ">
                                        Points :
                                      </span>
                                      <p>{teamData?.totalTeamPointsScore}</p>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                      <span className="uppercase ">
                                        stats :
                                      </span>
                                      <p className="text-blue-600">
                                        W {teamData?.teamAllStatsCount.Wins}
                                      </p>
                                      <span>-</span>
                                      <p className="text-gray-300">
                                        {" "}
                                        D {teamData?.teamAllStatsCount.Draws}
                                      </p>
                                      <span>-</span>
                                      <p className="text-red-600">
                                        L {teamData?.teamAllStatsCount.Looses}
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
                        <p>{userData.description}</p>
                      </div>
                    </div>
                  </div>
                </section>
                <FooterLayout />
              </div>
            </div>
          )}
        </>
      }
    />
  );
}
