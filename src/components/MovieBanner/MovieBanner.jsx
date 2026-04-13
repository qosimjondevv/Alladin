import "./MovieBanner.scss";
import Banner   from "../../assets/img/movieBanner.png";
import iconPlus from "../../assets/icons/iconPlus.svg";
import iconPlay from "../../assets/icons/iconPlay.svg";

export const MovieBanner = () => (
  <div className="banner">
    <div className="banner__poster">
      <img src={Banner} alt="Однажды в… Голливуде" />
    </div>

    <div className="banner__info">
      <div className="banner__badges">
        <span className="banner__badge badge--exclusive">Эксклюзивно</span>
        <span className="banner__badge badge--age">18+</span>
        <span className="banner__badge badge--quality">FULL HD</span>
      </div>

      <div className="banner__rating">
        <div className="banner__stars">
          {[1,2,3,4,5].map((s) => (
            <span key={s} className={`banner__star ${s <= 3 ? "star--filled" : ""}`}>★</span>
          ))}
        </div>
        <span className="banner__kp"><b>6.7</b> КиноПоиск</span>
      </div>

      <h2 className="banner__title">Однажды в… Голливуде</h2>
      <p className="banner__desc">
        1969 год, золотой век Голливуда уже закончился. Известный актёр Рик
        Далтон и его дублёр Клифф Бут пытаются найти своё место в
        стремительно меняющемся мире киноиндустрии.
      </p>

      <div className="banner__btns">
        <button className="banner__btn btn--watch">
          <img src={iconPlay} alt="" />
          <div className="banner__btn-text">
            <span>Смотреть</span>
            <small>по подписке</small>
          </div>
        </button>
        <button className="banner__btn btn--fav">
          <img src={iconPlus} alt="" />
          <div className="banner__btn-text">
            <span>Добавить</span>
            <small>в избранное</small>
          </div>
        </button>
      </div>
    </div>
  </div>
);