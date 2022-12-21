
//import { useEffect } from 'react'
import style from './style.module.css'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import "../../i18n"


export function Test(){

   

     function  handleClickFR(event: React.MouseEvent<HTMLElement>){
       event.preventDefault();
       localStorage.setItem('i18nextLng', 'fr' )
     }

  //   function  handleClickEN(event: React.MouseEvent<HTMLElement>){
  //     event.preventDefault();
     

  //   }
    
    const { t } = useTranslation()


    return (
        <div className={style.testTranslateContainer}>
            <div className={style.testTranslateFR} onClick={handleClickFR}>FR</div>
            <div className={style.testTranslateEN} >EN</div>
            <p>{t('welcome')}</p>
        </div>
    )
}