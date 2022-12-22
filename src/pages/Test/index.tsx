//import { useEffect } from 'react'
import style from "./style.module.css";
import { useTranslation } from "react-i18next";
import "../../i18n";

export function Test() {
  const { t, i18n } = useTranslation();

  function handleClickFR() {
    i18n.changeLanguage("fr");
  }

  function handleClickEN() {
    i18n.changeLanguage("en");
  }

  return (
    <div className={style.testTranslateContainer}>
      <div className={style.testTranslateFR} onClick={handleClickFR}>
        FR
      </div>
      <div className={style.testTranslateEN} onClick={handleClickEN}>
        EN
      </div>
      <h1 className="text-3xl font-bold underline">
      {t("welcome")}
    </h1>
      <p>{t("app_title")}</p>
    </div>
  );
}
