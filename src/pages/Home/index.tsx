import { GlobalLayout } from "../../components/LayoutGlobal/index";
import { FooterLayout } from "../../components/FooterLayout";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export function Home() {
  const { user, isLoading, isAuthenticated } = useAuth0();
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [UserDataFromAuth0ToPut, setUserDataFromAuth0ToPut] = useState({
    email: "",
    sub: "",
    countryLocation: "",
    auth0lastConnexion: "",
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("subIdAuth", user?.sub as string);
    }
  }, [user]);

  useEffect(() => {
    if (user && isAuthenticated === true) {
      setUserDataFromAuth0ToPut({
        email: user.email as string,
        sub: user.sub as string,
        countryLocation: user.country_location as string,
        auth0lastConnexion: user.updated_at as string,
      });
    }
    if (user && isAuthenticated === true) {
      setIsUpdated(true);
    } else if (user && isAuthenticated === false) {
      setIsUpdated(false);
    }
  }, [user]);

  console.log(UserDataFromAuth0ToPut);
  console.log(isUpdated);

  useEffect(() => {
    async function SignupOrUpdate() {
      try {
        if (isUpdated) {
          await axios.post(
            "http://localhost:4000/signup",
            UserDataFromAuth0ToPut
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
    SignupOrUpdate();
  }, [user, isUpdated === true]);

  return (
    <GlobalLayout
      pageContainer={
        <div className=" w-full h-full">
          <div className="bg-no-repeat bg-top bg-[url('../../../public/images/banner.jpg')] w-full h-36 ma bg-cover drop-shadow-md sticky top-0" />

          <div className="bg-[#1C1917] text-white font-KoHo flex flex-col justify-between h-full">
            <p className=" text-4xl px-24 py-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              iaculis imperdiet lectus, nec sagittis metus aliquet in. Donec
              tincidunt in turpis eget pulvinar. Nullam tellus arcu, imperdiet
              tempor mollis sed, venenatis ut quam. Praesent quis lacus sapien.
              Nullam euismod eleifend sem sed hendrerit. Fusce luctus suscipit
              quam et pellentesque. Donec consequat mattis pretium. Nunc eu
              pharetra sem. Ut pharetra elit eget nunc bibendum feugiat. Proin
              quis porttitor purus. Fusce tristique, lorem id finibus venenatis,
              tortor mauris suscipit nisi, eu mollis arcu nulla a enim. Aliquam
              erat volutpat. Integer vulputate interdum orci, nec rutrum neque.
              Lorem ipsm dolor sit amet, consectetur adipiscing elit. Vivamus
              iaculis imperdiet lectus, nec sagittis metus aliquet in. Donec
              tincidunt tortor mauri tortor mauris suscipit nisi, eu mollis arcu
              nulla a enim. Aliquam Lorem ipsum dolor sit amet, consectetur
            </p>
            <FooterLayout />
          </div>
        </div>
      }
    />
  );
}
