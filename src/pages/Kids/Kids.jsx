import "./Kids.scss";
import { CardSlider } from "../../components";

export const Kids = () => (
  <div className="kids">
    <div className="kids__hero">
      <h1 className="kids__title">🌟 Детям</h1>
      <p className="kids__subtitle">Безопасный контент для детей</p>
    </div>
    <div className="container">
      <CardSlider title="Мультфильмы" type="popular" path="/kids" />
      <CardSlider title="Детские фильмы" type="new" path="/kids" />
      <div className="kids__bottom">
        <CardSlider title="Сериалы для детей" type="series" path="/kids" />
      </div>
    </div>
  </div>
);