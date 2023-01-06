import { useTranslation } from "react-i18next";
import "../../i18n";
import { ImHome } from "react-icons/im";
import { FiCornerDownRight } from "react-icons/fi";
import { RiTableAltFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FaAddressBook } from "react-icons/fa";
import { MdHelp } from "react-icons/Md";
import { GiPodium, GiArena } from "react-icons/Gi";
import goultarenalogo from "../../../public/images/goultarenalogo.png";
import flagFR from "../../../public/images/flg_FR.png";
import flagUK from "../../../public/images/flg_UK.png";
import flagES from "../../../public/images/flg_ES.png";
import { NavUserSection } from "../NavUserSection";

export function NavLayout() {
  const { t, i18n } = useTranslation();

  function handleClickFR() {
    i18n.changeLanguage("fr");
  }

  function handleClickEN() {
    i18n.changeLanguage("en");
  }

  return (
    <aside className=" bg-[#181818] w-64 h-screen box-border flex flex-col items-center justify-start">
      <div className="w-full h-44 flex items-center justify-center ml-6 mt-2">
        <img className="w-28" src={goultarenalogo} alt="goultarena_logo" />
      </div>

      <div className="w-full h-0.5 bg-white mt-2 opacity-10"></div>
      <div className="flex justify-between box-border my-5 gap-5 cursor-pointer">
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
      <div className="w-full h-0.5 bg-white opacity-10"></div>

      <div className="flex flex-col h-full w-full justify-between ">
        <nav className="flex flex-col box-border w-full mt-14 gap-5 px-6 cursor-pointer">
          <div className="flex font-KoHo text-white uppercase text-lg items-center gap-2">
            <ImHome className="text-2xl" />
            <Link to="/home">
              <p>{t("nav_home")}</p>
            </Link>
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
        <NavUserSection />
      </div>
    </aside>
  );
}
