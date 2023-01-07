import { GlobalLayout } from "../../components/LayoutGlobal/index";
import { useAuth0 } from "@auth0/auth0-react";
import { FooterLayout } from "../../components/FooterLayout";
import { useEffect, useState, useRef, FormEvent, ChangeEvent } from "react";
import { BiRefresh } from "react-icons/Bi";
import api from "../../lib/api";
import axios from "axios";

export function UserEdit() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  const imageRef = useRef<HTMLInputElement | null>(null);

  const [fetchedUserData, setFetchedUserData] = useState({
    email: "",
    userName: "",
    sub: "",
    profileImg: "",
    keyProfileImg: "",
    characterSkinUrlPage: "",
    characterSkinUploaded: ["", ""],
  });

  interface SkinImage {
    src: string; // url from ankama website (protected)
    image: string; // base64 image
  }

  const [updatedCharacterUpload, setUpdatedCharacterUpload] = useState(false);

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
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    fetchUserData();
  }, [user, isAuthenticated === true]);

  // function handleChange for the form

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setFetchedUserData({ ...fetchedUserData, [e.target.name]: e.target.value });
  }

  // handle Character change ,request api nib.gg

  async function handleCharacterLink(e: any) {
    e.preventDefault();
    try {
      const nibApiRes = await fetch(
        "https://dofuspp.nib.gg/api/skin?url=" +
          fetchedUserData.characterSkinUrlPage,
        {
          method: "GET",
        }
      );
      const nibApiResJSON = (await nibApiRes.json()) as SkinImage;
      setFetchedUserData({
        ...fetchedUserData,
        characterSkinUploaded: [
          `${nibApiResJSON.image}`,
          `${nibApiResJSON.src}`,
        ],
      });
      if (fetchedUserData.characterSkinUploaded) {
        setUpdatedCharacterUpload(true);
        console.log(updatedCharacterUpload);
      }
      console.log(nibApiResJSON);
    } catch (error) {
      console.log(error);
    }
  }

  // handle Submit form

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // profile img
    try {
      const target = imageRef?.current;

      if (target && target.files) {
        const file = target.files[0];
        if (file) {
          const response = await fetch(
            `http://localhost:4000/api/uploadimg/postimg?sKey=` +
              fetchedUserData.keyProfileImg,
            {
              method: "GET",
            }
          );

          const { post, key } = await response.json();

          const formData = new FormData();
          Object.entries({
            ...post.fields,
            file,
          }).forEach(([key, value]) => {
            formData.append(key, value as string | Blob);
          });

          await axios.post(post.url, formData);

          setFetchedUserData({ ...fetchedUserData, keyProfileImg: key });
        }
      }
    } catch (err) {
      console.log(err);
    }

    // axios.put infos of the state fetchedUserData

    try {
      const token = await getAccessTokenSilently();
      const infosToSendForAPI = { ...fetchedUserData };
      const putResponse = await api
        .authorized(token)
        .put("/user/edit", infosToSendForAPI);
      console.log(putResponse.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <GlobalLayout
      pageContainer={
        <div className="w-full h-full flex justify-center">
          <div className="flex flex-col w-5/6 h-full border-r-2 border-l-2 border-[#111111] box-border">
            <div className="bg-no-repeat bg-top bg-[url('/src/images/banner.jpg')] w-full h-2/6 ma bg-cover drop-shadow-md sticky top-0" />
            <div className="bg-[#181818] text-white font-KoHo flex flex-col justify-between h-full">
              <div className=" flex h-full items-center">
                <div className="flex flex-col h-full w-2/6 items-center">
                  <h1 className="text-2xl font-KoHo">
                    {fetchedUserData.userName}
                  </h1>
                  <img
                    src={`https://goultarena-aws3.s3.eu-west-3.amazonaws.com/${fetchedUserData.keyProfileImg}`}
                    className="w-40 h-40 rounded shadow-[0_4px_4px_-0px_rgba(0,0,0,0.25)]"
                  />
                  <div>
                    <img
                      alt="character skin"
                      src={
                        "data:image/png;base64," +
                        fetchedUserData.characterSkinUploaded[0]
                      }
                    />
                  </div>
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
                        // placeholder={fetchedUserData.userName}
                        value={fetchedUserData.userName}
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
                    <div className="flex ">
                      <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                        L
                      </span>
                      <input
                        type="text"
                        className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 flex-1 min-w-0 w-full text-sm p-2.5 "
                        name="characterSkinUrlPage"
                        placeholder="dofus page perso link"
                        value={fetchedUserData.characterSkinUrlPage}
                        onChange={handleChange}
                      />
                      <BiRefresh
                        onClick={handleCharacterLink}
                        className="text-3xl self-center ml-2 cursor-pointer"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="mb-2 text-sm font-medium text-white"
                      htmlFor="user_avatar"
                    >
                      Upload file
                    </label>
                    <input
                      className=" w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none"
                      name="user_avatar"
                      type="file"
                      ref={imageRef}
                    />
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
