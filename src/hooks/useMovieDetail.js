import { useEffect, useState } from "react";
import { tmdb } from "../api/tmdb";

export const useMovieDetail = (id) => {
  const [data,setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setData(null);

    tmdb
      .movie(id)  
      .then((m) => {
        if (m?.id && (m?.title || m?.name)) {
          setData(m);
        } else {
          return tmdb.tv(id).then((tv) => {    
            if (tv?.id) setData({ ...tv, title: tv.name });
          });
        }
      })
      .catch(() =>
        tmdb.tv(id).then((tv) => {
          if (tv?.id) setData({ ...tv, title: tv.name });
        })
      )
      .finally(() => setLoading(false));
  }, [id]);

  const trailer =
    data?.videos?.results?.find(
      (v) => v.type === "Trailer" && v.site === "YouTube"
    ) || data?.videos?.results?.[0];

  const cast = data?.credits?.cast?.slice(0, 20) ?? [];
  const director  = data?.credits?.crew?.find((c) => c.job === "Director") ?? null;
  const year = (data?.release_date || data?.first_air_date || "").slice(0, 4);
  const countries = (data?.production_countries || []).map((c) => c.name).join(", ");

  return { data, loading, trailer, cast, director, year, countries };
};