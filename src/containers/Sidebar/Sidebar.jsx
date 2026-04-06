import "./Sidebar.scss";
import { NavLink, useNavigate } from "react-router-dom";
import iconsSearch from "../../assets/icons/search.svg";
import iconsBell from "../../assets/icons/bell.svg";
import { NAV_LINKS } from "../../constants";

export const Sidebar = () => {
  const nav = useNavigate();
  return (
    <header className="topbar">
      <div className="topbar-inner container">
        <div className="topbar-logo">LOGO</div>
        <nav className="topbar-nav">
          {NAV_LINKS.map((link, i) => (
            <NavLink
              key={i}
              to={link.path}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
        <div className="topbar-actions">
          <img className="icon-btn" src={iconsBell} alt="" />
          <img
            className="icon-btn"
            src={iconsSearch}
            alt=""
            onClick={() => nav("/search")}
            style={{ cursor: "pointer" }}
          />
          <div
            className="user-avatar"
            onClick={() => nav("/profile")}
            style={{ cursor: "pointer" }}
          >
            <img src="https://i.pravatar.cc/40?img=12" alt="User" />
          </div>
        </div>
      </div>
    </header>
  );
};
