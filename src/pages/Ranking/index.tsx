import { GlobalLayout } from "../../components/GlobalLayout/index";
import { FooterLayout } from "../../components/FooterLayout";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { GiUpgrade } from "react-icons/Gi";
import { FaTwitter } from "react-icons/fa";
import { BsDiscord } from "react-icons/Bs";
import { AiFillTrophy } from "react-icons/Ai";
import axios from "axios";

export function Ranking() {
  let { userId } = useParams();

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
    playerStats: { totalWins: 0, totalDraws: 0, totalLooses: 0 },
    playerPoints: "",
  });

  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/user/publicfetch?_id=${userId}`
        );
        setFetchedUserData(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchUserData();
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
              
            </section>
            <FooterLayout />
          </div>
        </div>
      }
    />
  );
}
