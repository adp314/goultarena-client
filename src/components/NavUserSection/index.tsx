import { NavUserToLog } from "../NavUserToLog";
import { NavUserLogged } from "../NavUserLogged";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import axios from "axios";

export function NavUserSection() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [UserDataFromAuth0ToPut, setUserDataFromAuth0ToPut] = useState({
    email: "",
    sub: "",
    countryLocation: "",
    auth0lastConnexion: "",
  });

  const [fetchedUserData, setFetchedUserData] = useState({
    userName: "",
    email: "",
  });

  // set the subIdAuth on localstorage and set the auth0 infos on a state (UserDataFromAuth0ToPut)

  useEffect(() => {
    if (user && isAuthenticated === true) {
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
    } else if (user && isAuthenticated === false) {
      setIsUpdated(false);
    }
  }, [user]);

  // Signup with auth0 infos if new user or update infos from auth0

  useEffect(() => {
    async function SignupOrUpdate() {
      const token = await getAccessTokenSilently();
      try {
        if (isUpdated) {
          const response = await axios.put(
            "http://localhost:4000/api/user/updateorsignup",
            UserDataFromAuth0ToPut,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setFetchedUserData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    SignupOrUpdate();
  }, [user, isUpdated === true]);

  console.log(fetchedUserData.userName);

  return (
    <div className=" w-full h-28 flex flex-col">
      <div className="bg-amber-900 w-full h-10 flex font-KoHo items-center text-white text-base">
        <p className="ml-2">[TAG] {fetchedUserData.userName}</p>
      </div>
      <div className="bg-amber-800 w-full h-full flex items-center justify-center">
        <div className="flex">
          {isAuthenticated ? <NavUserLogged /> : <NavUserToLog />}
        </div>
      </div>
    </div>
  );
}
