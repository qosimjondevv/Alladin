import { useState, useEffect, useRef } from "react";
import { tmdb, W500 } from "../api/tmdb";

export const useHeroSlider = () => {
  const [movies, setMovies] = useState([]);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    tmdb.popular().then((d) => {
      setMovies((d.results || []).slice(0, 5));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (loading || movies.length === 0) return;
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % movies.length);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, [loading, movies.length]);

  const current = movies[active] || null;

  return { movies, active, setActive, current, loading };
};