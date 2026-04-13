import "./Collection.scss";
import { useState, useEffect } from "react";
import { Sidebar, Footer } from "../../containers";
import { MovieCard } from "../../components";
import { tmdb, W500 } from "../../api/tmdb";

export const Collection = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    tmdb
      .series()
      .then((d) => {
        console.log("series data:", d);
        setSeries(
          (d.results || []).map((m) => ({
            id: m.id,
            tmdbId: m.id,
            title: m.name,
            subtitle: "Подписка",
            badge: null,
            img: m.poster_path ? `${W500}${m.poster_path}` : null,
          })),
        );
      })
      .catch((err) => console.error("ERROR:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Sidebar />
      <div className="collection">
        <div className="container">
          <h1 className="collection__title">Подборки</h1>
          {loading ? (
            <div className="collection__skeleton">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="collection__skel" />
              ))}
            </div>
          ) : (
            <div className="collection__grid">
              {series.map((m) => (
                <MovieCard
                  key={m.id}
                  img={m.img}
                  title={m.title}
                  subtitle={m.subtitle}
                  tmdbId={m.tmdbId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
