import "./TrailerBlock.scss";

export const TrailerBlock = ({ trailer, overview }) => (
  <div className="trailer-block">
    <div className="trailer-block__desc">
      <h2 className="trailer-block__title">Описание</h2>
      <p className="trailer-block__text">{overview}</p>
    </div>

    {trailer && (
      <div className="trailer-block__video">
        <iframe
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title="Trailer"
          allowFullScreen
        />
      </div>
    )}
  </div>
);