export const PORT = process.env.PORT || 3000;
export const API_KEY = process.env.API_KEY;
export const REDIS_CACHE_KEY = "views";

export const baseURL = "https://api.themoviedb.org/3/tv";
export const queryString = `api_key=${API_KEY}&language=en-US`;
