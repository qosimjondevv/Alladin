import { useState, useCallback, useEffect, useRef } from "react";
import { tmdb, W500 } from "../api/tmdb";
import { useEscapeBack } from "./useEscapeBack";

export const useSearch = () => {
  useEscapeBack();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef(null); // debounce timer

  const fetchResults = useCallback(async (q) => {
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

  const search = useCallback((q) => {
    setQuery(q);                        
    clearTimeout(timerRef.current);    
    timerRef.current = setTimeout(() => { 
      fetchResults(q);                  
    }, 400);
  }, [fetchResults]);

  useEffect(() => {
    return () => clearTimeout(timerRef.current); 
  }, []);

  return { query, results, loading, search };
};