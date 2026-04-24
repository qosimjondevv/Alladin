import "./Home.scss";
import { Header } from "../../containers";
import { CardSlider, MovieBanner, ContinueWatching } from "../../components";
import { useMovies } from "../../hooks/useMovies";

export const Home = () => {
  const { movies } = useMovies("top");
  const bannerMovie = movies[0] || null;

  return (
    <div className="home">
      <Header />
      <div className="container">
        <ContinueWatching />
        <CardSlider title="Новое кино" type="new" path="/new" />
        <MovieBanner movie={bannerMovie} />
        <CardSlider title="Популярный на Alladdin" type="popular" path="/popular" />
        <div className="home__bottom">
          <CardSlider title="Топ фильмы" type="top" path="/top" />
        </div>
      </div>
    </div>
  );
};