"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { MovieData } from "@/types";

interface MovieActionsProps {
  movie: MovieData;
}

export default function MovieActions({ movie }: MovieActionsProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    // Check if movie is already in favorites
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      try {
        const favorites = JSON.parse(storedFavorites);
        const isFav = favorites.some((fav: { id: string }) => fav.id === movie.id);
        setIsFavorite(isFav);
      } catch (e) {
        console.error("Failed to parse favorites:", e);
      }
    }
    setIsLoading(false);
  }, [movie.id]);

  const toggleFavorite = () => {
    const storedFavorites = localStorage.getItem("favorites");
    let favorites: { id: string; title: string; year: string; rating?: number; posterUrl: string; genre?: string }[] = [];
    
    if (storedFavorites) {
      try {
        favorites = JSON.parse(storedFavorites);
      } catch (e) {
        console.error("Failed to parse favorites:", e);
      }
    }

    if (isFavorite) {
      // Remove from favorites
      favorites = favorites.filter((fav) => fav.id !== movie.id);
    } else {
      // Add to favorites
      favorites.push({
        id: movie.id,
        title: movie.title,
        year: movie.year,
        rating: movie.rating,
        posterUrl: movie.posterUrl,
        genre: movie.genres[0],
      });
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  const openTrailer = () => {
    if (movie.trailerUrl) {
      setShowTrailer(true);
    } else {
      // Fallback: search for trailer on YouTube
      window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + " trailer")}`, "_blank");
    }
  };

  const closeTrailer = () => {
    setShowTrailer(false);
  };

  const shareMovie = async () => {
    const shareData = {
      title: movie.title,
      text: `Check out ${movie.title} (${movie.year})`,
      url: window.location.href,
    };

    // Try Web Share API first (works on mobile)
    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // User cancelled or share failed, fall back to clipboard
      }
    }

    // Fallback: Copy to clipboard
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert("Link copied to clipboard!");
    }).catch(() => {
      // If clipboard fails, show the URL
      prompt("Copy this link:", window.location.href);
    });
  };

  if (isLoading) {
    return (
      <div className="bg-gray-900 rounded-xl p-6 space-y-4">
        <div className="w-full bg-gray-800 animate-pulse h-12 rounded-lg"></div>
        <div className="w-full bg-gray-800 animate-pulse h-12 rounded-lg"></div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-900 rounded-xl p-6 space-y-4">
        <button
          onClick={openTrailer}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Watch Trailer
        </button>
        <button
          onClick={toggleFavorite}
          className={`w-full ${
            isFavorite
              ? "bg-red-600 hover:bg-red-700"
              : "bg-gray-800 hover:bg-gray-700"
          } text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2`}
        >
          <svg
            className={`w-5 h-5 ${isFavorite ? "fill-current" : "fill-none"}`}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
        <button
          onClick={shareMovie}
          className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share
        </button>
      </div>

      {/* Trailer Modal */}
      {showTrailer && movie.trailerUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={closeTrailer}>
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeTrailer}
              className="absolute top-4 right-4 z-10 text-white hover:text-red-500 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <iframe
              src={movie.trailerUrl}
              title="Movie Trailer"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
