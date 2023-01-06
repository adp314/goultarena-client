import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

export function NavUserLogged() {
  const { isAuthenticated, logout } = useAuth0();

  return (
    <div className="flex flex-col">
      <Link to="/user/edit">user edit page</Link>
      <button
        className="text-white bg-neutral-500"
        onClick={() => {
          localStorage.clear();
          logout({
            returnTo: window.location.origin,
          });
        }}
      >
        Log Out
      </button>
    </div>
  );
}
