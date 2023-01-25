import { useQuery } from "react-query";
import axios from "axios";

import { useAuth0 } from "@auth0/auth0-react";

export const useGetUserDataWithTokenCheck = () => {
  const { user, getAccessTokenSilently } = useAuth0();

  return useQuery(
    ["getUserDataChecked"],
    async () => {
      try {
        const token = await getAccessTokenSilently();

        if (user?.sub) {
          const response = await axios.get(
            `http://localhost:4000/api/user/specialfetch?sub=${user.sub}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          return response.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    {
      staleTime: 0,
      refetchOnWindowFocus: false,
      refetchInterval: 0,
    }
  );
};
