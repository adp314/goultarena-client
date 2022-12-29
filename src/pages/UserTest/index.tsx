import { GlobalLayout } from "../../components/LayoutGlobal/index";
import { useAuth0 } from "@auth0/auth0-react";
import { FooterLayout } from "../../components/FooterLayout";

export function UserTest() {
  const { user } = useAuth0();

  return (
    <>
      <GlobalLayout
        pageContainer={
          <>
            <div className="bg-neutral-900 w-full h-screen text-white font-KoHo flex flex-col justify-center items-center gap-6">
              <h1>UserTest pageContainer</h1>
              <div></div>
              <div className="col-md text-center text-md-left"></div>
              <div>
                <pre className="text-white">
                  {JSON.stringify(user, null, 2)}
                </pre>
              </div>
            </div>
            <FooterLayout />
          </>
        }
      />
    </>
  );
}
