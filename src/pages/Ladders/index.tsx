import { GlobalLayout } from "../../components/GlobalLayout/index";
import { FooterLayout } from "../../components/FooterLayout";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { GiUpgrade } from "react-icons/Gi";
import { FaTwitter } from "react-icons/fa";
import { BsDiscord } from "react-icons/Bs";
import { AiFillTrophy } from "react-icons/Ai";
import axios from "axios";
import { DirectoryPlayers } from "../../components/DirectoryPlayers";

export function Ladders() {
  let { userId } = useParams();

  // const [goultarenaIsLoaded, setGoultarenaIsLoaded] = useState(false);

  // const [fetchedUserData, setFetchedUserData] = useState({
  //   email: "",
  //   userName: "",
  //   sub: "",
  //   keyProfileImg: "",
  //   characterSkinUploaded: ["", ""],
  //   description: "",
  //   socialNetworkDiscord: "",
  //   socialNetworkTwitter: "",
  //   playerStats: { totalWins: 0, totalDraws: 0, totalLooses: 0 },
  //   playerPoints: "",
  // });

  return (
    <GlobalLayout
      pageContainer={
        <div className="w-full h-full flex justify-center">
          <div className="flex flex-col w-5/6 h-max box-shadow-md ">
            <div className="drop-shadow-md">
              <div className="bg-no-repeat bg-[url('/src/images/banner.jpg')] w-full h-32 bg-cover drop-shadow-md" />
            </div>
            <section className="bg-[#181818] text-white font-KoHo flex flex-col h-full w-full drop-shadow-md">
              <h1>ladders page</h1>
            </section>
            <FooterLayout />
          </div>
        </div>
      }
    />
  );
}
