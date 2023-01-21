import { useQuery } from "react-query";
import axios from "axios";

import { useAuth0 } from "@auth0/auth0-react";

export const useGetUserDataWithTokenCheck = () => {
  const { getAccessTokenSilently } = useAuth0();

  return useQuery(["userDataTokenChecked"], async () => {
    try {
      const token = await getAccessTokenSilently();

      const userDataId = localStorage.getItem("gui");
      const response = await axios.get(
        `http://localhost:4000/api/user/fetch?id=${userDataId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
      
    } catch (err) {
      console.log(err);
    }
  });
};
