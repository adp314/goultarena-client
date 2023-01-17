import { GlobalLayout } from "../../components/GlobalLayout/index";
import { FooterLayout } from "../../components/FooterLayout";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef, FormEvent } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import api from "../../lib/api";

import axios from "axios";

export function TeamCreate() {
  let { userId } = useParams();
  const imageRef = useRef<HTMLInputElement | null>(null);

  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  // const [goultarenaIsLoaded, setGoultarenaIsLoaded] = useState(false);

  const [fetchedUserData, setFetchedUserData] = useState({
    _id: "",
    userName: "",
    sub: "",
  });

  const [createTeamInfosForm, setCreateTeamInfosForm] = useState({
    teamName: "",
    teamTag: "",
    teamKeyImg: "",
    teamDescription: "",
    teamSecretCode: "",
  });

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

  function handleChange(e: any) {
    e.preventDefault();
    setCreateTeamInfosForm({
      ...createTeamInfosForm,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // try {
    //   const target = imageRef?.current;

    //   if (target && target.files) {
    //     const file = target.files[0];
    //     if (file) {
    //       const response = await fetch(
    //         `http://localhost:4000/api/uploadimg/postimg?sKey=` +
    //           fetchedUserData.keyProfileImg,
    //         {
    //           method: "GET",
    //         }
    //       );

    //       const { post, key } = await response.json();

    //       const formData = new FormData();
    //       Object.entries({
    //         ...post.fields,
    //         file,
    //       }).forEach(([key, value]) => {
    //         formData.append(key, value as string | Blob);
    //       });

    //       await axios.post(post.url, formData);

    //       setFetchedUserData({ ...fetchedUserData, keyProfileImg: key });

    //       infosToSendForAPI = { ...fetchedUserData, keyProfileImg: key };
    //     }
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  }

  return (
    <GlobalLayout
      pageContainer={
        <div className="w-full h-full flex justify-center">
          <div className="flex flex-col w-5/6 h-max box-shadow-md ">
            <div className="drop-shadow-md">
              <div className="bg-no-repeat bg-[url('/src/images/banner.jpg')] w-full h-32 bg-cover drop-shadow-md" />
            </div>
            <section className="bg-[#181818] text-white font-KoHo flex flex-col h-full w-full drop-shadow-md">
              <div className="flex flex-col justify-center items-center">
                {/* <div className=" flex justify-center items-center">
                  <div
                    className={`w-48 h-48 rounded bg-no-repeat bg-cover shadow-[0_4px_4px_-0px_rgba(0,0,0,0.25)]`}
                    style={{
                      backgroundImage: `url(https://goultarena-aws3.s3.eu-west-3.amazonaws.com/${fetchedUserData.keyProfileImg})`,
                    }}
                  />
                </div> */}
                <form className="flex flex-col w-44" onSubmit={handleSubmit}>
                  <label
                    className="mb-2 text-lg font-KoHo font-medium text-white"
                    htmlFor="team_avatar"
                  >
                    Upload file
                  </label>
                  <input
                    id="team_avatar"
                    className="w-full h-10 text-base text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white"
                    name="user_avatar"
                    type="file"
                    ref={imageRef}
                  />
                  <label htmlFor="name">Team Name</label>
                  <input
                    type="text"
                    id="name"
                    name="teamName"
                    onChange={handleChange}
                    value={createTeamInfosForm.teamName}
                  />
                  <label htmlFor="tag">Team Tag</label>
                  <input
                    type="text"
                    id="tag"
                    name="teamTag"
                    onChange={handleChange}
                    value={createTeamInfosForm.teamTag}
                  />
                  <label htmlFor="code">Secret Code</label>
                  <input
                    type="text"
                    id="code"
                    name="teamSecretCode"
                    onChange={handleChange}
                    value={createTeamInfosForm.teamSecretCode}
                  />
                  <label htmlFor="description">Team Description</label>
                  <textarea
                    name="description"
                    id="teamDescription"
                    rows={Number(4)}
                    onChange={handleChange}
                    value={createTeamInfosForm.teamDescription}
                  />
                  <button type="submit" className="bg-green-500 text-white">
                    Submit
                  </button>
                </form>
              </div>
            </section>

            <FooterLayout />
          </div>
        </div>
      }
    />
  );
}
