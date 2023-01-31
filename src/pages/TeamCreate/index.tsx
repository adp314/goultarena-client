import { GlobalLayout } from "../../components/GlobalLayout/index";
import { FooterLayout } from "../../components/FooterLayout";
import { ErrorPage } from "../ErrorPage";
import { useNavigate } from "react-router-dom";
import { useGetUserDataWithTokenCheck } from "../../lib/usersWithCheck";
import { useState, useEffect, useRef, FormEvent } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import api from "../../lib/api";

import axios from "axios";

export function TeamCreate() {
  const imageRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const [isSubmitForm, setIsSubmitForm] = useState(false);

  const { data: userData } = useGetUserDataWithTokenCheck();

  const [createTeamForm, setCreateTeamForm] = useState({
    teamName: "",
    teamTag: "",
    teamKeyImg: "",
    teamDescription: "",
    teamSecretCode: "",
    teamLeaderId: "",
  });

  // useEffect(() => {
  //   if (userData) {
  //     if (userData.team.teamName) {
  //       navigate("/home");
  //     }
  //   }
  // }, [userData]);

  // useEffect(() => {
  //   async function fetchUserData() {
  //     const token = await getAccessTokenSilently();
  //     if (user && isAuthenticated === true && isLoading === false) {
  //       try {
  //         if (user.sub) {
  //           const res = await api
  //             .authorized(token)
  //             .get(`/user/fetch?sub=${user.sub}`);
  //           setFetchedUserData(res.data);
  //         }
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }
  //   }
  //   fetchUserData();
  // }, [user && isAuthenticated === true]);

  function handleChange(e: any) {
    e.preventDefault();
    setCreateTeamForm({
      ...createTeamForm,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    let infosToSendForAPI = { ...createTeamForm };

    try {
      const target = imageRef?.current;

      if (target && target.files) {
        const file = target.files[0];
        if (file) {
          const response = await fetch(
            `http://localhost:4000/api/uploadimg/postimgteam?sKey=` +
              createTeamForm.teamKeyImg,
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

          setCreateTeamForm({ ...createTeamForm, teamKeyImg: key });

          infosToSendForAPI = { ...createTeamForm, teamKeyImg: key };
        }
      }
    } catch (err) {
      console.log(err);
    }
    try {
      const token = await getAccessTokenSilently();

      infosToSendForAPI = {
        ...createTeamForm,
        teamLeaderId: userData._id,
      };
      console.log(infosToSendForAPI);
      const putResponse = await api
        .authorized(token)
        .post("/team/create", infosToSendForAPI);
      console.log(putResponse.data);
      setIsLoadingSubmit(false);
      setIsSubmitForm(true);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  return userData?.team.teamName ? (
    <ErrorPage />
  ) : (
    <GlobalLayout
      pageContainer={
        <div className="w-full h-full flex justify-center">
          <div className="flex flex-col w-5/6 h-max box-shadow-md ">
            <div className="drop-shadow-md">
              <div className="bg-no-repeat bg-[url('/src/images/banner.jpg')] w-full h-32 bg-cover drop-shadow-md" />
            </div>
            <section className="bg-[#181818] text-white font-KoHo flex flex-col h-full w-full drop-shadow-md">
              <div className="flex flex-col justify-center items-center">
                <div className=" flex justify-center items-center">
                  <div
                    className={`w-48 h-48 rounded bg-no-repeat bg-cover shadow-[0_4px_4px_-0px_rgba(0,0,0,0.25)]`}
                    style={{
                      backgroundImage: `url(https://goultarena-aws3.s3.eu-west-3.amazonaws.com/${createTeamForm.teamKeyImg})`,
                    }}
                  />
                </div>
                <form
                  className="flex flex-col w-44 font-KoHo"
                  onSubmit={handleSubmit}
                >
                  <label
                    className="mb-2 text-lg font-KoHo font-medium text-white"
                    htmlFor="team_avatar"
                  >
                    Upload file
                  </label>
                  <input
                    id="team_avatar"
                    className="w-full h-10 text-base text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white "
                    name="user_avatar"
                    type="file"
                    ref={imageRef}
                  />
                  <label htmlFor="name">Team Name</label>
                  <input
                    className="text-gray-900"
                    type="text"
                    id="name"
                    name="teamName"
                    onChange={handleChange}
                    value={createTeamForm.teamName}
                  />
                  <label htmlFor="tag">Team Tag</label>
                  <input
                    className="text-gray-900"
                    type="text"
                    id="tag"
                    name="teamTag"
                    onChange={handleChange}
                    value={createTeamForm.teamTag}
                  />
                  <label htmlFor="code">Secret Code</label>
                  <input
                    className="text-gray-900"
                    type="text"
                    id="code"
                    name="teamSecretCode"
                    onChange={handleChange}
                    value={createTeamForm.teamSecretCode}
                  />
                  <label htmlFor="description">Team Description</label>
                  <textarea
                    className="text-gray-900"
                    name="teamDescription"
                    id="description"
                    rows={Number(4)}
                    onChange={handleChange}
                    value={createTeamForm.teamDescription}
                  />
                  <button
                    type="submit"
                    className="bg-green-500 text-white mt-4"
                  >
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
