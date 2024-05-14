import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { UserContext } from "../contexts/user";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { handleSuccessfulLogin } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const res = await API.post("token/", formData);
      const data = res.data;
      localStorage.setItem(ACCESS_TOKEN, data.access);
      localStorage.setItem(REFRESH_TOKEN, data.refresh);
      setLoading(false);
      handleSuccessfulLogin();
      navigate("/");
    } catch (error) {
      setErrorMsg(error.message);
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
      {loading ? <>Loading...</> : <></>}
      {errorMsg ? <>{errorMsg}. Try Again!</> : <></>}
    </>
  );
};

export default LoginForm;
