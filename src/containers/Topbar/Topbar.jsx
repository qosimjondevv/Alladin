import "./Topbar.scss";
import { useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import iconsSearch from "../../assets/icons/search.svg";
import iconsBell from "../../assets/icons/bell.svg";
import iconUser from "../../assets/icons/iconUser.svg";
import { NAV_LINKS } from "../../constants";
import { useAuth } from "../../utils/auth";  

export const Topbar = () => {
  const nav = useNavigate();
  const { user, isLoggedIn } = useAuth();  
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="topbar">
      <div className="topbar-inner container">
        <div className="topbar-logo" onClick={() => nav("/")}>LOGO</div>

        <nav className="topbar-nav">
          {NAV_LINKS.map((link, i) => (
            <NavLink
              key={i}
              to={link.path}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="topbar-actions">
          <img className="icon-btn" src={iconsBell} alt="notifications" />
          <img
            className="icon-btn"
            src={iconsSearch}
            alt="search"
            onClick={() => nav("/search")}
          />

          {isLoggedIn ? (
            <div className="user-avatar" onClick={() => nav("/profile")}>
              <img
                src={user.img || iconUser}
                alt={user.name}
                onError={(e) => { e.currentTarget.src = iconUser; }}
              />
            </div>
          ) : (
            <button
              className="topbar-login"
              onClick={() => nav("/register", { state: { from: "/" } })}
            >
              Войти
            </button>
          )}

          <button
            className="topbar-burger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Меню"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="topbar-mobile-menu">
          {NAV_LINKS.map((link, i) => (
            <NavLink
              key={i}
              to={link.path}
              className={({ isActive }) => `tmm-link ${isActive ? "active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};