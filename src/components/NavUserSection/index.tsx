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
    if (user && isAuthenticated && !isLoading) {
      setUserDataFromAuth0ToPut({
        email: user.email as string,
        sub: user.sub as string,
        countryLocation: user.country_location as string,
        auth0lastConnexion: user.updated_at as string,
      });
      setIsUpdated(true);
    } else if (!user) {
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

          localStorage.setItem("gui", response.data._id);
          localStorage.setItem("gti", response.data.team._teamId);
        } catch (err) {
          console.log(err);
        }
      }
    }
    SignupOrUpdate();
  }, [user && isUpdated === true]);

  return (
    <div className=" w-full h-[19%] flex flex-col">
      {isAuthenticated && isUpdated === true ? (
        <NavUserLogged />
      ) : (
        <NavUserToLog />
      )}
    </div>
  );
}
