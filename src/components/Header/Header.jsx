import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { getImage } from "../../utils/imageMap";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Header.css";

function Header({ onAddClothes, currentCity, onSignIn, onSignUp }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const wtwr = getImage("WTWR");

  const isActive = ({ isActive }) =>
    `header__link ${isActive ? "header__link-active" : ""}`;
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const currentDate = new Date().toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });

  if (!currentCity) return null;

  const userInitial = currentUser?.name?.charAt(0)?.toUpperCase() || "";

  return (
    <>
      <header className="header">
        <div className="header__inner">
          <div
            className={`header__menu ${isMenuOpen ? "header__menu-open" : ""}`}
            onClick={handleMenuToggle}
          >
            <span className="header__menu-item header__menu-item-1"></span>
            <span className="header__menu-item header__menu-item-2"></span>
            <span className="header__menu-item header__menu-item-3"></span>
          </div>
          <ul
            className={`header__list header__list-main ${
              isMenuOpen ? "header__list-open" : ""
            }`}
          >
            <li className="header__item header__item-logo">
              <NavLink className="header__link" to="/">
                <img src={wtwr.image} alt={wtwr.name} className="header__logo" />
              </NavLink>
              <span className="header__weather-text">
                {currentDate}, {currentCity}
              </span>
            </li>
            <li className="header__item">
              <ToggleSwitch />
              {isLoggedIn ? (
                <>
                  <button
                    type="button"
                    className="header__add-button"
                    onClick={onAddClothes}
                  >
                    + add clothes
                  </button>
                  <NavLink to="/profile" className={isActive}>
                    {currentUser?.name || "Profile"}
                  </NavLink>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="header__auth-button"
                    onClick={onSignUp}
                  >
                    Sign up
                  </button>
                  <button
                    type="button"
                    className="header__auth-button"
                    onClick={onSignIn}
                  >
                    Sign in
                  </button>
                </>
              )}
            </li>
          </ul>

          <ul className="header__list">
            <li className="header__item">
              {isLoggedIn && currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="header__avatar"
                />
              ) : isLoggedIn ? (
                <div className="header__avatar-placeholder">
                  {userInitial}
                </div>
              ) : null}
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}

export default Header;
