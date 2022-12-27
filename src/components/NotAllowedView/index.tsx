import goultarenalogo from "../../../public/images/goultarenalogo.png";
import { useTranslation } from "react-i18next";
import { HiRefresh } from "react-icons/Hi";
import "../../i18n";

export function NotAllowedView() {
  const { t, i18n } = useTranslation();

  return (
    <div className="flex flex-col justify-start items-center w-screen h-screen bg-gradient-to-b from-neutral-900 to-stone-800 gap-6">
      <div className="w-full h-44 flex items-center justify-center ml-4 mt-24">
        <img className="w-32" src={goultarenalogo} alt="goultarena_logo" />
      </div>

      <div className="h-24 w-9/12 flex flex-col justify-center items-center gap-6 mt-12 text-white">
        <h1 className="text-white text-center uppercase font-KoHo text-lg font-bold self-center">
          {t("not_allowed_view_text")}
        </h1>
        <p className="text-white text-center uppercase font-KoHo text-sm self-center">
          {t("not_allowed_goultarenatxt")}
        </p>
        <a href="#" className="cursor-pointer">
          <HiRefresh className="text-white text-4xl mt-4" />{" "}
        </a>
      </div>
    </div>
  );
}
