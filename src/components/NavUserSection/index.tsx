import { NavUserToLog } from "../NavUserToLog";
import { NavUserLogged } from "../NavUserLogged";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

export function NavUserSection() {
  const { user = {}, isLoading, isAuthenticated } = useAuth0();
  const [loggedSubId, setLoggedSubId] = useState<string | null | undefined>("");

  useEffect(() => {
    if (isLoading === false && isAuthenticated === true) {
      setLoggedSubId(user.sub);

      if (loggedSubId) {
        sessionStorage.setItem("subIdAuth", loggedSubId);
      }
    }
  }, [isAuthenticated]);

  return isAuthenticated ? <NavUserLogged /> : <NavUserToLog />;
}
