import "./Mymovie.scss";
import { Footer, Sidebar } from "../../containers";
import { CardSlider, ContinueWatching } from "../../components";

export const MyMovie = () => (
  <>
    <Sidebar />
    <div className="mymovie">
      <div className="container">
        <ContinueWatching />
        <CardSlider title="Избранное" type="popular" path="/popular" />
        <div className="aladin">
          <CardSlider title="Сериалы" type="series" path="/series" />
        </div>
      </div>
      <Footer />
    </div>
  </>
);
