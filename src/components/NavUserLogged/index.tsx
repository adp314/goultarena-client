import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../lib/api";
import { AiOutlineMenu, AiFillTrophy } from "react-icons/Ai";
import { GiUpgrade } from "react-icons/Gi";
import { BsPersonFill } from "react-icons/Bs";
import { RiSettings3Fill, RiTeamFill } from "react-icons/ri";
import { FaPowerOff } from "react-icons/fa";
import { RxCross2 } from "react-icons/Rx";

export function NavUserLogged() {
  const { isAuthenticated, user, isLoading, getAccessTokenSilently, logout } =
    useAuth0();

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const [fetchedUserData, setFetchedUserData] = useState({
    userName: "",
    sub: "",
    email: "",
    team: { teamId: "", teamName: "", teamTag: "" },
    rank: "",
    playerPoints: "",
    keyProfileImg: "",
  });

  useEffect(() => {
    async function fetchUserDataForNavDisplay() {
      const token = await getAccessTokenSilently();
      if (user && isAuthenticated === true && isLoading === false) {
        try {
          if (user.email) {
            const res = await api
              .authorized(token)
              .get(`/user/fetch?email=${user.email}`);
            setFetchedUserData(res.data);
            console.log(fetchedUserData);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    fetchUserDataForNavDisplay();
  }, [user && isAuthenticated === true]);

  return (
    <>
      <div className="w-full h-0.5 bg-white opacity-75"></div>

      <div className="w-full flex font-KoHo justify-between items-center text-white text-base uppercase ">
        {isMenuVisible ? (
          <div className="h-full w-max flex justify-start items-center">
            <div className="flex justify-start items-center gap-6 ml-3.5 mt-2.5 mb-2.5">
              <Link to="/user/edit">
                <BsPersonFill className="text-xl" />
              </Link>
              <Link to="/user/edit">
                <RiSettings3Fill className="text-xl" />
              </Link>
              <RiTeamFill className="text-xl" />
              <FaPowerOff
                className="text-xl cursor-pointer"
                onClick={() => {
                  localStorage.clear();
                  logout({
                    returnTo: window.location.origin,
                  });
                }}
              />
            </div>
          </div>
        ) : (
          <>
            <p className="ml-1 mt-2 mb-2 text-base">
              {fetchedUserData?.team?.teamTag ? (
                <span>[{fetchedUserData?.team?.teamTag}]</span>
              ) : (
                <span className="ml-1"></span>
              )}{" "}
              {fetchedUserData?.userName}
            </p>
          </>
        )}
        <div
          className="bg-white h-full w-9 bg-opacity-20 flex justify-center items-center cursor-pointer"
          onClick={() => setIsMenuVisible(!isMenuVisible)}
        >
          {isMenuVisible ? (
            <RxCross2 className="text-2xl text-white" />
          ) : (
            <AiOutlineMenu className="text-2xl text-white" />
          )}
        </div>
      </div>
      <div className="w-full h-0.5 bg-white opacity-75"></div>
      {/* /////// */}
      <div className="flex h-full w-full">
        <div className="flex justify-center items-center w-[40%]">
          <div
            className={`w-14 h-14 rounded border-2 bg-no-repeat bg-cover shadow-[0_4px_4px_-0px_rgba(0,0,0,0.25)]`}
            style={{
              backgroundImage: `url(https://goultarena-aws3.s3.eu-west-3.amazonaws.com/${fetchedUserData?.keyProfileImg})`,
            }}
          />
        </div>
        <div className=" h-full w-[60%] text-white flex justify-start items-center">
          <div className="flex flex-wrap items-center justify-start gap-1.5">
            <div className="flex justify-start items-center gap-2">
              <GiUpgrade className="text-xl" />{" "}
              <p className="uppercase">unranked</p>
            </div>
            <div className="flex items-center gap-2">
              <AiFillTrophy className="text-xl" /> <p>1000 pts</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
