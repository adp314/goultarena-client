import { GlobalLayout } from "../../components/GlobalLayout/index";
import { useAuth0 } from "@auth0/auth0-react";
import { FooterLayout } from "../../components/FooterLayout";
import { useEffect, useState, useRef, FormEvent } from "react";
import { BiRefresh } from "react-icons/Bi";
import { FaTwitter, FaDiscord } from "react-icons/fa";
import api from "../../lib/api";
import axios from "axios";

export function UserEdit() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  const imageRef = useRef<HTMLInputElement | null>(null);
  const characterUrlRef = useRef<HTMLInputElement | null>(null);

  const [fetchedUserData, setFetchedUserData] = useState({
    email: "",
    userName: "",
    sub: "",
    keyProfileImg: "",
    characterSkinUploaded: ["", ""],
    description: "",
    socialNetworkDiscord: "",
    socialNetworkTwitter: "",
  });

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [isLoadingCharacterLink, setIsLoadingCharacterLink] = useState(false);

  interface SkinImage {
    src: string; // url from ankama website (protected)
    image: string; // base64 image
  }

  // Get user data with a query param request via the email

  useEffect(() => {
    async function fetchUserData() {
      const token = await getAccessTokenSilently();
      if (user && isAuthenticated === true && isLoading === false) {
        try {
          if (user.sub) {
            const res = await api
              .authorized(token)
              .get(`/user/fetch?sub=${user.sub}`);
            setFetchedUserData(res.data);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    fetchUserData();
  }, [user && isAuthenticated === true]);

  // function handleChange for the form

  function handleChange(e: any) {
    e.preventDefault();
    setFetchedUserData({ ...fetchedUserData, [e.target.name]: e.target.value });
  }

  // handle Character change ,request api nib.gg

  async function handleCharacterLink(e: any) {
    e.preventDefault();
    setIsLoadingCharacterLink(true);
    const characterUrlTarget = characterUrlRef?.current?.value;
    console.log(characterUrlTarget);
    try {
      if (characterUrlTarget) {
        const nibApiRes = await fetch(
          "https://dofuspp.nib.gg/api/skin?url=" + characterUrlTarget,
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
        }
        console.log(nibApiResJSON);
      }
      setIsLoadingCharacterLink(false);
    } catch (error) {
      console.log(error);
    }
  }

  // handle Submit form

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoadingSubmit(true);
    let infosToSendForAPI = { ...fetchedUserData };

    // profile img
    try {
      const target = imageRef?.current;

      if (target && target.files) {
        const file = target.files[0];
        if (file) {
          const response = await fetch(
            `http://localhost:4000/api/uploadimg/postuserimg?sKey=` +
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

          infosToSendForAPI = { ...fetchedUserData, keyProfileImg: key };
        }
      }
    } catch (err) {
      console.log(err);
    }

    // axios.put infos of the state fetchedUserData

    try {
      const token = await getAccessTokenSilently();
      const putResponse = await api
        .authorized(token)
        .put("/user/edit", infosToSendForAPI);
      console.log(putResponse.data);
      setIsLoadingSubmit(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <GlobalLayout
      pageContainer={
        <div className="flex justify-center">
          <div className="flex flex-col w-5/6 h-full border-r-2 border-l-2 border-[#111111] box-border">
            <div className="bg-no-repeat bg-[url('/src/images/banner.jpg')] w-full h-44 bg-cover drop-shadow-md" />
            <div className="bg-[#181818] text-white font-KoHo flex justify-evenly h-full">
              <div className="flex justify-center items-center ">
                <img
                  alt="character skin"
                  src={
                    "data:image/png;base64," +
                    fetchedUserData.characterSkinUploaded[0]
                  }
                />
              </div>
              <div className="w-0.5 h-full bg-gray-400 opacity-5"></div>
              <div className=" flex justify-center items-center mt-8 mb-10">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4 pl-4 pr-4"
                >
                  <div className="flex flex-col">
                    <label
                      htmlFor="username"
                      className="mb-2 text-lg font-KoHo font-medium text-white"
                    >
                      Username
                    </label>
                    <div className="flex">
                      <span className="flex items-center px-3 text-base text-black bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                        @
                      </span>
                      <input
                        id="username"
                        type="text"
                        className="rounded-none rounded-r-lg font-KoHo text-base bg-gray-50 border border-gray-300 text-black flex-1 min-w-0 w-full p-2.5 "
                        name="userName"
                        value={fetchedUserData.userName}
                        onChange={handleChange}
                        pattern="[a-zA-Z][a-zA-Z0-9_-]{2,12}#[0-9]{3}"
                        minLength={7}
                        maxLength={16}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="characterUrl"
                      className="mb-2 text-lg font-KoHo font-medium text-white"
                    >
                      Perso page link
                    </label>
                    <div className="flex ">
                      <span className="flex items-center px-3 text-base text-black bg-gray-300 border border-r-0 border-gray-300 rounded-l-md">
                        L
                      </span>
                      <input
                        id="characterUrl"
                        type="text"
                        className="rounded-none rounded-r-lg bg-white border font-KoHo border-gray-300 text-black flex-1 min-w-0 w-full text-base p-2.5 "
                        name="characterSkinUrlPage"
                        placeholder="dofus page perso link"
                        ref={characterUrlRef}
                        onChange={handleChange}
                      />
                      <button
                        className="flex justify-center items-center"
                        onClick={handleCharacterLink}
                        disabled={isLoadingCharacterLink}
                      >
                        <BiRefresh
                          style={{
                            color: isLoadingCharacterLink ? "red" : "#ffffff",
                          }}
                          className={`${
                            isLoadingCharacterLink
                              ? " text-3xl self-center text-red-500 animate-spin"
                              : " text-3xl self-center text-white"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label
                      className="mb-2 text-lg font-KoHo font-medium text-white"
                      htmlFor="user_avatar"
                    >
                      Upload file
                    </label>
                    <input
                      id="user_avatar"
                      className="w-full h-10 text-base text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white"
                      name="user_avatar"
                      type="file"
                      ref={imageRef}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="discord"
                      className="mb-2 text-lg font-KoHo font-medium text-white"
                    >
                      Discord
                    </label>
                    <div className="flex">
                      <span className="flex items-center px-3 text-base text-black bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                        <FaDiscord className="text-indigo-700" />
                      </span>
                      <input
                        id="discord"
                        type="text"
                        className="rounded-none rounded-r-lg font-KoHo text-base bg-gray-50 border border-gray-300 text-black flex-1 min-w-0 w-full p-2.5 "
                        name="socialNetworkDiscord"
                        value={fetchedUserData.socialNetworkDiscord}
                        placeholder="Discord Username"
                        onChange={handleChange}
                        pattern="[a-zA-Z][a-zA-Z0-9_-]{2,20}#[0-9]{4}"
                        maxLength={25}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="twitter"
                      className="mb-2 text-lg font-KoHo font-medium text-white"
                    >
                      Twitter
                    </label>
                    <div className="flex">
                      <span className="flex items-center px-3 text-base text-black bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                        <FaTwitter className="text-blue-500" />
                      </span>
                      <input
                        id="twitter"
                        type="text"
                        className="rounded-none rounded-r-lg font-KoHo text-base bg-gray-50 border border-gray-300 text-black flex-1 min-w-0 w-full p-2.5 "
                        name="socialNetworkTwitter"
                        value={fetchedUserData.socialNetworkTwitter}
                        placeholder="@ Twitter Username"
                        onChange={handleChange}
                        pattern="@[A-Za-z0-9_]{1,15}"
                        maxLength={15}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="message"
                      className="mb-2 text-lg font-KoHo font-medium text-white"
                    >
                      Description
                    </label>
                    <textarea
                      id="message"
                      rows={Number(4)}
                      className=" p-3 w-full font-KoHo text-lg text-black rounded-lg border border-gray-300"
                      placeholder="Description, 150max ..."
                      name="description"
                      value={fetchedUserData.description}
                      onChange={handleChange}
                      maxLength={150}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoadingSubmit}
                    className={`${
                      isLoadingSubmit
                        ? "hidden"
                        : "bg-white font-KoHo text-black p-2 rounded-lg mt-4"
                    }`}
                  >
                    Submit
                  </button>
                </form>
              </div>
              <div className="w-0.5 h-full bg-gray-400 opacity-5 mr-8"></div>
              <div className=" flex justify-center items-center">
                <div
                  className={`w-48 h-48 rounded bg-no-repeat bg-cover shadow-[0_4px_4px_-0px_rgba(0,0,0,0.25)]`}
                  style={{
                    backgroundImage: `url(https://goultarena-aws3.s3.eu-west-3.amazonaws.com/${fetchedUserData.keyProfileImg})`,
                  }}
                />
              </div>
            </div>
            <FooterLayout />
          </div>
        </div>
      }
    />
  );
}
