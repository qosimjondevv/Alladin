import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tmdb } from "../api/tmdb";

export const usePerson = () => {
  const { id } = useParams();
  const [person,  setPerson]  = useState(null);
  const [movies,  setMovies]  = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    Promise.all([
      tmdb.personDetail(id),
      tmdb.person(id),
    ])
      .then(([p, credits]) => {
        setPerson(p);
        setMovies(
          (credits.cast || [])
            .filter((m) => m.poster_path)
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 20)
        );
      })
      .finally(() => setLoading(false));
  }, [id]);

  const ready = !loading && !!person; 

  return { person, movies, loading, ready };
};