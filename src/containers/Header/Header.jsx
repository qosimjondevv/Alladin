import "./Header.scss";
import iconIMD from "../../assets/icons/iconMND.svg";
import iconCinema from "../../assets/icons/iconCnema.svg";
import iconPlus from "../../assets/icons/iconPlus.svg";
import iconPlay from "../../assets/icons/iconPlay.svg";

export const Header = () => (
  <div className="header container">
    <div className="header__inner">
      <div className="header__tags">
        <span className="header__tag tag--red">Новинка</span>
        <span className="header__tag tag--white">FULL HD</span>
      </div>

      <h1 className="header__title">Ford против Ferrari</h1>

      <div className="header__meta">
        <span className="header__year">2019 | 16+</span>
        <span className="header__rating">
          <img src={iconIMD} alt="IMDb" /> 6.9
        </span>
        <span className="header__kp">
          <img src={iconCinema} alt="KP" /> 6.518
        </span>
      </div>

      <div className="header__btns">
        <button className="header__btn btn--watch">
          <img src={iconPlay} alt="" />
          <span>Смотреть по подписке</span>
        </button>
        <button className="header__btn btn--fav">
          <img src={iconPlus} alt="" />
          <span>Добавить в избранное</span>
        </button>
      </div>
    </div>
  </div>
);