import "./MyMovie.scss";
import { MovieCard } from "../../components";
import { useFavorites } from "../../utils/FavoritesProvider";

export const MyMovie = () => {
  const { favorites } = useFavorites();

  return (
    <div className="mymovie">
      <div className="container">
        {favorites.length > 0 ? (
          <>
            <h2 className="mymovie__title">Избранное</h2>
            <div className="mymovie__grid">
              {favorites.map((m) => (
                <MovieCard key={m.id} {...m} tmdbId={m.id} />
              ))}
            </div>
          </>
        ) : (
          <p className="mymovie__empty">Избранных фильмов нет</p>
        )}
      </div>
    </div>
  );
};