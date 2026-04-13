import "./Home.scss";
import imgSite from "../../assets/img/asd.png";
import { Sidebar, Footer, Header }                from "../../containers";
import { CardSlider, MovieBanner, ContinueWatching } from "../../components";

export const Home = () => (
  <>
  <div className="home">
    <div className="hero-bg">
      <img src={imgSite} alt="hero" className="hero-img" />
      <div className="hero-vignette" />
    </div>

    <Sidebar />

    <div className="hero-content">
      <Header />
      <div className="container">
        <ContinueWatching />
        <CardSlider title="Новое кино"  type="new" path="/new"     />
        <MovieBanner />
        <CardSlider title="Популярный на Alladdin" type="popular" path="/popular" />
       
        <div className="home__bottom">
           <CardSlider title="Топ фильмы"   type="top"  path="/top"  />
        </div>
      </div>
    </div>
    <Footer />
  </div>
  </>
);