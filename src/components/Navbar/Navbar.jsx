import { useState } from "react";
import Header from "../Header/Header";
import { getImage } from "../../utils/imageMap";
import "./Navbar.css";

function Navbar({ onAddClothes, currentCity }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const wtwr = getImage("WTWR");
  const avatarOn = getImage("Avatar On");

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const currentDate = new Date().toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });

  if (!currentCity) return null;

  return (
    <Header>
      <nav className="navbar">
        <div
          className={`navbar__menu ${isMenuOpen ? "navbar__menu-open" : ""}`}
          onClick={handleMenuToggle}
        >
          <span className="navbar__menu-item navbar__menu-item-1"></span>
          <span className="navbar__menu-item navbar__menu-item-2"></span>
          <span className="navbar__menu-item navbar__menu-item-3"></span>
        </div>
        <ul
          className={`navbar__list navbar__list-main ${
            isMenuOpen ? "navbar__list-open" : ""
          }`}
        >
          <li className="navbar__item">
            <img src={wtwr.image} alt={wtwr.name} className="navbar__logo" />
            <span className="navbar__weather-text">
              {currentDate}, {currentCity}
            </span>
          </li>
          <li className="navbar__item">
            <button
              type="button"
              className="navbar__add-button"
              onClick={onAddClothes}
            >
              + add clothes
            </button>
            <span className="navbar__username">Terrence Tegegne</span>
          </li>
        </ul>

        {/* Avatar always visible */}
        <ul className="navbar__list">
          <li className="navbar__item">
            <img
              src={avatarOn.image}
              alt={avatarOn.name}
              className="navbar__avatar"
            />
          </li>
        </ul>
      </nav>
    </Header>
  );
}

export default Navbar;
