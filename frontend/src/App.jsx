import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";
import Logout from "./pages/Logout";
import "./styles/App.css";
import PostDetail from "./pages/PostDetail";
import PostCreate from "./pages/PostCreate";

function CleanLogin() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  return (
    <Nav>
      <LoginForm />
    </Nav>
  );
}

function CleanLogout() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  return <Logout />;
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Nav>
              <Home />
            </Nav>
          }
        />
        <Route
          path="post/create/"
          element={
            <Nav>
              <PostCreate />
            </Nav>
          }
        />
        <Route
          path="post/:postSlug/"
          element={
            <Nav>
              <PostDetail />
            </Nav>
          }
        />
        <Route path="login" element={<CleanLogin />} />
        <Route path="logout" element={<CleanLogout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
