import { GlobalLayout } from "../../components/LayoutGlobal/index";
import { useAuth0 } from "@auth0/auth0-react";

export function UserTest() {
  const { user } = useAuth0();
  const { name, picture, email } = user;

  return (
    <GlobalLayout
      pageContainer={
        <div className="bg-neutral-800 w-full h-screen text-white font-KoHo flex flex-col justify-center items-center gap-6">
          <h1>UserTest pageContainer</h1>
          <div>
            <img src={picture} alt="Profile" className="" />
          </div>
          <div className="col-md text-center text-md-left">
            <h2>{name}</h2>
            <p className="lead text-muted">{email}</p>
          </div>
          <div>
            <pre className="text-white">{JSON.stringify(user, null, 2)}</pre>
          </div>
        </div>
      }
    />
  );
}
