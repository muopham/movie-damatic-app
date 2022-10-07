import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames/bind";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import styles from "./Header.module.scss";
import Button from "../Button/Button";
import { useSelector, useDispatch } from "react-redux";

import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { login, logout } from "../../redux/useSlice";

const cx = classNames.bind(styles);

const menu = [
  {
    display: "Home",
    path: "/",
  },
  {
    display: "Movies",
    path: "/movie",
  },
  {
    display: "TV Show",
    path: "/tv",
  },
  {
    display: "My list",
    path: "/account",
  },
];
const Header = () => {
  const { pathname } = useLocation();
  const [activeMobile, setActiveMobile] = useState(false);

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const active = menu.findIndex((e) => e.path === pathname);
  const menuMobile = () => setActiveMobile(!activeMobile);

  useEffect(() => {
    const unSubscribed = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(
          login({
            email: currentUser.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return () => {
      unSubscribed();
    };
  }, [dispatch]);

  const handleLogOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={cx("wrapper")}>
      <Link to="/">
        <div className={cx("logo")}>
          <p>dramatic</p>
        </div>
      </Link>
      <ul className={cx("menu", `${activeMobile ? "active" : ""}`)}>
        {menu.map((item, index) => (
          <Link to={item.path} key={index}>
            <li
              className={cx(`${index === active ? "active" : ""}`)}
              onClick={menuMobile}
            >
              {item.display}
            </li>
          </Link>
        ))}
        <div className={cx("icon", "close")} onClick={menuMobile}>
          <i className="bx bx-chevrons-left"></i>
        </div>
      </ul>
      {/*  */}
      <div className={cx("menu__right")}>
        {user ? (
          <>
            <div className={cx("icon")}>
              <i className="bx bx-gift"></i>
            </div>
            <div className={cx("icon")}>
              <i className="bx bx-bell"></i>
            </div>
            <Tippy content="Log out!">
              <div className={cx("avatar")} onClick={handleLogOut}></div>
            </Tippy>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/register">
              <Button primary>Signup</Button>
            </Link>
          </>
        )}

        <div className={cx("icon", "mobile")} onClick={menuMobile}>
          <i className="bx bx-menu-alt-right"></i>
        </div>
      </div>
    </div>
  );
};

export default Header;
