import "./MovieCard.scss";
import { useNavigate } from "react-router-dom";

export const MovieCard = ({ img, title, subtitle, badge, tmdbId }) => {
  const nav = useNavigate();

  return (
    <div className="card" onClick={() => tmdbId && nav(`/movie/${tmdbId}`)}>
      <div className="card__thumb">
        {badge && <span className="card__badge">{badge}</span>}
        <img src={img} alt={title} />
      </div>
      <p className="card__title">{title}</p>
      {subtitle && <p className="card__sub">{subtitle}</p>}
    </div>
  );
};