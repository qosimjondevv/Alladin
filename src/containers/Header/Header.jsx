import "./Header.scss";
import { useNavigate } from "react-router-dom";
import { useHeroSlider } from "../../hooks/useHeroSlider";
import { IMG } from "../../api/tmdb";
import iconPlay from "../../assets/icons/iconPlay.svg";
import iconPlus from "../../assets/icons/iconPlus.svg";

export const Header = () => {
  const nav = useNavigate();
  const { movies, active, setActive, current, loading } = useHeroSlider();

  if (loading || !current) return null;

  return (
    <div className="header">
      <div className="header__back">
        {movies.map((m, i) => (
          <img
            key={m.id}
            src={`${IMG}/original${m.backdrop_path}`}
            alt={m.title}
            className={`header__back-img ${i === active ? "active" : ""}`}
          />
        ))}
        <div className="header__fade" />
      </div>

      <div className="header__inner container">
        <div className="header__tags">
          <span className="header__tag tag--red">Новинка</span>
          <span className="header__tag tag--white">FULL HD</span>
        </div>

        <h1 className="header__title">{current.title}</h1>

        <div className="header__meta">
          <span>⭐ {current.vote_average?.toFixed(1)}</span>
          <span>{current.release_date?.slice(0, 4)}</span>
        </div>

        <p className="header__overview">
          {current.overview?.slice(0, 150)}...
        </p>

        <div className="header__btns">
          <button className="header__btn btn--watch"
            onClick={() => nav(`/movie/${current.id}`)}>
            <img src={iconPlay} alt="" />
            <span>Смотреть по подписке</span>
          </button>
          <button className="header__btn btn--fav">
            <img src={iconPlus} alt="" />
            <span>Добавить в избранное</span>
          </button>
        </div>

        <div className="header__dots">
          {movies.map((_, i) => (
            <span key={i}
              className={`header__dot ${i === active ? "active" : ""}`}
              onClick={() => setActive(i)} />
          ))}
        </div>
      </div>
    </div>
  );
};