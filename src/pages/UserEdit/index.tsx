import { GlobalLayout } from "../../components/LayoutGlobal/index";
import { useAuth0 } from "@auth0/auth0-react";
import { FooterLayout } from "../../components/FooterLayout";
import { useEffect, useState, useRef, FormEvent, ChangeEvent } from "react";
import axios from "axios";

export function UserEdit() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  const imageRef = useRef<HTMLInputElement | null>(null);

  // const [formUserEdit, setFormUserEdit] = useState({
  //   userName: "",
  // });

  const [fetchedUserData, setFetchedUserData] = useState({
    userName: "",
    email: "",
  });

  const [userForm, setUserForm] = useState({
    userName: "",
    ankamaCharacterUrl: "",
  });

  interface SkinImage {
    src: string; // url from ankama website (protected)
    image: string; // base64 image
  }

  const urlImg = `https://goultarena-s3bucket.s3.eu-west-3.amazonaws.com/KROmadSWwSsJkvD_A3RJ9`;

  // Get user data with a query param request via the email

  useEffect(() => {
    async function fetchUserData() {
      const token = await getAccessTokenSilently();
      if (user && isAuthenticated === true && isLoading === false) {
        try {
          if (user?.email) {
            const fetchUserResponse = await axios.get(
              `http://localhost:4000/api/user/fetch?email=${user?.email}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setFetchedUserData(fetchUserResponse.data);
            console.log(
              `fetchUserData Response : ${[
                fetchedUserData.email,
                fetchedUserData.userName,
              ]}`
            );

            console.log(`fetchUserData req : ${user?.email}`);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    fetchUserData();
  }, [user, isAuthenticated === true]);

  //// function handleChange & handle Submit for the form

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const target = imageRef?.current;
      if (target && target.files) {
        const file = target.files[0];
        if (file) {
          const response = await axios.get(
            "http://localhost:4000/api/uploadimg/postimg",
            {
              params: {
                key: "keyid",
              },
            }
          );

          const { post, key } = await response.data;

          const formData = new FormData();
          Object.entries({
            ...post.fields,
            file,
          }).forEach(([key, value]) => {
            formData.append(key, value as string | Blob);
          });

          await axios.post(post.url, formData);
          console.log(imageRef);
          console.log(file);
        }
      }
    } catch (err) {
      console.log(err);
    }
    try {
      const infosToSendForAPI = { ...fetchedUserData };

      const response = await axios.put(`http://localhost:4000/api/user/edit`, {
        ...infosToSendForAPI,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    try {
      const nibApiRes = await fetch(
        "https://dofuspp.nib.gg/api/skin?url=" + userForm.ankamaCharacterUrl,
        {
          method: "GET",
        }
      );
      const nibApiResJSON = (await nibApiRes.json()) as SkinImage;
      console.log(nibApiResJSON);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(userForm.userName);
  console.log(userForm.ankamaCharacterUrl);

  return (
    <GlobalLayout
      pageContainer={
        <div className="w-full h-full flex justify-center">
          <div className="flex flex-col w-5/6 h-full border-r-2 border-l-2 border-[#111111] box-border">
            <div className="bg-no-repeat bg-top bg-[url('../../../public/images/banner.jpg')] w-full h-2/6 ma bg-cover drop-shadow-md sticky top-0" />
            <div className="bg-[#181818] text-white font-KoHo flex flex-col justify-between h-full">
              <div className=" flex h-full items-center">
                <div className="flex flex-col h-full w-2/6 items-center">
                  <h1 className="text-2xl font-KoHo">
                    {fetchedUserData.userName}
                  </h1>
                  <img
                    src={`${urlImg}`}
                    className="w-40 rounded shadow-[0_4px_4px_-0px_rgba(0,0,0,0.25)]"
                  />
                  <div></div>
                </div>
                <div className="w-1 h-full bg-white opacity-10 mr-8"></div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* <label
                    htmlFor="profileImg"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    {" "}
                    Profile IMG{" "}
                  </label>
                  <input ref={imageRef} name="profileImg" type="file" /> */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="username"
                      className=" mb-1 text-sm font-medium text-white "
                    >
                      Username
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                        @
                      </span>
                      <input
                        type="text"
                        className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 flex-1 min-w-0 w-full text-sm p-2.5 "
                        name="userName"
                        placeholder={fetchedUserData.userName}
                        value={userForm.userName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="profileImg"
                      className="mb-1 text-sm font-medium text-white "
                    >
                      Character Img Link
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                        L
                      </span>
                      <input
                        type="text"
                        className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 flex-1 min-w-0 w-full text-sm p-2.5 "
                        name="ankamaCharacterUrl"
                        placeholder="dofus page perso link"
                        value={userForm.ankamaCharacterUrl}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-white text-black p-2 rounded-lg mt-4"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
            <FooterLayout />
          </div>
        </div>
      }
    />
  );
}
