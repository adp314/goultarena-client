import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "fr"],
    fallbackLng: "fr",
    debug: false,

    detection: {
      order: ["localStorage", "path", "htmlTag"],
      caches: ["localStorage"],
    },
    backend: {
      loadPath: `/src/locales/{{lng}}/{{ns}}.json`,
    },
  });
