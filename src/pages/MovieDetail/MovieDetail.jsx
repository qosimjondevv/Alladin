import "./MovieDetail.scss";
import { useParams }from "react-router-dom";
import { CardSlider, ActorSlider, MovieHero  } from "../../components";
import { TrailerBlock }from "../../components/TrailerBlock";
import { IMG }from "../../api/tmdb";
import { useMovieDetail } from "../../hooks/useMovieDetail";

export const MovieDetail = () => {
  const { id } = useParams();
  const { data, loading, trailer, cast, year, countries } = useMovieDetail(id);

  return (
    <div className="md">
      {loading && <div className="md-spin">Загрузка...</div>}

      {!loading && data && (
        <>
          <div className="md__back">
            <img src={`${IMG}/original${data.backdrop_path}`} alt={data.title} />
            <div className="md__fade" />
          </div>
          <div className="container">
            <MovieHero data={data} year={year} countries={countries} />
          </div>
          <div className="container">
            <TrailerBlock trailer={trailer} overview={data.overview} />
          </div>
          <div className="container">
            <ActorSlider cast={cast} />
          </div>
          <div className="container">
            <CardSlider title="Вам понравится" type="popular" path="/popular" />
          </div>
        </>
      )}
    </div>
  );
};