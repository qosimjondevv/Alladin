import "./Search.scss";
import { useNavigate }     from "react-router-dom";
import { useEffect }       from "react";
import { Sidebar, Footer } from "../../containers";
import { POPULAR_QUERIES } from "../../constants";
import { useSearch }       from "../../hooks/useSearch";
import iconSearch          from "../../assets/icons/search.svg";

export const Search = () => {
  const nav = useNavigate();
  const { query, results, loading, search } = useSearch();
  const hasQuery = query.trim().length > 0;

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") nav(-1); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nav]);

  return (
    <>
      <Sidebar />
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
                {POPULAR_QUERIES.map((q, i) => (
                  <span key={i} className="sp__popular-item" onClick={() => search(q)}>
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
                  {[...Array(6)].map((_, i) => <div key={i} className="sp__skel" />)}
                </div>
              )}

              {!loading && results.length > 0 && (
                <div className="sp__grid">
                  {results.map((m) => (
                    <div key={m.id} className="card" onClick={() => nav(`/movie/${m.id}`)}>
                      <div className="card__thumb">
                        <img src={m.img} alt={m.title} />
                      </div>
                      <p className="card__title">{m.title}</p>
                      <p className="card__sub card__sub--white">
                        {m.mediaType === "tv" ? "Сериал" : "Фильм"}
                      </p>
                    </div>
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
      <Footer />
    </>
  );
};