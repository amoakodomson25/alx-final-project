import { TMDB_API_KEY, TMDB_BASE_URL, getImageUrl } from "./tmdb";

// TMDB API Response Types
export interface TMDBMovie {
  id: number;
  title: string;
  name?: string; // For TV shows
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  genre_ids: number[];
  adult?: boolean;
  media_type?: string;
}

export interface TMDBMovieDetails extends TMDBMovie {
  genres: { id: number; name: string }[];
  runtime?: number;
  tagline?: string;
  credits?: {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }[];
  };
  videos?: {
    results: {
      id: string;
      key: string;
      type: string;
      site: string;
    }[];
  };
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

// Genre mapping
export const GENRE_MAP: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

// Helper to get year from date string
export const getYear = (dateString?: string) => {
  if (!dateString) return "N/A";
  return dateString.split("-")[0];
};

// Transform TMDB movie to app movie format
export const transformMovie = (movie: TMDBMovie) => ({
  id: String(movie.id),
  title: movie.title || movie.name || "Unknown Title",
  year: getYear(movie.release_date || movie.first_air_date),
  rating: movie.vote_average,
  posterUrl: getImageUrl(movie.poster_path),
  backdropUrl: getImageUrl(movie.backdrop_path, "w780"),
  description: movie.overview || "No description available.",
  genres: movie.genre_ids.map((id) => GENRE_MAP[id] || "Unknown"),
});

// API functions
export const fetchTrendingMovies = async (): Promise<ReturnType<typeof transformMovie>[]> => {
  const response = await fetch(`${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`);
  const data: TMDBResponse<TMDBMovie> = await response.json();
  return data.results.map(transformMovie);
};

export const fetchPopularMovies = async (page = 1): Promise<ReturnType<typeof transformMovie>[]> => {
  const response = await fetch(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`);
  const data: TMDBResponse<TMDBMovie> = await response.json();
  return data.results.map(transformMovie);
};

export const fetchTopRatedMovies = async (page = 1): Promise<ReturnType<typeof transformMovie>[]> => {
  const response = await fetch(`${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&page=${page}`);
  const data: TMDBResponse<TMDBMovie> = await response.json();
  return data.results.map(transformMovie);
};

export const fetchUpcomingMovies = async (page = 1): Promise<ReturnType<typeof transformMovie>[]> => {
  const response = await fetch(`${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&page=${page}`);
  const data: TMDBResponse<TMDBMovie> = await response.json();
  return data.results.map(transformMovie);
};

export const fetchNowPlayingMovies = async (page = 1): Promise<ReturnType<typeof transformMovie>[]> => {
  const response = await fetch(`${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&page=${page}`);
  const data: TMDBResponse<TMDBMovie> = await response.json();
  return data.results.map(transformMovie);
};

export const fetchMovieById = async (id: string): Promise<{ id: string; title: string; year: string; rating: number; posterUrl: string; backdropUrl: string; description: string; genres: string[]; cast?: { name: string; role: string; image: string }[]; trailerUrl?: string }> => {
  const response = await fetch(`${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos`);
  const movie: TMDBMovieDetails = await response.json();

  const transformedMovie: { id: string; title: string; year: string; rating: number; posterUrl: string; backdropUrl: string; description: string; genres: string[]; cast?: { name: string; role: string; image: string }[]; trailerUrl?: string } = {
    id: String(movie.id),
    title: movie.title || movie.name || "Unknown Title",
    year: getYear(movie.release_date || movie.first_air_date),
    rating: movie.vote_average,
    posterUrl: getImageUrl(movie.poster_path),
    backdropUrl: getImageUrl(movie.backdrop_path, "w780"),
    description: movie.overview || "No description available.",
    genres: movie.genres?.map((g) => g.name) || movie.genre_ids.map((id) => GENRE_MAP[id] || "Unknown"),
  };

  // Extract trailer URL from videos
  if (movie.videos?.results) {
    const trailer = movie.videos.results.find((v) => v.type === "Trailer" && v.site === "YouTube");
    if (trailer) {
      transformedMovie.trailerUrl = `https://www.youtube.com/embed/${trailer.key}?autoplay=1`;
    }
  }

  if (movie.credits?.cast) {
    transformedMovie.cast = movie.credits.cast.slice(0, 5).map((member) => ({
      name: member.name,
      role: member.character,
      image: getImageUrl(member.profile_path, "w200"),
    }));
  }

  return transformedMovie;
};

export const searchMovies = async (query: string, page = 1): Promise<ReturnType<typeof transformMovie>[]> => {
  const response = await fetch(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`);
  const data: TMDBResponse<TMDBMovie> = await response.json();
  return data.results.map(transformMovie);
};

export const discoverMovies = async (params: {
  genreId?: number;
  year?: number;
  sortBy?: string;
  page?: number;
}): Promise<ReturnType<typeof transformMovie>[]> => {
  const queryParams = new URLSearchParams({
    api_key: TMDB_API_KEY,
    ...(params.genreId && { with_genres: String(params.genreId) }),
    ...(params.year && { primary_release_year: String(params.year) }),
    ...(params.sortBy && { sort_by: params.sortBy }),
    ...(params.page && { page: String(params.page) }),
  });

  const response = await fetch(`${TMDB_BASE_URL}/discover/movie?${queryParams}`);
  const data: TMDBResponse<TMDBMovie> = await response.json();
  return data.results.map(transformMovie);
};
