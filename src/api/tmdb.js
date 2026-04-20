const KEY = import.meta.env.VITE_TMDB_KEY;
const BASE = import.meta.env.VITE_TMDB_BASE;
export const IMG = import.meta.env.VITE_IMG;
export const W500 = import.meta.env.VITE_W500;

const get = (path) =>
  fetch(`${BASE}${path}&api_key=${KEY}`).then((r) => r.json());

export const tmdb = {
  popular: () => get("/movie/popular?language=ru-RU"), 
  newMovies: () => get("/movie/now_playing?language=ru-RU"),
  series: () => get("/tv/popular?language=ru-RU"),
  coming: () => get("/movie/upcoming?language=ru-RU"),  
  top: () => get("/movie/top_rated?language=ru-RU"), 
  movie: (id) => 
    get(`/movie/${id}?language=ru-RU&append_to_response=credits,videos`),
  tv: (id) => get(`/tv/${id}?language=ru-RU&append_to_response=credits,videos`),
  search: (q) => 
    get(`/search/multi?language=ru-RU&query=${encodeURIComponent(q)}`),
  person: (id) => get(`/person/${id}/movie_credits?language=ru-RU`),
  discover: (params) => get(`/discover/movie?language=ru-RU&${params}`), 
  genres: () => get("/genre/movie/list?language=ru-RU"),
  personDetail: (id) => get(`/person/${id}?language=ru-RU`),

};
