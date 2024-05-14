import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/user";
import { Navigate } from "react-router-dom";
const Logout = () => {
  const { auth } = useContext(UserContext);

  useEffect(() => {
    auth();
  }, []);
  return <Navigate to={"/"} />;
};

export default Logout;
