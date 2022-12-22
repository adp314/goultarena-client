//import { FaBeer } from "react-icons/fa";
import goultarenalogo from "../../../public/images/goultarenalogo.png";

export function Layout() {
  return (
    <div className="bg-neutral-900 fixed left-0 w-1/6 h-screen box-border flex flex-col items-center px-2">
      <div className="w-10 my-2">
        <img src={goultarenalogo} alt="goultarena_logo" />
      </div>
      <hr className="box-border w-full" />
      <div></div>
    </div>
  );
}
