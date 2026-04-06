import "./CatalogFilterBar.scss";
import { useState } from "react";
import { ListCatalog } from "../ListCatalog/ListCatalog";

const COUNTRY_CODES = {
  "Россия 🇷🇺": "RU",
  "США 🇺🇸": "US",
  "Франция 🇫🇷": "FR",
  "Корея 🇰🇷": "KR",
};

const Select = ({ label, options, value, onSelect }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="fb-select" onClick={() => setOpen(!open)}>
      <span className="fb-select__label">{label}</span>
      <span className="fb-select__value">
        {value} <span className="fb-select__arrow">▾</span>
      </span>
      {open && (
        <div className="fb-select__dropdown">
          {options.map((o, i) => (
            <div
              key={i}
              className={`fb-select__option ${value === o ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(o);
                setOpen(false);
              }}
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
  countries,
  years,
  quality,
  sort,
  tmdbGenres = [],
  onFilter,
}) => {
  const [genreOpen, setGenreOpen] = useState(false);
  const [selected, setSelected] = useState({
    genre: "Все жанры",
    country: "Все страны",
    year: "Все годы",
    quality: "FULL HD 1080",
    sort: "По рейтингу",
  });

  const apply = (newSelected) => {
    setSelected(newSelected);
    const genre =
      tmdbGenres.find((g) => g.name === newSelected.genre)?.id || "";
    const country = COUNTRY_CODES[newSelected.country] || "";
    const year = newSelected.year === "Все годы" ? "" : newSelected.year;
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

        <Select
          label="По странам"
          options={["Все страны", ...countries]}
          value={selected.country}
          onSelect={(v) => apply({ ...selected, country: v })}
        />
        <Select
          label="Год выпуска"
          options={["Все годы", ...years]}
          value={selected.year}
          onSelect={(v) => apply({ ...selected, year: v })}
        />
        <Select
          label="Качество видео"
          options={quality}
          value={selected.quality}
          onSelect={(v) => apply({ ...selected, quality: v })}
        />
        <Select
          label="Сортировка"
          options={sort}
          value={selected.sort}
          onSelect={(v) => apply({ ...selected, sort: v })}
        />
      </div>

      <ListCatalog
        open={genreOpen}
        onClose={() => setGenreOpen(false)}
        selected={selected.genre}
        genres={tmdbGenres.map((g) => g.name)}
        onSelect={(g) => {
          apply({ ...selected, genre: g });
          setGenreOpen(false);
        }}
      />
    </>
  );
};
