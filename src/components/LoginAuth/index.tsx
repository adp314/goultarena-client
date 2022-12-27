import { useAuth0 } from "@auth0/auth0-react";

export function LoginAuth() {
  const { loginWithPopup, loginWithRedirect, logout, user, isAuthenticated } =
    useAuth0();

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h1>Auth0 authentication</h1>
      <ul className="flex flex-col gap-2">
        <li>
          <button
            className="border-2 bg-black text-white"
            onClick={loginWithPopup}
          >
            Login with Popup
          </button>
        </li>
        <li>
          <button
            className="border-2 bg-black text-white"
            onClick={loginWithRedirect}
          >
            Login with Redirect
          </button>
        </li>
        <li>
          <button className="border-2 bg-black text-white" onClick={logout}>
            Logout
          </button>
        </li>
      </ul>
      <h3 className="text-2xl font-bold">
        User is {isAuthenticated ? "Logged in" : "not logged in !"}
      </h3>
      <pre className="text-black">{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
