import "./MovieBanner.scss";
import { useNavigate } from "react-router-dom";
import { W500 } from "../../api/tmdb";
import iconPlus from "../../assets/icons/iconPlus.svg";
import iconPlay from "../../assets/icons/iconPlay.svg";

export const MovieBanner = ({ movie }) => {
  const nav = useNavigate();

  if (!movie) return null;

  return (
    <div className="banner">
      <div className="banner__poster">
        <img src={movie.img} alt={movie.title} /> 
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
              <span key={s} className={`banner__star ${s <= Math.round(movie.vote_average / 2) ? "star--filled" : ""}`}>★</span>
            ))}
          </div>
          <span className="banner__kp"><b>{movie.vote_average?.toFixed(1)}</b> TMDB</span>
        </div>

        <h2 className="banner__title">{movie.title}</h2>
        <p className="banner__desc">{movie.overview?.slice(0, 200)}...</p>

        <div className="banner__btns">
          <button className="banner__btn btn--watch"
            onClick={() => nav(`/movie/${movie.id}`)}>
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
};