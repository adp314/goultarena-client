import { useQuery } from "react-query";

export const useGetTeamPublicDataWithParam = (paramId: any) => {
  return useQuery(["getUserPublicData", paramId], async () => {
    const response = await fetch(
      `http://localhost:4000/api/user/publicfetch?_id=${paramId}`,
      {
        method: "GET",
      }
    );
    const responseJSON = await response.json();

    return responseJSON;
  });
};
