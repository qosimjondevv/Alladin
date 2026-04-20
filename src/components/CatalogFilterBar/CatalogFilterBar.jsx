import "./CatalogFilterBar.scss";
import { useState } from "react";
import { ListCatalog } from "../ListCatalog";
import { Select } from "../Select/Select";
import { COUNTRIES } from "../../constants";
import { useGenreDrawer } from "../../hooks/useGenreDrawer";

export const CatalogFilterBar = ({
  countries, years, quality, sort, tmdbGenres = [], onFilter,
}) => {
  const { genreOpen, setGenreOpen } = useGenreDrawer();
  const [selected, setSelected] = useState({
    genre:   "Все жанры",
    country: "Все страны",
    year:    "Все годы",
    quality: "FULL HD 1080",
    sort:    "По рейтингу",
  });

  const apply = (next) => {
    setSelected(next);    // 1. UI state yangilash
    onFilter?.({          // 2. Parent ga filter yuborish
      genre:   tmdbGenres.find((g) => g.name === next.genre)?.id || "",
      country: COUNTRIES[next.country] || "",
      year:    next.year === "Все годы" ? "" : next.year,
    });
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

        <Select label="По странам"  options={["Все страны", ...countries]}
          value={selected.country} onSelect={(v) => apply({ ...selected, country: v })} />
        <Select label="Год выпуска" options={["Все годы", ...years]}
          value={selected.year}    onSelect={(v) => apply({ ...selected, year: v })} />
        <Select label="Качество"    options={quality}
          value={selected.quality} onSelect={(v) => apply({ ...selected, quality: v })} />
        <Select label="Сортировка"  options={sort}
          value={selected.sort}    onSelect={(v) => apply({ ...selected, sort: v })} />
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