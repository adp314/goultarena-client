import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export function UserSignIn() {
  const {
    loginWithPopup,
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  function callApi() {
    axios
      .get("http://localhost:4000/")
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error.message));
  }

  async function callProtectedApi() {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get("http://localhost:4000/protected", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error: any) {
      console.log(error.message);
    }
  }

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
          <button
            className="border-2 bg-black text-white"
            onClick={() => logout()}
          >
            Logout
          </button>
        </li>
      </ul>
      <h3 className="text-2xl font-bold">
        User is {isAuthenticated ? "Logged in" : "not logged in !"}
      </h3>
      <ul>
        <li>
          <button className="border-2 bg-black text-white" onClick={callApi}>
            Call API route
          </button>
        </li>
        <li>
          <button
            className="border-2 bg-black text-white"
            onClick={callProtectedApi}
          >
            Call Protected API route
          </button>
        </li>
      </ul>
      <pre className="text-black">{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
