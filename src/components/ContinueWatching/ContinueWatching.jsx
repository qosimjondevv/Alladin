import "./ContinueWatching.scss";
import { useNavigate }from "react-router-dom";
import { useContinueWatching }from "../../hooks/useContinueWatching";

export const ContinueWatching = () => {
  const nav = useNavigate();
  const { movies, loading, active, listRef, handleScroll, scrollTo } = useContinueWatching();

  return (
    <section className="cw">
      <div className="cw__head">
        <h2 className="cw__title">Продолжать смотреть</h2>
      </div>

      <div className="cw__list" ref={listRef} onScroll={handleScroll}>
        {loading
          ? Array.from({ length: 3 }, (_, i) => <div key={`sk-${i}`} className="cw__skel" />)
          : movies.map((m) => (
              <div key={m.id} className="cw__card" onClick={() => nav(`/movie/${m.tmdbId}`)}>
                <div className="cw__thumb">
                  <img src={m.img} alt={m.title} />
                  <div className="cw__overlay"><div className="cw__play">▶</div></div>
                </div>
                <p className="cw__name">{m.title}</p>
                <div className="cw__bar">
                  <div className="cw__fill" style={{ width: `${m.progress}%` }} />
                </div>
              </div>
            ))}
      </div>

      {!loading && (
        <div className="cw__dots">
          {movies.map((_, i) => (
            <span
              key={`dot-${i}`}
              className={`cw__dot ${i === active ? "cw__dot--active" : ""}`}
              onClick={() => scrollTo(i)}
            />
          ))}
        </div>
      )}
    </section>
  );
};