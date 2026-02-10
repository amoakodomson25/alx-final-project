// TMDB API Configuration
// Get your API key from https://www.themoviedb.org/settings/api

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export const getImageUrl = (path: string | null, size: "w200" | "w300" | "w400" | "w500" | "w780" | "original" = "w500") => {
  if (!path) return "/placeholder-movie.png";
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export { TMDB_API_KEY, TMDB_BASE_URL };
