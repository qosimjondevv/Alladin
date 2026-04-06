import "./NewMovies.scss";
import { Link } from "react-router-dom";
import { MovieCard } from "../../components";
import { NEW_MOVIES } from "../../constants";

export const NewMovies = () => {
  return (
    <div className="container">
      <section className="new-movies">
        <div className="new-movies__header">
          <h2 className="new-movies__title">Новое кино</h2>
          <Link to="/new" className="new-movies__more">
            ›
          </Link>
        </div>

        <div className="new-movies__list">
          {NEW_MOVIES.map((movie) => (
            <MovieCard
              key={movie.id}
              img={movie.img}
              title={movie.title}
              subtitle={movie.subtitle}
              badge={movie.badge}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
