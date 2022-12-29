import { NavUserToLog } from "../NavUserToLog";
import { NavUserLogged } from "../NavUserLogged";
import { useAuth0 } from "@auth0/auth0-react";

export function NavUserSection() {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <NavUserLogged /> : <NavUserToLog />;
}
