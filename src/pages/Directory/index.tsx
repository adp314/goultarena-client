import { GlobalLayout } from "../../components/GlobalLayout/index";
import { FooterLayout } from "../../components/FooterLayout";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { GiUpgrade } from "react-icons/Gi";
import { AiFillTrophy } from "react-icons/Ai";
import { FaAddressBook } from "react-icons/fa";
import { DirectoryPlayers } from "../../components/DirectoryPlayers";
import { DirectoryTeams } from "../../components/DirectoryTeams";
import axios from "axios";

export function Directory() {
  let { userId } = useParams();

  // const [goultarenaIsLoaded, setGoultarenaIsLoaded] = useState(false);
  const [directorySelect, setDirectorySelect] = useState(true);

  const [fetchedUserData, setFetchedUserData] = useState({
    email: "",
    userName: "",
    sub: "",
    keyProfileImg: "",
    characterSkinUploaded: ["", ""],
    description: "",
    socialNetworkDiscord: "",
    socialNetworkTwitter: "",
    playerStats: { totalWins: 0, totalDraws: 0, totalLooses: 0 },
    playerPoints: "",
  });

  console.log(directorySelect);

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
                      setDirectorySelect(true);
                    }}
                  >
                    {directorySelect ? (
                      <h2 className="uppercase text-2xl text-orange-400">
                        players
                      </h2>
                    ) : (
                      <h2 className="uppercase text-2xl">players</h2>
                    )}
                  </div>
                  <div className="h-5 w-1 bg-white" />
                  <div
                    className="flex justify-start items-center gap-1.5"
                    onClick={() => {
                      setDirectorySelect(false);
                    }}
                  >
                    {directorySelect ? (
                      <h2 className="uppercase text-2xl">teams</h2>
                    ) : (
                      <h2 className="uppercase text-2xl text-orange-400">
                        teams
                      </h2>
                    )}
                  </div>
                </div>
                <div className="flex justify-center items-center h-full w-full border-t border-white border-opacity-10 pt-10">
                  <div>
                    {directorySelect ? (
                      <DirectoryPlayers />
                    ) : (
                      <DirectoryTeams />
                    )}
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
