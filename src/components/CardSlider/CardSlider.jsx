import "./CardSlider.scss";
import { useState, useEffect } from "react";
import { SliderHeader } from "../SliderHeader/SliderHeader";
import { MovieCard }    from "../MovieCard/MovieCard";
import { tmdb, W500 }   from "../../api/tmdb";

const VISIBLE = 6;

const FETCH = {
  new:     tmdb.newMovies,
  popular: tmdb.popular,
  series:  tmdb.series,
  coming:  tmdb.coming,
  top:     tmdb.top,
};

export const CardSlider = ({ title, movies: prop, type, path }) => {
  const [movies,  setMovies]  = useState(prop || []);
  const [start,   setStart]   = useState(0);
  const [loading, setLoading] = useState(!!type);

  useEffect(() => {
    if (!type || !FETCH[type]) return;
    FETCH[type]().then((d) => {
      setMovies(
        (d.results || []).map((m) => ({
          id:       m.id,
          tmdbId:   m.id,
          title:    m.title || m.name,
          subtitle: "Подписка",
          badge:    null,
          img:      m.poster_path ? `${W500}${m.poster_path}` : null,
        }))
      );
      setLoading(false);
    });
  }, [type]);

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
      {loading ? (
        <div className="slider__skeleton">
          {[...Array(VISIBLE)].map((_, i) => <div key={i} className="slider__skel" />)}
        </div>
      ) : (
        <div className="slider__list">
          {movies.slice(start, start + VISIBLE).map((m) => (
            <MovieCard key={m.id} img={m.img} title={m.title}
              subtitle={m.subtitle} badge={m.badge} tmdbId={m.tmdbId} />
          ))}
        </div>
      )}
    </section>
  );
};