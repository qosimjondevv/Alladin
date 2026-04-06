import "./ContinueWatching.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { tmdb, W500 } from "../../api/tmdb";

export const ContinueWatching = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    tmdb.popular().then((d) => {
      setMovies(
        (d.results || []).slice(0, 3).map((m) => ({
          id: m.id,
          tmdbId: m.id,
          title: m.title,
          progress: Math.floor(Math.random() * 80) + 10,
          img: m.backdrop_path ? `${W500}${m.backdrop_path}` : null,
        })),
      );
      setLoading(false);
    });
  }, []);

  return (
    <section className="cw">
      <div className="cw__head">
        <h2 className="cw__title">Продолжать смотреть</h2>
      </div>
      <div className="cw__list">
        {loading
          ? [...Array(3)].map((_, i) => <div key={i} className="cw__skel" />)
          : movies.map((m) => (
              <div
                key={m.id}
                className="cw__card"
                onClick={() => nav(`/movie/${m.tmdbId}`)}
              >
                <div className="cw__thumb">
                  <img src={m.img} alt={m.title} />
                  <div className="cw__overlay">
                    <div className="cw__play">▶</div>
                  </div>
                </div>
                <p className="cw__name">{m.title}</p>
                <div className="cw__bar">
                  <div
                    className="cw__fill"
                    style={{ width: `${m.progress}%` }}
                  />
                </div>
              </div>
            ))}
      </div>
    </section>
  );
};
