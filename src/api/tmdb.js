const KEY = import.meta.env.VITE_TMDB_KEY;
const BASE = import.meta.env.VITE_TMDB_BASE;
export const IMG = import.meta.env.VITE_IMG;
export const W500 = import.meta.env.VITE_W500;

const get = (path) =>
  fetch(`${BASE}${path}&api_key=${KEY}`).then((r) => r.json());

export const tmdb = {
  popular: () => get("/movie/popular?language=ru-RU"), // mashhur filmlar
  newMovies: () => get("/movie/now_playing?language=ru-RU"), // yangi filmlar
  series: () => get("/tv/popular?language=ru-RU"),
  coming: () => get("/movie/upcoming?language=ru-RU"),  // hali jiqmagan tez orada jiqadigon filmlar 
  top: () => get("/movie/top_rated?language=ru-RU"), //topdegilar
  movie: (id) =>  // bitta kina haqida to'liq malumot
    get(`/movie/${id}?language=ru-RU&append_to_response=credits,videos`),
  tv: (id) => get(`/tv/${id}?language=ru-RU&append_to_response=credits,videos`),// bu ham serial uchun
  search: (q) => 
    get(`/search/multi?language=ru-RU&query=${encodeURIComponent(q)}`),
  person: (id) => get(`/person/${id}/movie_credits?language=ru-RU`),
  discover: (params) => get(`/discover/movie?language=ru-RU&${params}`), // filter qilingan filimlar 
  genres: () => get("/genre/movie/list?language=ru-RU"), // barcha janrlar ro'yhati
  personDetail: (id) => get(`/person/${id}?language=ru-RU`),

};
