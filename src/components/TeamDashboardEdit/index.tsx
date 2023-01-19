import { useState, useEffect, useRef } from "react";
import api from "../../lib/api";
import { useAuth0 } from "@auth0/auth0-react";

export function TeamDashboardEdit() {
  const { user, getAccessTokenSilently } = useAuth0();

  const [fetchedTeamData, setFetchedTeamData] = useState({
    _id: "",
    teamName: "",
    teamTag: "",
    teamKeyImg: "",
    teamSecretCode: "",
    teamMembers: [],
    teamDescription: "",
    teamAllStatsCount: { Wins: 0, Draws: 0, Looses: 0 },
  });

  const imageRef = useRef<HTMLInputElement | null>(null);
  const [fetchedUserData, setFetchedUserData] = useState({
    _id: "",
    userName: "",
  });

  //   useEffect(() => {
  //     try {
  //       const token = await getAccessTokenSilently();
  //       const putResponse = await api.authorized(token).get(`/team/fetch?id=`);
  //       console.log(putResponse.data);
  //       window.location.reload();
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }, []);

  function handleSubmit(e: any) {
    e.preventdefault();
  }

  function handleChange(e: any) {
    e.preventdefault();
  }

  return (
    <div>
      <form className="flex flex-col w-44 font-KoHo" onSubmit={handleSubmit}>
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
          value={fetchedTeamData.teamName}
        />
        <label htmlFor="tag">Team Tag</label>
        <input
          className="text-gray-900"
          type="text"
          id="tag"
          name="teamTag"
          onChange={handleChange}
          value={fetchedTeamData.teamTag}
        />
        <label htmlFor="code">Secret Code</label>
        <input
          className="text-gray-900"
          type="text"
          id="code"
          name="teamSecretCode"
          onChange={handleChange}
          value={fetchedTeamData.teamSecretCode}
        />
        <label htmlFor="description">Team Description</label>
        <textarea
          className="text-gray-900"
          name="teamDescription"
          id="description"
          rows={Number(4)}
          onChange={handleChange}
          value={fetchedTeamData.teamDescription}
        />
        <button type="submit" className="bg-green-500 text-white mt-4">
          Submit
        </button>
      </form>
    </div>
  );
}
