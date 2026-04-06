import "./Search.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar, Footer } from "../../containers";
import { POPULAR_QUERIES } from "../../constants";
import { tmdb, W500 } from "../../api/tmdb";
import iconSearch from "../../assets/icons/search.svg";

export const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleSearch = async (q) => {
    setQuery(q);
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    const data = await tmdb.search(q);
    setResults(data.results?.filter((r) => r.poster_path) || []);
    setLoading(false);
  };

  const hasQuery = query.trim().length > 0;

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
              onChange={(e) => handleSearch(e.target.value)}
              autoFocus
            />
          </div>

          {!hasQuery && (
            <div className="sp__popular">
              <h3 className="sp__popular-title">Популярные запросы:</h3>
              <div className="sp__popular-grid">
                {POPULAR_QUERIES.map((q, i) => (
                  <span
                    key={i}
                    className="sp__popular-item"
                    onClick={() => handleSearch(q)}
                  >
                    {q}
                  </span>
                ))}
              </div>
            </div>
          )}

          {hasQuery && (
            <div className="sp__results">
              <h3 className="sp__results-title">Результаты поиска:</h3>
              {loading && (
                <div className="sp__skeleton">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="sp__skel" />
                  ))}
                </div>
              )}
              {!loading && results.length > 0 && (
                <div className="sp__grid aladin">
                  {results.map((m) => (
                    <div
                      key={m.id}
                      className="card"
                      onClick={() => nav(`/movie/${m.id}`)}
                    >
                      <div className="card__thumb">
                        <img
                          src={`${W500}${m.poster_path}`}
                          alt={m.title || m.name}
                        />
                      </div>
                      <p className="card__title">{m.title || m.name}</p>
                      <p className="card__sub card__sub--white">
                        {m.media_type === "tv" ? "Сериал" : "Фильм"}
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
