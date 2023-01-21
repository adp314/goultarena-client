import { useQuery } from "react-query";

export const useGetTeamDataById = () => {
  const userDataTeamId = localStorage.getItem("gti");
  return useQuery(["getTeamPublicData", userDataTeamId], async () => {
    if (userDataTeamId) {
      const response = await fetch(
        `http://localhost:4000/api/team/publicfetch?_id=${userDataTeamId}`,
        {
          method: "GET",
        }
      );
      const responseJSON = await response.json();

      return responseJSON;
    }
  });
};
