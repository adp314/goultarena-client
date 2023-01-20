import { useQuery } from "react-query";
import { useEffect } from "react";

export const useGetUserPublicData = () => {
  const userData = JSON.parse(sessionStorage.getItem("userData") as string);
  const userDataId = userData._id;

  return useQuery(["getUserPublicData", userDataId], async () => {
    const response = await fetch(
      `http://localhost:4000/api/user/publicfetch?_id=${userDataId}`,
      {
        method: "GET",
      }
    );
    const responseJSON = await response.json();

    console.log(userDataId);

    return responseJSON;
  });
};
