// Movie-related types

export interface CastMember {
  name: string;
  role: string;
  image: string;
}

export interface MovieData {
  id: string;
  title: string;
  year: string;
  rating: number;
  backdropUrl: string;
  posterUrl: string;
  description: string;
  genres: string[];
  cast?: CastMember[];
  trailerUrl?: string;
}

export interface FavoriteMovie {
  id: string;
  title: string;
  year: string;
  rating?: number;
  posterUrl: string;
  genre?: string;
}

export interface MoviePageParams {
  params: Promise<{ id: string }>;
}

export interface MovieCardProps {
  id: string;
  title: string;
  year: string;
  rating: number;
  posterUrl: string;
  description: string;
  genres: string[];
}

// Re-export commonly used types
export type { CastMember as default };
