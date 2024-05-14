import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";
import { jwtDecode } from "jwt-decode";

const API = axios.create({ baseURL: "http://localhost:8000/api/" });

API.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem(ACCESS_TOKEN);

    if (token) {
      const decodedToken = jwtDecode(token);
      const expiration = decodedToken.exp;
      const now = new Date() / 1000;
      if (expiration < now) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
