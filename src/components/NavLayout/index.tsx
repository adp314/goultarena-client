import { useTranslation } from "react-i18next";
import "../../i18n";
import { ImHome } from "react-icons/im";
import { FiCornerDownRight } from "react-icons/fi";
import { RiTableAltFill, RiMedalFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { FaAddressBook } from "react-icons/fa";
import { MdHelp } from "react-icons/Md";
import { GiPodium, GiArena } from "react-icons/Gi";
import goultarenalogo from "../../../public/images/goultarenalogo.png";
import flagFR from "../../../public/images/flg_FR.png";
import flagUK from "../../../public/images/flg_UK.png";
import flagES from "../../../public/images/flg_ES.png";

export function NavLayout() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  function handleClickFR() {
    i18n.changeLanguage("fr");
  }

  function handleClickEN() {
    i18n.changeLanguage("en");
  }

  return (
    <aside className=" bg-gradient-to-b from-neutral-900 to-stone-900 w-56 h-screen box-border flex flex-col items-center justify-start border-solid sticky top-0 left-0 md:bg-red-400">
      <div className="w-full h-44 flex items-center justify-center ml-3">
        <img className="w-32" src={goultarenalogo} alt="goultarena_logo" />
      </div>

      <div className="flex justify-between box-border mt-6 gap-5 cursor-pointer">
        <img
          className="w-8 h-auto rounded-md"
          src={flagFR}
          alt="flag_France"
          onClick={handleClickFR}
        />
        <img
          className="w-8 h-auto rounded-md"
          src={flagUK}
          alt="flag_UK"
          onClick={handleClickEN}
        />
        <img
          className="w-8 h-auto rounded-md"
          src={flagES}
          alt="flag_ES"
          onClick={handleClickEN}
        />
      </div>

      <div className="flex flex-col h-full w-full justify-between ">
        <nav className="flex flex-col box-border w-full mt-10 gap-5 px-6 cursor-pointer">
          <div className="flex font-KoHo text-white uppercase text-lg items-center gap-2">
            <ImHome className="text-2xl" /> <p>{t("nav_home")}</p>
          </div>

          <div className="flex flex-col w-full">
            <div className="flex font-KoHo text-white uppercase text-lg items-center gap-2">
              <RiTableAltFill className="text-2xl" />
              <p>{t("nav_ladders")}</p>
            </div>
            <div className="text-sm flex text-white items-center  uppercase font-KoHo gap-1 mt-1">
              <FiCornerDownRight />
              <p>{t("nav_ladders3vs3")}</p>
            </div>
            <div className="text-sm flex text-white items-center  uppercase font-KoHo gap-1">
              <FiCornerDownRight />
              <p>{t("nav_ladders2vs2")}</p>
            </div>
            <div className="text-sm flex text-white items-center  uppercase font-KoHo gap-1">
              <FiCornerDownRight />
              <p>{t("nav_ladders1vs1")}</p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex font-KoHo text-white uppercase text-lg items-center gap-2">
              <FaAddressBook className="text-2xl" />{" "}
              <p>{t("nav_directorybook")}</p>
            </div>
            <div className="text-sm flex text-white items-center uppercase font-KoHo gap-1 mt-1">
              <FiCornerDownRight /> <p>{t("nav_directoryplayers")}</p>
            </div>
            <div className="text-sm flex text-white items-center uppercase font-KoHo gap-1">
              <FiCornerDownRight /> <p>{t("nav_directoryteams")}</p>
            </div>
          </div>

          <div className="flex font-KoHo text-white uppercase text-lg items-center gap-2">
            <GiArena className="text-2xl" /> <p>{t("nav_arena")}</p>
          </div>

          <div className="flex font-KoHo text-white uppercase text-lg items-center gap-2">
            <GiPodium className="text-2xl" /> <p>{t("nav_ranking")}</p>
          </div>

          <div className="flex font-KoHo text-white uppercase text-lg items-center gap-2">
            <MdHelp className="text-2xl" /> <p>{t("nav_help")}</p>
          </div>
        </nav>

        <div className=" w-full h-28 flex flex-col">
          <div className="bg-yellow-900 w-full h-10 flex font-KoHo items-center text-white text-base">
            <p className="ml-2">[OMG] Hulkyalmao15cha</p>
          </div>
          <div className="bg-yellow-800 w-full h-full flex items-center">
            <div className="flex">
              <div
                className=" bg-no-repeat bg-cover bg-[url('https://res.cloudinary.com/adpinto314/image/upload/v1671040468/thready_profile_pictures/file_thufzh.png')] 
              bg-white h-14 w-14 mx-3 border-4 rounded-b-sm rounded-tr-sm rounded-tl-xl border-yellow-300 drop-shadow-md"
              />
              <div className="flex flex-col justify-start text-white font-KoHo">
                <div>
                  <RiMedalFill className="text-white text-xl" /> <p>GOLD III</p>
                </div>
                <Link to="/signin" className="text-white">
                  Sign in here !
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
