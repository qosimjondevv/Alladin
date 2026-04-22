import "./MovieHero.scss";

export const MovieHero = ({ data, year, countries }) => {
  const director = data.credits?.crew?.find((c) => c.job === "Director");

  return (
    <div className="movie-hero">
      <div className="movie-hero__tags">
        <span className="movie-hero__tag movie-hero__tag--red">Новинка</span>
        <span className="movie-hero__tag movie-hero__tag--white">FULL HD</span>
      </div>
      <h1 className="movie-hero__title">{data.title}</h1>
      <div className="movie-hero__meta">
        <span>⭐ {data.vote_average?.toFixed(1)}</span>
        <span>{year}</span>
        <span>{data.genres?.map((g) => g.name).join(", ")}</span>
      </div>

      <div className="movie-hero__btns">
        <button className="movie-hero__btn movie-hero__btn--watch">
          ▶ Смотреть по подписке
        </button>
        <button className="movie-hero__btn movie-hero__btn--fav">
          + Добавить в избранное
        </button>
      </div>

      <div className="movie-hero__rows">
        <InfoRow label="Год" value={year} />
        <InfoRow label="Страна" value={countries} />
        <InfoRow label="Жанр" value={data.genres?.map((g) => g.name).join(", ")} />
        {director && <InfoRow label="Режиссёр" value={director.name} />}
      </div>
    </div>
  );
};
const InfoRow = ({ label, value }) => (
  <div className="movie-hero__row">
    <span className="movie-hero__lbl">{label}</span>
    <span>{value}</span>
  </div>
);