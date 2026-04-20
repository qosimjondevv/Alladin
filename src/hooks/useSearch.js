import { useState, useCallback } from "react";
import { tmdb, W500 } from "../api/tmdb";
import { useEscapeBack } from "./useEscapeBack";

export const useSearch = () => {
  useEscapeBack();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = useCallback(async (q) => {
    setQuery(q);
    if (!q.trim()) { setResults([]); return; }

    setLoading(true);
    try {
      const data = await tmdb.search(q);
      setResults(
        (data.results || [])
          .filter((r) => r.poster_path)
          .map((r) => ({
            id: r.id,
            title: r.title || r.name,
            mediaType: r.media_type,
            img: `${W500}${r.poster_path}`,
          }))
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return { query, results, loading, search };
};