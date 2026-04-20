import { W500 } from "../api/tmdb";

export const toCard = (m) => ({
  id: m.id,
  tmdbId: m.id,
  title: m.title || m.name,
  subtitle: "Подписка",
  img: m.poster_path ? `${W500}${m.poster_path}` : null,
});