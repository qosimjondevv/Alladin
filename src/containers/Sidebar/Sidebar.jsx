import "./Sidebar.scss";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import iconsSearch from "../../assets/icons/search.svg";
import iconsBell   from "../../assets/icons/bell.svg";
import { NAV_LINKS } from "../../constants";

export const Sidebar = () => {
  const nav = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
    <header className="topbar">
      <div className="topbar-inner container">
        <div className="topbar-logo" onClick={() => nav("/")}>LOGO</div>

        {/* Desktop navigatsiya */}
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
            style={{ cursor: "pointer" }}
          />
          <div className="user-avatar" onClick={() => nav("/profile")}>
            <img src="https://i.pravatar.cc/40?img=12" alt="User" />
          </div>

          {/* Burger — faqat mobileda ko'rinadi */}
          <button
            className="topbar-burger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Меню"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile menyu */}
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
    </>
  );
};