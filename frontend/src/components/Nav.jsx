import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/user";
import { Link } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { IoNewspaper } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { TiUserAdd } from "react-icons/ti";
import { IoLogIn } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import "../styles/Nav.css";

const Nav = ({ children }) => {
  const { userData } = useContext(UserContext);
  // const { username } = userData !== null ? userData : "";
  // const formattedUsername =
  //   username.slice(0, 1).toUpperCase() + username.slice(1).toLowerCase();

  return (
    <div className="content-grid header full-width">
      <nav>
        <Link to={"/"}>
          <h1>Blog</h1>
        </Link>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
        </ul>
        {userData && userData.username ? (
          <div className="nav__profile">
            {userData.username}
            <div className="nav__profile--drop">
              <Link to={`/profile/${userData.username}`}>
                <FaCircleUser />
                Profile
              </Link>
              {userData.is_editor && (
                <Link to={"/post/create"}>
                  <IoNewspaper />
                  New Post
                </Link>
              )}

              <Link to={"/logout"}>
                <IoLogOut />
                Logout
              </Link>
            </div>
          </div>
        ) : (
          <div className="nav__auth">
            <Link to={"/login"}>
              <button className="nav__btn btn__black">
                <IoLogIn />
                Login
              </button>
            </Link>
            <Link to={"/register"}>
              <button className="nav__btn btn__white">
                <TiUserAdd />
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </nav>
      <header>
        <div>
          <h2>Our Articles</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
            similique.
          </p>
        </div>
        <div className="header__search">
          <div className="header__search__left">
            <CiSearch />
            <input
              type="text"
              placeholder="Search..."
              className="header__input"
            />
          </div>
          <select name="" id="">
            <option value="">Tags</option>
          </select>
        </div>
      </header>
      <div className="full-width">{children}</div>
    </div>
  );
};

export default Nav;
