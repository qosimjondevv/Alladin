import "./Catalog.scss";
import { Sidebar, Footer }                         from "../../containers";
import { MovieCard, CatalogFilterBar, Pagination } from "../../components";
import { COUNTRIES, YEARS, QUALITY, SORT }         from "../../constants";
import { useCatalog }                              from "../../hooks/useCatalog";

export const Catalog = () => {
  const {
    movies, loading, totalPages,
    page, setPage, handleFilter, tmdbGenres,
  } = useCatalog();

  const onPageChange = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
            onFilter={handleFilter}
          />

          {loading ? (
            <div className="catalog__skeleton">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="catalog__skel" />
              ))}
            </div>
          ) : (
            <div className="catalog__grid">
              {movies.map((m) => (
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
              onChange={onPageChange}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};