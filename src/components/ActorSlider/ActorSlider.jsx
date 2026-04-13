import "./ActorSlider.scss";
import { useRef } from "react";
import { ActorCard } from "../ActorCard/ActorCard";
import iconLeft  from "../../assets/icons/iconCaruselLeft.svg";
import iconRight from "../../assets/icons/iconCaruselRight.svg";

export const ActorSlider = ({ cast }) => {
  const ref = useRef(null);

  if (!cast || cast.length === 0) return null;

  const scroll = (dir) =>
    ref.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  return (
    <div className="actor-slider">
      <div className="actor-slider__head">
        <h2 className="actor-slider__title">В ролях</h2>
        <div className="actor-slider__btns">
          <button onClick={() => scroll(-1)} aria-label="Назад">
            <img src={iconLeft}  alt="prev" />
          </button>
          <button onClick={() => scroll(1)} aria-label="Вперёд">
            <img src={iconRight} alt="next" />
          </button>
        </div>
      </div>

      <div className="actor-slider__list" ref={ref}>
        {cast.map((a) => (
          <ActorCard
            key={a.id}
            id={a.id}
            name={a.name}
            character={a.character}
            img={a.profile_path}
          />
        ))}
      </div>
    </div>
  );
};