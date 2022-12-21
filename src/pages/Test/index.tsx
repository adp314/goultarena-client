//import { useEffect } from 'react'
import style from "./style.module.css";
import { useTranslation } from "react-i18next";
import "../../i18n";

export function Test() {
  const { t, i18n } = useTranslation();

  function handleClickFR(event: React.MouseEvent<HTMLElement>) {
    i18n.changeLanguage("fr");
  }

  function handleClickEN(event: React.MouseEvent<HTMLElement>) {
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
      <p>{t("welcome")}</p>
    </div>
  );
}
