import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'


i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'fr'],
    fallbackLng: 'fr',
    debug: false,
    // Options for language detector
    detection: {
      order: ['path', 'localStorage', 'htmlTag'],
      caches: ['localStorage'],
    },
    // react: { useSuspense: false },
    backend: {
      loadPath: '../public/locales/{{lng}}/translation.json',
    },
  })