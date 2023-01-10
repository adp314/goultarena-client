import { useAuth0 } from "@auth0/auth0-react";
import { FaPowerOff } from "react-icons/fa";

export function NavUserToLog() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className=" w-full h-full flex items-center justify-center">
      <div className="flex flex-col justify-center items-center gap-0.5 cursor-pointer border-2 border-gray-700 bborder-opacity-10 rounded-full bg-gray-600 bg-opacity-30 p-2">
        <FaPowerOff
          className="text-white text-4xl"
          onClick={() => loginWithRedirect()}
        />
      </div>
    </div>
  );
}
