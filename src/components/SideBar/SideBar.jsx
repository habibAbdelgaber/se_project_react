import { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ onEditProfile }) {
  const { currentUser, handleSignOut } = useContext(CurrentUserContext);

  const userInitial = currentUser?.name?.charAt(0)?.toUpperCase() || "";

  return (
    <aside className="sidebar">
      <div className="sidebar__user-info">
        {currentUser?.avatar ? (
          <img
            className="sidebar__user-avatar"
            src={currentUser.avatar}
            alt={currentUser.name}
          />
        ) : (
          <div className="sidebar__avatar-placeholder">
            {userInitial}
          </div>
        )}
        <Link className="sidebar__username" to="/profile">
          {currentUser?.name || "User"}
        </Link>
      </div>
      <nav className="sidebar__nav">
        <ul className="sidebar__list">
          <li className="sidebar__item">
            <button className="sidebar__link sidebar__link-button" onClick={onEditProfile}>
              Edit Profile
            </button>
          </li>
          <li className="sidebar__item">
            <button className="sidebar__link sidebar__link-button" onClick={handleSignOut}>
              Sign Out
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default SideBar;
