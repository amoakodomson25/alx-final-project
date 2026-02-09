"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface SmallCardProps {
  id: string;
  title: string;
  year: string;
  posterUrl: string;
}

export default function SmallCard({ id, title, year, posterUrl }: SmallCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="flex items-center gap-3 p-2 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors w-64">
      {/* Poster Image */}
      <Link href={`/movie/${id}`} className="flex-shrink-0">
        <div className="relative w-16 h-24 rounded overflow-hidden">
          <Image
            src={posterUrl || "/placeholder-movie.png"}
            alt={title}
            fill={true}
            className="object-cover"
          />
        </div>
      </Link>

      {/* Details */}
      <Link href={`/movie/${id}`} className="flex-1 min-w-0">
        <h3 className="text-white font-medium text-sm truncate">{title}</h3>
        <span className="text-gray-400 text-xs">{year}</span>
      </Link>

      {/* Favorite Button */}
      <button
        onClick={handleFavorite}
        className={`flex-shrink-0 p-2 rounded-lg transition-colors ${
          isFavorite
            ? "text-red-500 bg-red-500/10"
            : "text-gray-400 hover:text-red-500 hover:bg-gray-800"
        }`}
      >
        <svg
          className="w-5 h-5"
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
    </div>
  );
}
