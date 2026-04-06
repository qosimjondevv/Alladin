import "./ActorCard.scss";
import { useNavigate } from "react-router-dom";
import { W500 } from "../../api/tmdb";

export const ActorCard = ({ id, name, character, img }) => {
  const nav = useNavigate();
  return (
    <div className="actor" onClick={() => nav(`/person/${id}`)}>
      <div className="actor__img">
        <img
          src={
            img
              ? `${W500}${img}`
              : "https://via.placeholder.com/174x264?text=No+Photo"
          }
          alt={name}
        />
      </div>
      <p className="actor__name">{name}</p>
      <p className="actor__role">{character}</p>
    </div>
  );
};
