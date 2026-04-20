import { useState, useEffect } from "react";
import { tmdb } from "../api/tmdb";
import { toCard } from "../utils/toCard";

export const useCatalog = () => {
  const [movies,     setMovies]     = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading,    setLoading]    = useState(true);
  const [page,       setPage]       = useState(1);
  const [filters,    setFilters]    = useState({ genre: "", year: "", country: "" });
  const [tmdbGenres, setTmdbGenres] = useState([]);

  useEffect(() => {
    tmdb.genres().then((d) => setTmdbGenres(d.genres || []));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.genre)   params.append("with_genres",          filters.genre);
    if (filters.year)    params.append("primary_release_year", filters.year);
    if (filters.country) params.append("with_origin_country",  filters.country);
    params.append("page", page);

    tmdb.discover(params.toString()).then((d) => {
      setMovies((d.results || []).map(toCard));
      setTotalPages(Math.min(d.total_pages || 1, 100));
      setLoading(false);
    });
  }, [filters, page]);

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return { movies, loading, totalPages, page, setPage, handleFilter, tmdbGenres };
};