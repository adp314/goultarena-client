// import { useState, useEffect } from "react";
// import { useAuth0 } from "@auth0/auth0-react";

// import axios from "axios";

// export function UserUpdateData() {
//   const { getAccessTokenSilently } = useAuth0();
//   const { user, isAuthenticated } = useAuth0();

//   const [AuthUserDataToUpdate, setAuthUserDataToUpdate] = useState({
//     email: user?.email,
//     sub: user?.sub,
//     nickname: user?.nickname,
//   });

//   const [dataFromAPI, setDataFromAPI] = useState();

//   useEffect(() => {
//     async function Sub() {
//       if (isAuthenticated) {
//         try {
//           const response = await axios.get("/GoultarenaUserRoute");
//           setAuthUserDataToUpdate(response.data);
//         } catch (error) {
//           console.log(error);
//         }
//       }
//     }
//     GetUserData();

//     async function UpdateUser() {
//       if (isAuthenticated) {
//         try {
//           const response = await axios.put("/GoultarenaUserRoute");
//           setAuthUserDataToUpdate(response.data);
//         } catch (error) {
//           console.log(error);
//         }
//       }
//     }

//     UpdateUser();
//   }, []);
// }
