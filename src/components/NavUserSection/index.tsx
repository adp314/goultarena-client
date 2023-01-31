import { NavUserToLog } from "../NavUserToLog";
import { NavUserLogged } from "../NavUserLogged";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import api from "../../lib/api";

export function NavUserSection() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  const [errorAuth, setErrorAuth] = useState(false);

  // set the subIdAuth on localstorage and set the auth0 infos on a state (UserDataFromAuth0ToPut)

  // useEffect(() => {
  //   if (user && isAuthenticated) {
  //     setUserDataFromAuth0ToPut({
  //       email: user.email as string,
  //       sub: user.sub as string,
  //       countryLocation: user.country_location as string,
  //       auth0lastConnexion: user.updated_at as string,
  //     });

  //     setIsUpdated(true);
  //   } else if (!user) {
  //     setIsUpdated(false);
  //   }
  // }, [user]);

  // // Signup with auth0 infos if new user or update infos from auth0

  // useEffect(() => {
  //   setErrorAuth(false);
  //   if (isUpdated === true) {
  //     async function SignupOrUpdate() {
  //       try {
  //         const token = await getAccessTokenSilently();
  //         const response = await api
  //           .authorized(token)
  //           .put("/user/updateorsignup", UserDataFromAuth0ToPut);
  //       } catch (err) {
  //         console.log(err);
  //         setErrorAuth(true);
  //         window.alert("Error on Authentication.");
  //       }
  //     }
  //     SignupOrUpdate();
  //   }
  // }, [isUpdated === true]);
  useEffect(() => {
    if (user && isAuthenticated === true && isLoading === false) {
      const { email, sub, country_location, updated_at } = user;
      async function SignupOrUpdate() {
        try {
          const token = await getAccessTokenSilently();
          const response = await api
            .authorized(token)
            .put("/user/updateorsignup", {
              email,
              sub,
              country_location,
              updated_at,
            });
        } catch (err) {
          console.log(err);
          setErrorAuth(true);
          window.alert("Error on Authentication.");
        }
      }
      SignupOrUpdate();
    }
  }, [user]);

  return (
    <div className=" w-full h-[19%] flex flex-col">
      {user !== undefined ? <NavUserLogged /> : <NavUserToLog />}
    </div>
  );
}
