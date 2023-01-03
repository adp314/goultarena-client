import { NavUserToLog } from "../NavUserToLog";
import { NavUserLogged } from "../NavUserLogged";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import axios from "axios";

export function NavUserSection() {
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } =
    useAuth0();
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [UserDataFromAuth0ToPut, setUserDataFromAuth0ToPut] = useState({
    email: "",
    sub: "",
    countryLocation: "",
    auth0lastConnexion: "",
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("subIdAuth", user?.sub as string);
    }
  }, [user]);

  useEffect(() => {
    if (user && isAuthenticated === true) {
      setUserDataFromAuth0ToPut({
        email: user.email as string,
        sub: user.sub as string,
        countryLocation: user.country_location as string,
        auth0lastConnexion: user.updated_at as string,
      });
    }
    if (user && isAuthenticated === true) {
      setIsUpdated(true);
    } else if (user && isAuthenticated === false) {
      setIsUpdated(false);
    }
  }, [user]);

  console.log(UserDataFromAuth0ToPut);
  console.log(isUpdated);

  useEffect(() => {
    async function SignupOrUpdate() {
      const token = await getAccessTokenSilently();
      try {
        if (isUpdated) {
          await axios.put(
            "http://localhost:4000/updateorcreate",
            UserDataFromAuth0ToPut,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
    SignupOrUpdate();
  }, [user, isUpdated === true]);

  return isAuthenticated ? <NavUserLogged /> : <NavUserToLog />;
}
