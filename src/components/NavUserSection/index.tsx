import { NavUserToLog } from "../NavUserToLog";
import { NavUserLogged } from "../NavUserLogged";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import axios from "axios";

export function NavUserSection() {
  const { user = {}, isLoading, isAuthenticated } = useAuth0();
  const [loggedSubId, setLoggedSubId] = useState<string | null | undefined>("");
  const [UserDataFromAuth0ToPut, setUserDataFromAuth0ToPut] = useState({
    mail: "",
    sub: "",
    coutryLocation: "",
    Auth0lastConnexion: "",
  });

  useEffect(() => {
    if (isLoading === false && isAuthenticated === true) {
      setLoggedSubId(user.sub);
      setUserDataFromAuth0ToPut({
        mail: user.email || "",
        sub: user.sub || "",
        coutryLocation: user.country_location || "",
        Auth0lastConnexion: user.updated_at || "",
      });
      console.log(UserDataFromAuth0ToPut);
      async function Signup() {
        try {
          await axios.post(
            "http://localhost:4000/signup",
            UserDataFromAuth0ToPut
          );
        } catch (error) {
          console.log(error);
        }
      }

      Signup();

      if (loggedSubId) {
        localStorage.setItem("subIdAuth", loggedSubId);
      }
    }
  }, [isAuthenticated]);

  return isAuthenticated ? <NavUserLogged /> : <NavUserToLog />;
}
