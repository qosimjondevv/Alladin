import { useState, useEffect } from "react";
import { tmdb } from "../api/tmdb";
import { toCard } from "../utils/toCard";

const FETCHERS = {
  popular: tmdb.popular,
  new:     tmdb.newMovies,
  series:  tmdb.series,
  coming:  tmdb.coming,
  top:     tmdb.top,
};

export const useMovies = (type) => {
  const [movies,  setMovies]  = useState([]);
  const [loading, setLoading] = useState(!!type);

  useEffect(() => {
    const fetcher = FETCHERS[type];
    if (!fetcher) return;

    fetcher()
      .then((d) => setMovies((d.results || []).map(toCard)))
      .finally(() => setLoading(false));
  }, [type]);

  return { movies, loading };
};