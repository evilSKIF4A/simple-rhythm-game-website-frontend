import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectIsAuth } from "../../redux/slices/auth";
import { logout } from "../../redux/slices/auth";
import "./Header.css";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    window.localStorage.removeItem("token");
    navigate("/auth/login");
    window.location.reload();
  };

  return (
    <>
      <header className="p-3 text-bg-dark ">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none fs-2"
            >
              Rhythm Game
            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <a href="/game" className="nav-link px-2 text-white fs-2 ms-4">
                  Играть
                </a>
              </li>
              {/* <li>
                <a href="#" className="nav-link px-2 text-secondary">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="nav-link px-2 text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="nav-link px-2 text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="nav-link px-2 text-white">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="nav-link px-2 text-white">
                  About
                </a>
              </li> */}
            </ul>

            {!isAuth ? (
              <div className="text-end nav col-12 col-lg-auto">
                <Link
                  to="/auth/login"
                  className="btn btn-outline-light me-2 fs-4"
                >
                  Войти
                </Link>
                <Link
                  to="/auth/register"
                  className="btn btn-outline-light  fs-4"
                >
                  Регистрация
                </Link>
              </div>
            ) : (
              <div className="text-end nav col-12 col-lg-auto">
                <button
                  onClick={onClickLogout}
                  type="submit"
                  className="btn btn-danger me-2 fs-4"
                >
                  Выйти
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
