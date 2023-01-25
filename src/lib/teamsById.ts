import { useQuery } from "react-query";

export const useGetTeamDataById = () => {
  const userDataTeamId = localStorage.getItem("gti");
  return useQuery(
    ["getTeamData", userDataTeamId],
    async () => {
      if (userDataTeamId) {
        const response = await fetch(
          `http://localhost:4000/api/team/publicfetchbyteamid?id=${userDataTeamId}`,
          {
            method: "GET",
          }
        );
        const responseJSON = await response.json();

        return responseJSON;
      }
    },
    {
      staleTime: 0,
      refetchOnWindowFocus: false,
      refetchInterval: 0,
    }
  );
};
