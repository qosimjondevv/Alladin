import "./Header.scss";
import iconIMD from "../../assets/icons/iconMND.svg";
import iconCinema from "../../assets/icons/iconCnema.svg";
import iconPlus from "../../assets/icons/iconPlus.svg";
import iconPlay from "../../assets/icons/iconPlay.svg";
export const Header = () => {
  return (
    <div className="header container">
      <div className="container-header">
        <div className="group-novinka">
          <div className="novinka">Новинка</div>
          <div className="fullHd">FULL HD</div>
        </div>
        <h1 className="header-text">Ford против Ferrari</h1>
        <div className="cinemed">
          <div className="text16">2019 | 16 +</div>
          <div className="imd">
            <img src={iconIMD} alt="" /> 6.9
          </div>
          <div className="cinema-text">
            <img src={iconCinema} alt="" /> 6.518
          </div>
        </div>
        <div className="btn-header">
          <div className="potpiski-btn">
            <img src={iconPlay} alt="" />
            Смотреть по подписке
          </div>
          <div className="izabrani-btn">
            <img src={iconPlus} alt="" />
            Добавить в избранное
          </div>
        </div>
      </div>
    </div>
  );
};
