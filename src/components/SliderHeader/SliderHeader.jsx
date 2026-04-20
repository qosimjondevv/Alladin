import "./SliderHeader.scss";
import { Link } from "react-router-dom";

export const SliderHeader = ({ title, path = "#", canPrev, canNext, onPrev, onNext }) => (
  <div className="sl-head">
    <h2 className="sl-head__title">{title}</h2>
    <Link to={path} className="sl-head__more">›</Link>
    <div className="sl-head__btns">
      <button className={`sl-head__btn ${!canPrev ? "disabled" : ""}`} onClick={onPrev}>‹</button>
      <button className={`sl-head__btn ${!canNext ? "disabled" : ""}`} onClick={onNext}>›</button>
    </div>
  </div>
);