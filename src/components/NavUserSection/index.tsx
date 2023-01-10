import { NavUserToLog } from "../NavUserToLog";
import { NavUserLogged } from "../NavUserLogged";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import api from "../../lib/api";

export function NavUserSection() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [UserDataFromAuth0ToPut, setUserDataFromAuth0ToPut] = useState({
    email: "",
    sub: "",
    countryLocation: "",
    auth0lastConnexion: "",
  });

  // set the subIdAuth on localstorage and set the auth0 infos on a state (UserDataFromAuth0ToPut)

  useEffect(() => {
    if (user && isAuthenticated === true && isLoading == false) {
      localStorage.setItem("subIdAuth", user?.sub as string);

      setUserDataFromAuth0ToPut({
        email: user.email as string,
        sub: user.sub as string,
        countryLocation: user.country_location as string,
        auth0lastConnexion: user.updated_at as string,
      });
    }
    if (user && isAuthenticated === true) {
      setIsUpdated(true);
    } else if (!user && isAuthenticated === false) {
      setIsUpdated(false);
    }
  }, [user]);

  // Signup with auth0 infos if new user or update infos from auth0

  useEffect(() => {
    async function SignupOrUpdate() {
      if (isUpdated === true) {
        try {
          const token = await getAccessTokenSilently();

          const response = await api
            .authorized(token)
            .put("/user/updateorsignup", UserDataFromAuth0ToPut);
        } catch (err) {
          console.log(err);
        }
      }
    }
    SignupOrUpdate();
  }, [user && isUpdated === true]);

  return (
    <div className=" w-full h-[19%] flex flex-col">
      {isAuthenticated ? <NavUserLogged /> : <NavUserToLog />}
    </div>
  );
}
