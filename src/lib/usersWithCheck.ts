import { useQuery } from "react-query";
import axios from "axios";

import { useAuth0, Auth0ContextInterface, User } from "@auth0/auth0-react";

export const useGetUserData = () => {
  const auth = useAuth0();

  return useQuery(["getUserData"], () => apiGet(auth));
};

export const apiGet = async (auth: Auth0ContextInterface<User>) => {
  const token = await auth.getAccessTokenSilently();
  if (auth.user && auth.isLoading === false && auth.isAuthenticated === true) {
    const response = await axios.get("http://localhost:4000/api/user/fetch", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        sub: auth.user.sub,
      },
    });
    return response.data;
  }
};
