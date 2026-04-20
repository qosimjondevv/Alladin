import "./Search.scss";
import { POPULAR_QUERIES } from "../../constants";
import { useSearch } from "../../hooks/useSearch";
import iconSearch from "../../assets/icons/search.svg";
import { MovieCard } from "../../components";
import { useNavigate } from "react-router-dom";

export const Search = () => {
  const nav = useNavigate();
  const { query, results, loading, search } = useSearch();
  const hasQuery = query.trim().length > 0;

  return (
    <div className="sp">
      <div className="container">
        <div className="sp__bar">
          <img src={iconSearch} alt="" className="sp__icon" />
          <input
            className="sp__input"
            type="text"
            placeholder="Название фильма"
            value={query}
            onChange={(e) => search(e.target.value)}
            autoFocus
          />
          {query && (
            <button className="sp__clear" onClick={() => search("")}>✕</button>
          )}
        </div>

        {!hasQuery && (
          <div className="sp__popular">
            <h3 className="sp__popular-title">Популярные запросы:</h3>
            <div className="sp__popular-grid">
              {POPULAR_QUERIES.map((q) => (
                <span key={q} className="sp__popular-item" onClick={() => search(q)}>
                  {q}
                </span>
              ))}
            </div>
          </div>
        )}

        {hasQuery && (
          <div className="sp__results">
            <h3 className="sp__results-title">
              {loading ? "Поиск..." : `Найдено: ${results.length}`}
            </h3>

            {loading && (
              <div className="sp__skeleton">
                {Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className="sp__skel" />
                ))}
              </div>
            )}

            {!loading && results.length > 0 && (
              <div className="sp__grid">
                {results.map((m) => (
                  <MovieCard
                    key={m.id}
                    tmdbId={m.id}
                    img={m.img}
                    title={m.title}
                    subtitle={m.mediaType === "tv" ? "Сериал" : "Фильм"}
                  />
                ))}
              </div>
            )}

            {!loading && results.length === 0 && (
              <p className="sp__empty">По вашему запросу ничего не найдено</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};