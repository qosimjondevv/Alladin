import "./Catalog.scss";
import { useState, useEffect } from "react";
import { Sidebar, Footer } from "../../containers";
import { MovieCard, CatalogFilterBar, Pagination } from "../../components";
import { COUNTRIES, YEARS, QUALITY, SORT, GENRES } from "../../constants";
import { tmdb, W500 } from "../../api/tmdb";

const PER_PAGE = 12;

export const Catalog = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    genre: "",
    year: "",
    country: "",
  });
  const [tmdbGenres, setTmdbGenres] = useState([]);

  // Janrlar ro'yxatini olish
  useEffect(() => {
    tmdb.genres().then((d) => setTmdbGenres(d.genres || []));
  }, []);

  // Filterlar o'zgarganda yangi so'rov
  useEffect(() => {
    setLoading(true);
    setPage(1);
    const params = new URLSearchParams();
    if (filters.genre) params.append("with_genres", filters.genre);
    if (filters.year) params.append("primary_release_year", filters.year);
    if (filters.country) params.append("with_origin_country", filters.country);

    tmdb.discover(params.toString()).then((d) => {
      setMovies(
        (d.results || []).map((m) => ({
          id: m.id,
          tmdbId: m.id,
          title: m.title || m.name,
          subtitle: "Подписка",
          badge: null,
          img: m.poster_path ? `${W500}${m.poster_path}` : null,
        })),
      );
      setLoading(false);
    });
  }, [filters]);

  const totalPages = Math.ceil(movies.length / PER_PAGE);
  const visible = movies.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <Sidebar />
      <div className="catalog">
        <div className="container">
          <h1 className="catalog__title">Каталог</h1>
          <CatalogFilterBar
            countries={COUNTRIES}
            years={YEARS}
            quality={QUALITY}
            sort={SORT}
            tmdbGenres={tmdbGenres}
            onFilter={setFilters}
          />
          {loading ? (
            <div className="catalog__skeleton">
              {[...Array(PER_PAGE)].map((_, i) => (
                <div key={i} className="catalog__skel" />
              ))}
            </div>
          ) : (
            <div className="catalog__grid">
              {visible.map((m) => (
                <MovieCard
                  key={m.id}
                  img={m.img}
                  title={m.title}
                  subtitle={m.subtitle}
                  badge={m.badge}
                  tmdbId={m.tmdbId}
                />
              ))}
            </div>
          )}
          {!loading && totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={(p) => {
                setPage(p);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
