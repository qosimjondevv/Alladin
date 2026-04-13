import "./ActorCard.scss";
import { useNavigate } from "react-router-dom";
import { W500 } from "../../api/tmdb";

const FALLBACK = "https://placehold.co/140x180/1e1d2a/444444?text=No+Photo";

export const ActorCard = ({ id, name, character, img }) => {
  const nav = useNavigate();

  const src = img ? `${W500}${img}` : FALLBACK;

  return (
    <div className="actor" onClick={() => nav(`/person/${id}`)}>
      <div className="actor__img">
        <img
          src={src}
          alt={name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK;
          }}
        />
      </div>
      <p className="actor__name">{name}</p>
      <p className="actor__role">{character}</p>
    </div>
  );
};