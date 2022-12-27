// import axios, { AxiosRequestConfig } from "axios";

// const apiURLs: Record<string, string> = {
//   development: "http://localhost:4000/",
//   production: "NO PROD URL",
// };

// const api = axios.create({ baseURL: apiURLs[import.meta.env.NODE_ENV] });

// api.interceptors.request.use((config: AxiosRequestConfig) => {
//   const loggedInUserJSON = localStorage.getItem("loggedInUser");

//   const parseLoggedInUser = JSON.parse(loggedInUserJSON || '""');

//   if (parseLoggedInUser.token) {
//     config.headers = { Authorization: `Bearer ${parseLoggedInUser.token}` };
//   }

//   return config;
// });

// export { api };
