import { GlobalLayout } from "../../components/LayoutGlobal/index";
import { useAuth0 } from "@auth0/auth0-react";
import { FooterLayout } from "../../components/FooterLayout";

export function UserTest() {
  const { user = {} } = useAuth0();

  return (
    <GlobalLayout
      pageContainer={
        <div>
          <div className="bg-neutral-900 w-full h-screen text-white font-KoHo flex flex-col justify-center items-center gap-6">
            <h1>UserTest pageContainer</h1>
            <div className="">
              <img
                src={user?.picture}
                alt="Profile"
                className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
              />
            </div>
            <div className="col-md text-center text-md-left">
              <h2>{user?.name}</h2>
              <p className="lead text-muted">{user?.email}</p>
            </div>

            <div className="col-md text-center text-md-left"></div>
            <div>
              <pre className="text-white">{JSON.stringify(user, null, 2)}</pre>
            </div>
          </div>
          <FooterLayout />
        </div>
      }
    />
  );
}
