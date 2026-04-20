import { useState, useEffect, useRef } from "react";
import { tmdb, W500 } from "../api/tmdb";

export const useContinueWatching = () => {
  const [movies,  setMovies]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [active,  setActive]  = useState(0);
  const timerRef = useRef(null);
  const listRef  = useRef(null);

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

  const startTimer = (count) => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (window.innerWidth > 768) return;
      setActive((prev) => {
        const next = (prev + 1) % count;
        const el   = listRef.current;
        if (el) el.scrollTo({ left: (el.scrollWidth / count) * next, behavior: "smooth" });
        return next;
      });
    }, 2000);
  };

  useEffect(() => {
    if (loading || movies.length === 0) return;
    startTimer(movies.length);
    return () => clearInterval(timerRef.current);
  }, [loading, movies.length]);

  const handleScroll = (e) => {
    const el    = e.currentTarget;
    const index = Math.round(el.scrollLeft / (el.scrollWidth / movies.length));
    setActive(Math.min(index, movies.length - 1));
    startTimer(movies.length);
  };

  const scrollTo = (i) => {
    const el = listRef.current;
    if (el) el.scrollTo({ left: (el.scrollWidth / movies.length) * i, behavior: "smooth" });
    setActive(i);
  };

  return { movies, loading, active, listRef, handleScroll, scrollTo };
};