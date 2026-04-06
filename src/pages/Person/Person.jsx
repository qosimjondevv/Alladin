import "./Person.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Sidebar, Footer } from "../../containers";
import { MovieCard } from "../../components";
import { tmdb, W500, IMG } from "../../api/tmdb";

export const Person = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(
        `${import.meta.env.VITE_TMDB_BASE}/person/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=ru-RU`,
      ).then((r) => r.json()),
      tmdb.person(id),
    ]).then(([p, credits]) => {
      setPerson(p);
      setMovies(
        (credits.cast || [])
          .filter((m) => m.poster_path)
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 20),
      );
      setLoading(false);
    });
  }, [id]);

  if (loading)
    return (
      <>
        <Sidebar />
        <div className="person-spin">Загрузка...</div>
      </>
    );
  if (!person) return null;

  return (
    <>
      <Sidebar />
      <div className="person">
        <div className="container">
          <div className="person__hero">
            <div className="person__photo">
              <img
                src={person.profile_path ? `${W500}${person.profile_path}` : ""}
                alt={person.name}
              />
            </div>
            <div className="person__info">
              <h1 className="person__name">{person.name}</h1>
              <p className="person__bio">{person.biography}</p>
            </div>
          </div>

          <h2 className="person__section-title">Фильмы</h2>
          <div className="person__grid">
            {movies.map((m) => (
              <MovieCard
                key={m.id}
                tmdbId={m.id}
                img={`${W500}${m.poster_path}`}
                title={m.title}
                subtitle="Подписка"
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
