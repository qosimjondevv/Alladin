import "./MovieDetail.scss";
import { useParams }       from "react-router-dom";
import { Sidebar, Footer } from "../../containers";
import { CardSlider, ActorSlider } from "../../components";
import { MovieHero }       from "../../components/MovieHero/MovieHero";
import { TrailerBlock }    from "../../components/TrailerBlock/TrailerBlock";
import { IMG }             from "../../api/tmdb";
import { useMovieDetail }  from "../../hooks/useMovieDetail";

export const MovieDetail = () => {
  const { id } = useParams();
  const { data, loading, trailer, cast, year, countries } = useMovieDetail(id);

  if (loading)
    return (<><Sidebar /><div className="md-spin">Загрузка...</div></>);

  if (!data) return null;

  return (
    <>
      <Sidebar />
      <div className="md">
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
      </div>
      <Footer />
    </>
  );
};