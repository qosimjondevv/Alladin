import "./Collection.scss";
import { MovieCard } from "../../components";
import { useMovies } from "../../hooks/useMovies";

export const Collection = () => {
  const { movies, loading } = useMovies("series");

  return (
    <div className="collection">
      <div className="container">
        <h1 className="collection__title">Подборки</h1>

        {loading ? (
          <div className="collection__skeleton">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="collection__skel" />
            ))}
          </div>
        ) : (
          <div className="collection__grid">
            {movies.map((m) => (
              <MovieCard key={m.id} {...m} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};