import { useQuery } from "react-query";

export const useGetUserDataByParams = (paramId: any) => {
  return useQuery(
    ["getUserData", paramId],
    async () => {
      const response = await fetch(
        `http://localhost:4000/api/user/publicfetch?id=${paramId}`,
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
