import './App.css'
import { Test } from "./pages/Test/index"
import './i18n'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'



function App() {

  const languages = [
    {

      code: 'fr',
      name: 'Français',
      country_code: 'fr',
    },
    {
      code: 'en',
      name: 'English',
      country_code: 'gb',
    },
  ]

  const currentLanguageCode = localStorage.getItem('i18nextLng') || 'fr'
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
  const { t } = useTranslation()


  useEffect(() => {
    console.log('Setting page stuff')
    document.title = t('app_title')
  }, [currentLanguage, t])


  return (
    <>
    <Test/>
    </>
  );
}

export default App
