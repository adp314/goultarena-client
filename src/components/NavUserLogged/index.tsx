import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

export function NavUserLogged() {
  const { isAuthenticated, logout } = useAuth0();
  return (
    <div>
      <Link to="/usertest">user edit test</Link>
      {isAuthenticated ? <p>logged</p> : <p>not logged</p>}
      <button
        className="text-white bg-neutral-500"
        onClick={() =>
          logout({
            returnTo: window.location.origin,
          })
        }
      >
        Log Out
      </button>
    </div>
  );
}
