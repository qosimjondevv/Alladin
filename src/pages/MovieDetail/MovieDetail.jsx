import "./MovieDetail.scss";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Sidebar, Footer } from "../../containers";
import { ActorCard } from "../../components";
import { CardSlider } from "../../components";
import { tmdb, IMG, W500 } from "../../api/tmdb";
import iconLeft from "../../assets/icons/iconCaruselLeft.svg";
import iconRight from "../../assets/icons/iconCaruselRight.svg";

export const MovieDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const castRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    tmdb
      .movie(id)
      .then((m) => {
        if (m.title) {
          setData(m);
          setLoading(false);
        } else
          return tmdb.tv(id).then((tv) => {
            setData({ ...tv, title: tv.name });
            setLoading(false);
          });
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <>
        <Sidebar />
        <div className="md-spin">Загрузка...</div>
      </>
    );
  if (!data) return null;

  const trailer =
    data.videos?.results?.find(
      (v) => v.type === "Trailer" && v.site === "YouTube",
    ) || data.videos?.results?.[0];
  const cast = data.credits?.cast?.slice(0, 20) || [];
  const director = data.credits?.crew?.find((c) => c.job === "Director");
  const year = (data.release_date || data.first_air_date || "").slice(0, 4);
  const countries = (data.production_countries || [])
    .map((c) => c.name)
    .join(", ");

  const scrollCast = (dir) => {
    castRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <>
      <Sidebar />
      <div className="md">
        <div className="md__back">
          <img src={`${IMG}/original${data.backdrop_path}`} alt={data.title} />
          <div className="md__fade" />
        </div>

        <div className="container">
          <div className="md__hero">
            <div className="md__tags">
              <span className="md__tag md__tag--red">Новинка</span>
              <span className="md__tag md__tag--white">FULL HD</span>
            </div>
            <h1 className="md__title">{data.title}</h1>
            <div className="md__meta">
              <span>⭐ {data.vote_average?.toFixed(1)}</span>
              <span>{year}</span>
              <span>{data.genres?.map((g) => g.name).join(", ")}</span>
            </div>
            <div className="md__btns">
              <button className="md__btn md__btn--watch">
                ▶ Смотреть по подписке
              </button>
              <button className="md__btn md__btn--fav">
                + Добавить в избранное
              </button>
            </div>
            <div className="md__rows">
              <div className="md__row">
                <span className="md__lbl">Год</span>
                <span>{year}</span>
              </div>
              <div className="md__row">
                <span className="md__lbl">Страна</span>
                <span>{countries}</span>
              </div>
              <div className="md__row">
                <span className="md__lbl">Жанр</span>
                <span>{data.genres?.map((g) => g.name).join(", ")}</span>
              </div>
              {director && (
                <div className="md__row">
                  <span className="md__lbl">Режиссёр</span>
                  <span>{director.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="container">
          <div className="md__body">
            <div className="md__desc">
              <h2 className="md__desc-title">Описание</h2>
              <p className="md__desc-text">{data.overview}</p>
            </div>
            {trailer && (
              <div className="md__trailer">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="Trailer"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>

        {cast.length > 0 && (
          <div className="container">
            <div className="md__cast-head">
              <h2 className="md__cast-title">В ролях</h2>
              <div className="md__cast-btns">
                <button onClick={() => scrollCast(-1)}>
                  <img src={iconLeft} alt="prev" />
                </button>
                <button onClick={() => scrollCast(1)}>
                  <img src={iconRight} alt="next" />
                </button>
              </div>
            </div>
            <div className="md__cast" ref={castRef}>
              {cast.map((a) => (
                <ActorCard
                  key={a.id}
                  id={a.id}
                  name={a.name}
                  character={a.character}
                  img={a.profile_path}
                />
              ))}
            </div>
          </div>
        )}

        <div className="container">
          <CardSlider title="Вам понравится" type="popular" path="/popular" />
        </div>
      </div>
      <Footer />
    </>
  );
};
