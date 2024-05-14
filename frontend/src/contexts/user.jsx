import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import API from "../api";
export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);

  const getRefreshToken = async () => {
    const tokenRefresh = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await API.post("token/refresh/", { refresh: tokenRefresh });
      const data = res.data;
      localStorage.setItem(ACCESS_TOKEN, data.access);
    } catch (error) {
      console.log(error);
      setUserData(null);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      const tokenDecoded = jwtDecode(token);
      const tokenExpiration = tokenDecoded.exp;
      const now = new Date() / 1000;
      console.log(tokenDecoded);
      if (now > tokenExpiration) {
        await getRefreshToken();
      } else {
        setUserData(tokenDecoded);
      }
    } else {
      setUserData(null);
    }
  };

  const handleSuccessfulLogin = () => {
    auth();
  };

  useEffect(() => {
    auth();
    // console.log("userrrrr");
    // console.log(userData);
  }, []);
  return (
    <UserContext.Provider
      value={{ userData, handleSuccessfulLogin, auth, getRefreshToken }}
    >
      {children}
    </UserContext.Provider>
  );
}
