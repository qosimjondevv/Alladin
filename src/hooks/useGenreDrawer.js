import { useState, useEffect } from "react";

export const useGenreDrawer = () => {
  const [genreOpen, setGenreOpen] = useState(false);

  useEffect(() => {
    if (!genreOpen) return;
    const onScroll = () => setGenreOpen(false);
    window.addEventListener("scroll", onScroll, true);
    return () => window.removeEventListener("scroll", onScroll, true);
  }, [genreOpen]);

  return { genreOpen, setGenreOpen };
};