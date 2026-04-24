import { createContext, useContext, useState } from "react";

const FavCtx = createContext(null);

const getItems = () => {
  try {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  } catch { return []; }
};
    
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(getItems);

  const toggle = (movie) => {
    setFavorites((prev) => {
      const exists = prev.find((m) => m.id === movie.id);
      const updated = exists
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie];
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (id) => favorites.some((m) => m.id === id);

  return (
    <FavCtx.Provider value={{ favorites, toggle, isFavorite }}>
      {children}
    </FavCtx.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavCtx);
  if (!ctx) throw new Error("useFavorites must be inside FavoritesProvider");
  return ctx;
};