import { Link } from "react-router-dom";
import { getImage } from "../../utils/imageMap";
import "./SideBar.css";

function SideBar() {
  const userAvatar = getImage("Avatar On");
  return (
    <aside className="sidebar">
      <div className="sidebar__user-info">
        <img
          className="sidebar__user-avatar"
          src={userAvatar.image}
          alt={userAvatar.name}
        />
        <Link className="sidebar__username" to="/profile">
          Terrence Tegegne
        </Link>
      </div>
      <nav className="sidebar__nav">
        <ul className="sidebar__list">
          <li className="sidebar__item">
            <Link className="sidebar__link" to="/">
              Home
            </Link>
          </li>
          <li className="sidebar__item">
            <Link className="sidebar__link" to="/about">
              About
            </Link>
          </li>
          <li className="sidebar__item">
            <Link className="sidebar__link" to="/services">
              Services
            </Link>
          </li>
          <li className="sidebar__item">
            <Link className="sidebar__link" to="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default SideBar;
