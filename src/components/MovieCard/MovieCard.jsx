import "./MovieCard.scss";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../utils/FavoritesProvider";

export const MovieCard = ({ img, title, subtitle, badge, tmdbId, id }) => {
  const nav = useNavigate();
  const { toggle, isFavorite } = useFavorites();
  const liked = isFavorite(tmdbId || id);

  const handleHeart = (e) => {
    e.stopPropagation();
    toggle({ id: tmdbId || id, img, title, subtitle });
  };

  return (
    <div className="card" onClick={() => (tmdbId || id) && nav(`/movie/${tmdbId || id}`)}>
      <div className="card__thumb">
        {badge && <span className="card__badge">{badge}</span>}
        <img src={img} alt={title} />
        <button className={`card__heart ${liked ? "active" : ""}`} onClick={handleHeart}>
          ❤
        </button>
      </div>
      <p className="card__title">{title}</p>
      {subtitle && <p className="card__sub">{subtitle}</p>}
    </div>
  );
};