import { useTranslation } from "react-i18next";
import "../../i18n";
import { ImHome } from "react-icons/im";
import { FiCornerDownRight } from "react-icons/fi";
import { RiTableAltFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { FaAddressBook } from "react-icons/fa";
import { MdHelp } from "react-icons/Md";
import { GiPodium, GiArena } from "react-icons/Gi";
import goultarenalogo from "../../images/goultarenalogo.png";
import flagFR from "../../images/flg_FR.png";
import flagUK from "../../images/flg_UK.png";
import flagES from "../../images/flg_ES.png";
import { NavUserSection } from "../NavUserSection";

export function NavLayout() {
  const { t, i18n } = useTranslation();

  const location = useLocation();

  const isHome = location.pathname === "/home";
  const isDirectory = location.pathname === "/directory";
  const isLadders = location.pathname === "/ladders";
  const isArena = location.pathname === "/arena";
  const isRanking = location.pathname === "/ranking";
  const isHelp = location.pathname === "/help";

  function handleClickFR() {
    i18n.changeLanguage("fr");
  }

  function handleClickEN() {
    i18n.changeLanguage("en");
  }

  return (
    <aside className=" bg-[#181818] w-[12%] h-full sticky left-0 box-border flex flex-col items-center justify-start drop-shadow-md">
      <div className="w-full h-[20%] box-border flex items-center justify-center pl-3.5">
        <img
          className="w-28 box-border"
          src={goultarenalogo}
          alt="goultarena_logo"
        />
      </div>

      <div className="w-full h-0.5 bg-white opacity-10"></div>
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
        <nav className="flex flex-col box-border w-full gap-8 pl-5 cursor-pointer pt-12">
          <div
            className={
              isHome
                ? "flex font-KoHo text-yellow-600 uppercase text-xl items-center gap-2"
                : "flex font-KoHo text-white uppercase text-xl items-center gap-2"
            }
          >
            <ImHome className="text-2xl" />
            <Link to="/home">
              <p>{t("nav_home")}</p>
            </Link>
          </div>

          <div
            className={
              isLadders
                ? "flex font-KoHo text-yellow-600 uppercase text-xl items-center gap-2"
                : "flex font-KoHo text-white uppercase text-xl items-center gap-2"
            }
          >
            <RiTableAltFill className="text-2xl" />
            <Link to="/ladders">
              <p>{t("nav_ladders")}</p>
            </Link>
          </div>

          <div
            className={
              isDirectory
                ? "flex font-KoHo text-yellow-600 uppercase text-xl items-center gap-2"
                : "flex font-KoHo text-white uppercase text-xl items-center gap-2"
            }
          >
            <FaAddressBook className="text-2xl" />
            <Link to="/directory">
              <p>{t("nav_directorybook")}</p>
            </Link>
          </div>

          <div className="flex font-KoHo text-white text-opacity-20 uppercase text-xl items-center gap-2 cursor-default">
            <GiArena className="text-2xl" /> <p>{t("nav_arena")}</p>
          </div>

          <div
            className={
              isRanking
                ? "flex font-KoHo text-yellow-600 uppercase text-xl items-center gap-2"
                : "flex font-KoHo text-white uppercase text-xl items-center gap-2"
            }
          >
            <GiPodium className="text-2xl" />
            <Link to="/ranking">
              <p>{t("nav_ranking")}</p>
            </Link>
          </div>

          <div
            className={
              isHelp
                ? "flex font-KoHo text-yellow-600 uppercase text-xl items-center gap-2"
                : "flex font-KoHo text-white uppercase text-xl items-center gap-2"
            }
          >
            <MdHelp className="text-2xl" />{" "}
            <Link to="/help">
              <p>{t("nav_help")}</p>
            </Link>
          </div>
        </nav>
        <NavUserSection />
      </div>
    </aside>
  );
}
