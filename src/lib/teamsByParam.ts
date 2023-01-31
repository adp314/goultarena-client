import { useQuery } from "react-query";

export const useGetTeamDataByParams = (paramId: any) => {
  return useQuery(
    ["getTeamData", paramId],
    async () => {
      const response = await fetch(
        `http://localhost:4000/api/team/publicfetchbyteamid?id=${paramId}`,
        {
          method: "GET",
        }
      );
      const responseJSON = await response.json();

      return responseJSON;
    },
    {
      staleTime: 0,
      refetchOnWindowFocus: false,
      refetchInterval: 0,
    }
  );
};
