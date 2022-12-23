import { useTranslation } from "react-i18next";
import "../../i18n";
import { ImHome } from "react-icons/im";
import { FiCornerDownRight } from "react-icons/fi";
import { RiTableAltFill } from "react-icons/ri";
import { FaAddressBook } from "react-icons/fa";
import { MdHelp } from "react-icons/Md";
import { GiPodium } from "react-icons/Gi";
import goultarenalogo from "../../../public/images/goultarenalogo.png";
import flagFrance from "../../../public/images/flg_France.png";
import flagUK from "../../../public/images/flg_UK.png";

export function Layout() {
  const { t, i18n } = useTranslation();

  function handleClickFR() {
    i18n.changeLanguage("fr");
  }

  function handleClickEN() {
    i18n.changeLanguage("en");
  }

  return (
    <>
      <div className="bg-neutral-900 fixed left-0 w-56 h-screen box-border flex flex-col items-center">
        <img
          className="px-11 my-8 w-auto ml-2"
          src={goultarenalogo}
          alt="goultarena_logo"
        />
        <div className="box-border h-1 w-full rounded-sm bg-white"></div>

        <div className="flex box-border mt-5 gap-3">
          <img
            className="w-8 h-auto rounded-sm"
            src={flagFrance}
            alt="flag_France"
            onClick={handleClickFR}
          />
          <img
            className="w-8 h-auto rounded-sm"
            src={flagUK}
            alt="flag_UK"
            onClick={handleClickEN}
          />
        </div>
        <nav className="flex flex-col box-border w-full mt-10 gap-5 px-8">
          <div className="flex font-KoHo text-white uppercase text-2xl items-center  gap-2">
            <ImHome className="text-2xl" /> {t("nav_home")}
          </div>
          <div className="flex flex-col">
            <div className="flex font-KoHo text-white uppercase text-2xl items-center  gap-2">
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
            <div className="flex font-KoHo text-white uppercase text-2xl items-center  gap-2">
              <FaAddressBook /> {t("nav_directorybook")}
            </div>
            <div className="text-sm flex text-white items-center  uppercase font-KoHo gap-1 mt-1">
              <FiCornerDownRight /> {t("nav_directoryplayers")}
            </div>
            <div className="text-sm flex text-white items-center  uppercase font-KoHo gap-1">
              <FiCornerDownRight /> {t("nav_directoryteams")}
            </div>
          </div>
          <div className="flex font-KoHo text-white uppercase text-2xl items-center  gap-2">
            <GiPodium className="text-2xl" /> {t("nav_ranking")}
          </div>
          <div className="flex font-KoHo text-white uppercase text-2xl items-center  gap-2">
            <MdHelp className="text-2xl" /> {t("nav_help")}
          </div>
        </nav>
        <div className="flex font-KoHo text-white h-10 w-full bg-yellow-900 "></div>
      </div>
      <header></header>
    </>
  );
}
