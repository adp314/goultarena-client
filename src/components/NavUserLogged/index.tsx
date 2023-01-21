import { useAuth0 } from "@auth0/auth0-react";
import { useGetUserDataWithTokenCheck } from "../../lib/usersWithCheck";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { AiOutlineMenu, AiFillTrophy } from "react-icons/Ai";
import { GiUpgrade } from "react-icons/Gi";
import { RxCross2 } from "react-icons/Rx";
import {
  RiSettingsFill,
  RiTeamFill,
  RiUserFill,
  RiLogoutCircleRFill,
} from "react-icons/ri";

export function NavUserLogged() {
  const { logout } = useAuth0();
  let { userId } = useParams();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const isUserView = location.pathname === `/user/view/${userId}`;
  const { data: userDataChecked } = useGetUserDataWithTokenCheck();

  return (
    <>
      <div className="w-full h-0.5 bg-white opacity-60"></div>

      <div className="w-full flex font-KoHo justify-between items-center text-white text-base ">
        {isMenuVisible ? (
          <div className="h-full w-max flex justify-start items-center">
            <div className="flex justify-start items-center h-full gap-2.5 ml-3 mt-2.5 mb-2.5">
              <Link to="/user/edit">
                <RiUserFill className="text-lg hover:text-yellow-600" />
              </Link>
              <div className="w-0.5 rounded h-1/2 bg-white opacity-30"></div>
              {userDataChecked.team._teamId ? (
                <Link to="/team/dashboard">
                  <RiTeamFill className="text-lg hover:text-yellow-600" />
                </Link>
              ) : (
                <Link to="/team/create">
                  <RiTeamFill className="text-lg hover:text-yellow-600" />
                </Link>
              )}
              <div className="w-0.5 rounded h-1/2 bg-white opacity-30"></div>
              <Link to="/user/edit">
                <RiSettingsFill className="text-lg hover:text-yellow-600" />
              </Link>
              <div className="w-0.5 rounded h-1/2 bg-white opacity-30"></div>
              <RiLogoutCircleRFill
                className="text-xl cursor-pointer hover:text-yellow-600"
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
            <p
              className={
                isUserView
                  ? "ml-1.5 my-2 text-sm text-yellow-600 uppercase"
                  : "ml-1.5 my-2 text-sm uppercase"
              }
            >
              {userDataChecked?.userName}
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
      <div className="w-full h-0.5 bg-white opacity-60"></div>
      {/* /////// */}
      <div className="flex h-full w-full">
        <div className="flex justify-center items-center w-[40%]">
          {userDataChecked && userDataChecked._id && (
            <Link to={`/user/view/${userDataChecked._id}`}>
              <div
                className={`w-14 h-14 rounded border-2 border-gray-600 bg-no-repeat bg-cover shadow-[0_4px_4px_-0px_rgba(0,0,0,0.25)]`}
                style={{
                  backgroundImage: `url(https://goultarena-aws3.s3.eu-west-3.amazonaws.com/${userDataChecked?.keyProfileImg})`,
                }}
              />
            </Link>
          )}
        </div>
        <div className=" h-full w-[60%] text-white flex justify-start items-center">
          <div className="flex flex-wrap items-center justify-start gap-1.5">
            <div className="flex justify-start items-center gap-2">
              <GiUpgrade className="text-xl" /> <p>Unranked</p>
            </div>
            <div className="flex items-center gap-2">
              <AiFillTrophy className="text-xl" />{" "}
              <p>
                0 <span className="text-sm font-extralight">pts</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
