import { useTranslation } from "react-i18next";
import "../../i18n";
import { ImHome } from "react-icons/im";
import { FiCornerDownRight } from "react-icons/fi";
import { RiTableAltFill, RiMedalFill } from "react-icons/ri";

import { FaAddressBook } from "react-icons/fa";
import { MdHelp } from "react-icons/Md";
import { GiPodium, GiArena } from "react-icons/Gi";
import goultarenalogo from "../../../public/images/goultarenalogo.png";
import flagFR from "../../../public/images/flg_FR.png";
import flagUK from "../../../public/images/flg_UK.png";
import flagES from "../../../public/images/flg_ES.png";
// import headerBanner from "../../../public/images/banner.jpg";

export function Layout() {
  const { t, i18n } = useTranslation();

  function handleClickFR() {
    i18n.changeLanguage("fr");
  }

  function handleClickEN() {
    i18n.changeLanguage("en");
  }

  return (
    <div className="flex">
      <aside className="bg-neutral-900 sticky left-0 w-56 h-screen box-border flex flex-col items-center justify-start border-solid">
        <div className="w-full border-2">
          <img className=" w-1/2" src={goultarenalogo} alt="goultarena_logo" />
        </div>
        <div className="box-border h-1 w-full bg-white my-6"></div>

        <div className="flex justify-between box-border mt-5 gap-6">
          <img
            className="w-10 h-auto rounded-md"
            src={flagFR}
            alt="flag_France"
            onClick={handleClickFR}
          />
          <img
            className="w-10 h-auto rounded-md"
            src={flagUK}
            alt="flag_UK"
            onClick={handleClickEN}
          />
          <img
            className="w-10 h-auto rounded-md"
            src={flagES}
            alt="flag_ES"
            onClick={handleClickEN}
          />
        </div>
        {/* //////// */}
        <div className="flex flex-col h-full w-full justify-between">
          <nav className="flex flex-col box-border w-full mt-10 gap-5 px-8">
            <div className="flex font-KoHo text-white uppercase text-xl items-center  gap-2">
              <ImHome className="text-2xl" /> {t("nav_home")}
            </div>
            <div className="flex flex-col w-full">
              <div className="flex font-KoHo text-white uppercase text-xl items-center  gap-2">
                <RiTableAltFill className="text-2xl" /> {t("nav_ladders")}
              </div>
              <div className="text-sm flex text-white items-center  uppercase font-KoHo gap-1 mt-1">
                <FiCornerDownRight /> {t("nav_ladders3vs3")}
              </div>
              <div className="text-sm flex text-white items-center  uppercase font-KoHo gap-1">
                <FiCornerDownRight /> {t("nav_ladders2vs2")}
              </div>
              <div className="text-sm flex text-white items-center  uppercase font-KoHo gap-1">
                <FiCornerDownRight /> {t("nav_ladders1vs1")}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex font-KoHo text-white uppercase text-xl items-center  gap-2">
                <FaAddressBook /> {t("nav_directorybook")}
              </div>
              <div className="text-sm flex text-white items-center  uppercase font-KoHo gap-1 mt-1">
                <FiCornerDownRight /> {t("nav_directoryplayers")}
              </div>
              <div className="text-sm flex text-white items-center  uppercase font-KoHo gap-1">
                <FiCornerDownRight /> {t("nav_directoryteams")}
              </div>
            </div>
            <div className="flex font-KoHo text-white uppercase text-xl items-center  gap-2">
              <GiArena className="text-2xl" /> {t("nav_arena")}
            </div>
            <div className="flex font-KoHo text-white uppercase text-xl items-center  gap-2">
              <GiPodium className="text-2xl" /> {t("nav_ranking")}
            </div>
            <div className="flex font-KoHo text-white uppercase text-xl items-center  gap-2">
              <MdHelp className="text-2xl" /> {t("nav_help")}
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
                <div className="flex text-white font-KoHo">
                  <RiMedalFill className="text-white text-xl" /> GOLD III
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <div className="flex flex-col w-full h-screen">
        <div className="bg-no-repeat bg-cover bg-[url('../../../public/images/banner.jpg')] bg-black h-1/6 " />

        <div className="bg-neutral-700 w-full h-screen"></div>
        <footer className="bg-black w-full h-1/6"></footer>
      </div>
    </div>
  );
}
