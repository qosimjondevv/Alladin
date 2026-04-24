import "./CardSlider.scss";
import { useState } from "react";
import { SliderHeader } from "../SliderHeader";
import { MovieCard } from "../MovieCard";
import { useMovies } from "../../hooks/useMovies";

const VISIBLE = 6;
export const CardSlider = ({ title, movies: prop, type, path }) => {
  const { movies: fetched, loading } = useMovies(type);
  const movies = prop || fetched;
  const [start, setStart] = useState(0);
  const canPrev = start > 0;
  const canNext = start + VISIBLE < movies.length;

  return (
    <section className="slider">
      <SliderHeader
        title={title}
        path={path}
        canPrev={canPrev}
        canNext={canNext}
        onPrev={() => canPrev && setStart((s) => s - 1)}
        onNext={() => canNext && setStart((s) => s + 1)}
      />
      {loading && !prop ? (
        <div className="slider__skeleton">
          {Array.from({ length: VISIBLE }, (_, i) => (
            <div key={i} className="slider__skel" />
          ))}
        </div>
      ) : (
        <div className="slider__track">
          {movies.slice(start, start + VISIBLE).map((m) => (
            <MovieCard key={m.id} {...m} />
          ))}
        </div>
      )}
    </section>
  );
};