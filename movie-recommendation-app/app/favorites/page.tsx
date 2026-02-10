"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SmallCard from "../../components/ui/SmallCard";

interface FavoriteMovie {
  id: string;
  title: string;
  year: string;
  rating?: number;
  posterUrl: string;
  genre?: string;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (e) {
        console.error("Failed to parse favorites:", e);
      }
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const removeFavorite = (id: string) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (isLoading) {
    return (
      <div className="pt-24 px-8 min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading favorites...</div>
      </div>
    );
  }

  return (
    <div className="pt-24 px-8 min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-8">Your Favorites</h1>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <svg
            className="w-24 h-24 text-gray-600 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <p className="text-gray-400 text-xl mb-4">No favorites yet</p>
          <p className="text-gray-500 mb-6">
            Start adding movies to your favorites to see them here
          </p>
          <Link
            href="/"
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {favorites.map((movie) => (
            <div key={movie.id} className="relative group">
              <SmallCard
                id={movie.id}
                title={movie.title}
                year={movie.year}
                rating={movie.rating}
                posterUrl={movie.posterUrl}
                genre={movie.genre}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
