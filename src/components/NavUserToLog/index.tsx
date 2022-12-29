import { useAuth0 } from "@auth0/auth0-react";

export function NavUserToLog() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <button
        className="text-white bg-black"
        onClick={() => loginWithRedirect()}
      >
        Log In
      </button>
    </div>
  );
}
