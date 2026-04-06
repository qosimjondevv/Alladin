import "./Footer.scss";
import { NavLink } from "react-router-dom";
import { NAV_LINKS } from "../../constants";
import iconFb from "../../assets/icons/facebook.svg";
import iconTw from "../../assets/icons/twitter.svg";
import iconTg from "../../assets/icons/telegram.svg";
import iconApple from "../../assets/img/appstore.png";
import iconGoogle from "../../assets/img/googleplay.png";

export const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="f-top">
        <div className="f-logo">LOGO</div>
        <nav className="f-nav">
          {NAV_LINKS.map((l, i) => (
            <NavLink key={i} to={l.path} className="f-nav__link">
              {l.name}
            </NavLink>
          ))}
        </nav>
        <div className="f-socials">
          <a href="#">
            <img src={iconFb} alt="" />
          </a>
          <a href="#">
            <img src={iconTw} alt="" />
          </a>
          <a href="#">
            <img src={iconTg} alt="" />
          </a>
        </div>
      </div>
      <div className="f-bottom">
        <span className="f-copy">© 2020 Aladdin</span>
        <div className="f-legal">
          <a href="#">Пользовательское соглашение</a>
          <a href="#">FAQ</a>
          <a href="#">Контакты</a>
        </div>
        <div className="f-apps">
          <a href="#">
            <img src={iconApple} alt="App Store" />
          </a>
          <a href="#">
            <img src={iconGoogle} alt="Google Play" />
          </a>
        </div>
      </div>
    </div>
  </footer>
);
