"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FavoriteMovie } from "@/types";

export default function Card({ id, title, year, rating, posterUrl, genre }: FavoriteMovie) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if this movie is in favorites
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      try {
        const favorites = JSON.parse(storedFavorites);
        const isFav = favorites.some((movie: FavoriteMovie) => movie.id === id);
        const timer = setTimeout(() => {
          setIsFavorite(isFav);
        }, 50);
        return () => clearTimeout(timer);
      } catch (e) {
        console.error("Failed to parse favorites:", e);
      }
    }
  }, [id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const storedFavorites = localStorage.getItem("favorites");
    let favorites: FavoriteMovie[] = storedFavorites ? JSON.parse(storedFavorites) : [];

    if (isFavorite) {
      // Remove from favorites
      favorites = favorites.filter((movie) => movie.id !== id);
    } else {
      // Add to favorites
      favorites.push({ id, title, year, rating, posterUrl, genre });
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <Link href={`/movie/${id}`}>
      <div
        className="group relative w-48 bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-800"
      >
        {/* Poster Image - Full Width */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={posterUrl || "/placeholder-movie.png"}
            alt={title}
            fill={true}
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Favorite Button */}
          <button
            onClick={toggleFavorite}
            className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-300 ${
              isFavorite
                ? "text-red-500 bg-red-500/20 backdrop-blur-sm scale-110"
                : "text-white/70 hover:text-red-400 hover:bg-gray-900/50 backdrop-blur-sm opacity-0 group-hover:opacity-100"
            }`}
          >
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${isFavorite ? "scale-110" : ""}`}
              fill={isFavorite ? "currentColor" : "none"}
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
          </button>

          {/* Rating Badge */}
          {rating && (
            <div className="absolute top-2 left-2 bg-yellow-500 text-gray-900 font-bold px-2 py-0.5 rounded-lg flex items-center gap-1">
              <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <span className="text-xs">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="text-white font-semibold text-sm truncate group-hover:text-red-400 transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-gray-400 text-xs">{year}</span>
            {genre && (
              <>
                <span className="text-gray-600">•</span>
                <span className="text-gray-400 text-xs">{genre}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
