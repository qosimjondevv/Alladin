import "./Person.scss";
import { MovieCard } from "../../components";
import { W500 } from "../../api/tmdb";
import { usePerson } from "../../hooks/usePerson";

export const Person = () => {
  const { person, movies, ready } = usePerson();

  return (
    <div className="person">
      {!ready ? (
        <div className="person-spin">Загрузка...</div>
      ) : (
        <div className="container">
          <div className="person__hero">
            <div className="person__photo">
              {person.profile_path
                ? <img src={`${W500}${person.profile_path}`} alt={person.name} />
                : <div className="person__photo-placeholder" />
              }
            </div>
            <div className="person__info">
              <h1 className="person__name">{person.name}</h1>
              <p className={`person__bio ${!person.biography ? "person__bio--empty" : ""}`}>
                {person.biography || "Биография не указана."}
              </p>
            </div>
          </div>

          {movies.length > 0 && (
            <>
              <h2 className="person__section-title">Фильмы</h2>
              <div className="person__grid">
                {movies.map((m) => (
                  <MovieCard key={m.id} tmdbId={m.id}
                    img={`${W500}${m.poster_path}`}
                    title={m.title} subtitle="Подписка" />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};