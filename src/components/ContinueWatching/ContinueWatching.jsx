import "./ContinueWatching.scss";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { tmdb, W500 } from "../../api/tmdb";

export const ContinueWatching = () => {
  const [movies,  setMovies]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [active,  setActive]  = useState(0);
  const timerRef              = useRef(null);
  const listRef               = useRef(null);
  const nav                   = useNavigate();

  useEffect(() => {
    tmdb.popular().then((d) => {
      setMovies(
        (d.results || []).slice(0, 3).map((m) => ({
          id:       m.id,
          tmdbId:   m.id,
          title:    m.title,
          progress: Math.floor(Math.random() * 80) + 10,
          img:      m.backdrop_path ? `${W500}${m.backdrop_path}` : null,
        }))
      );
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (loading || movies.length === 0) return;

    const isMobile = () => window.innerWidth <= 768;

    const startTimer = () => {
      timerRef.current = setInterval(() => {
        if (!isMobile()) return;
        setActive((prev) => {
          const next = (prev + 1) % movies.length;
          // scroll
          const el = listRef.current;
          if (el) {
            const cardWidth = el.scrollWidth / movies.length;
            el.scrollTo({ left: cardWidth * next, behavior: "smooth" });
          }
          return next;
        });
      }, 2000);
    };

    startTimer();
    return () => clearInterval(timerRef.current);
  }, [loading, movies.length]);

  const handleScroll = (e) => {
    const el    = e.currentTarget;
    const index = Math.round(el.scrollLeft / (el.scrollWidth / movies.length));
    setActive(Math.min(index, movies.length - 1));

    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (window.innerWidth > 768) return;
      setActive((prev) => {
        const next = (prev + 1) % movies.length;
        const card = listRef.current;
        if (card) {
          const cw = card.scrollWidth / movies.length;
          card.scrollTo({ left: cw * next, behavior: "smooth" });
        }
        return next;
      });
    }, 2000);
  };

  return (
    <section className="cw">
      <div className="cw__head">
        <h2 className="cw__title">Продолжать смотреть</h2>
      </div>

      <div className="cw__list" ref={listRef} onScroll={handleScroll}>
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
                  <div className="cw__fill" style={{ width: `${m.progress}%` }} />
                </div>
              </div>
            ))}
      </div>

      {!loading && (
        <div className="cw__dots">
          {movies.map((_, i) => (
            <span
              key={i}
              className={`cw__dot ${i === active ? "cw__dot--active" : ""}`}
              onClick={() => {
                const el = listRef.current;
                if (el) {
                  const cw = el.scrollWidth / movies.length;
                  el.scrollTo({ left: cw * i, behavior: "smooth" });
                }
                setActive(i);
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
};