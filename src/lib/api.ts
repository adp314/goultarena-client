import axios from "axios";

const apiURLs = {
  development: "http://localhost:4000/api",
  production: "",
};

const instance = axios.create({ baseURL: apiURLs.development });

const authorized = (token: any) => {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return instance;
};

export default {
  authorized,
};
