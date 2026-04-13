import "./CatalogFilterBar.scss";
import { useState, useRef, useEffect } from "react";
import { ListCatalog }   from "../ListCatalog/ListCatalog";
import { COUNTRIES } from "../../constants";

const Select = ({ label, options, value, onSelect }) => {
  const [open, setOpen] = useState(false);
  const [pos,  setPos]  = useState({ top: 0, left: 0 });
  const ref             = useRef(null);

  const handleOpen = () => {
    if (!open && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPos({ top: rect.bottom + 6, left: rect.left });
    }
    setOpen((o) => !o);
  };

  useEffect(() => {
    if (!open) return;

    const onMouseDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };

    const onScroll = () => setOpen(false);

    document.addEventListener("mousedown", onMouseDown);
    window.addEventListener("scroll", onScroll, true); 

    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [open]);

  return (
    <div className="fb-select" ref={ref} onClick={handleOpen}>
      <span className="fb-select__label">{label}</span>
      <span className="fb-select__value">
        {value} <span className="fb-select__arrow">{open ? "▴" : "▾"}</span>
      </span>

      {open && (
        <div
          className="fb-select__dropdown"
          style={{ position: "fixed", top: pos.top, left: pos.left }}
          onClick={(e) => e.stopPropagation()}
        >
          {options.map((o, i) => (
            <div
              key={i}
              className={`fb-select__option ${value === o ? "active" : ""}`}
              onClick={() => { onSelect(o); setOpen(false); }}
            >
              {o}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const CatalogFilterBar = ({
  countries, years, quality, sort, tmdbGenres = [], onFilter,
}) => {
  const [genreOpen, setGenreOpen] = useState(false);
  const [selected,  setSelected]  = useState({
    genre: "Все жанры", country: "Все страны",
    year: "Все годы",   quality: "FULL HD 1080", sort: "По рейтингу",
  });

  useEffect(() => {
    if (!genreOpen) return;
    const onScroll = () => setGenreOpen(false);
    window.addEventListener("scroll", onScroll, true);
    return () => window.removeEventListener("scroll", onScroll, true);
  }, [genreOpen]);

  const apply = (next) => {
    setSelected(next);
    const genre   = tmdbGenres.find((g) => g.name === next.genre)?.id || "";
    const country = COUNTRIES[next.country] || "";
    const year    = next.year === "Все годы" ? "" : next.year;
    onFilter?.({ genre, country, year });
  };

  return (
    <>
      <div className="filter-bar">
        <div className="fb-select" onClick={() => setGenreOpen(true)}>
          <span className="fb-select__label">По жанрам</span>
          <span className="fb-select__value">
            {selected.genre} <span className="fb-select__arrow">▾</span>
          </span>
        </div>

        <Select label="По странам" options={["Все страны", ...countries]}
          value={selected.country} onSelect={(v) => apply({ ...selected, country: v })} />
        <Select label="Год выпуска" options={["Все годы", ...years]}
          value={selected.year} onSelect={(v) => apply({ ...selected, year: v })} />
        <Select label="Качество" options={quality}
          value={selected.quality} onSelect={(v) => apply({ ...selected, quality: v })} />
        <Select label="Сортировка" options={sort}
          value={selected.sort} onSelect={(v) => apply({ ...selected, sort: v })} />
      </div>

      <ListCatalog
        open={genreOpen}
        onClose={() => setGenreOpen(false)}
        selected={selected.genre}
        genres={tmdbGenres.map((g) => g.name)}
        onSelect={(g) => { apply({ ...selected, genre: g }); setGenreOpen(false); }}
      />
    </>
  );
};