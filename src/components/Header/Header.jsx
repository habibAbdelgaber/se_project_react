import { useState } from "react";
import { NavLink } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { getImage } from "../../utils/imageMap";
import "./Header.css";

function Header({ onAddClothes, currentCity }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const wtwr = getImage("WTWR");
  const avatarOn = getImage("Avatar On");

  //Navigation item is active
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

  return (
    <>
      <header className="header">
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
            <button
              type="button"
              className="header__add-button"
              onClick={onAddClothes}
            >
              + add clothes
            </button>
            <NavLink to="/profile" className={isActive}>
              Terrence Tegegne
            </NavLink>
          </li>
        </ul>

        {/* Avatar always visible */}
        <ul className="header__list">
          <li className="header__item">
            <img
              src={avatarOn.image}
              alt={avatarOn.name}
              className="header__avatar"
            />
          </li>
        </ul>
      </header>
    </>
  );
}

export default Header;
