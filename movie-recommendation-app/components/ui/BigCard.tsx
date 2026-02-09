import Link from "next/link";
import Image from "next/image";

interface MovieCardProps {
  id: string;
  title: string;
  year: string;
  rating: number;
  posterUrl: string;
  description: string;
  genres: string[];
}

export default function CardOne({
  id,
  title,
  year,
  rating,
  posterUrl,
  description,
  genres,
}: MovieCardProps) {
  return (
    <Link href={`/movie/${id}`}>
      <div className="group relative w-72 bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
        {/* Poster Image */}
        <div className="relative h-96 overflow-hidden">
          <Image
            src={posterUrl || "/placeholder-movie.png"}
            alt={title}
            fill={true}
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-yellow-500 text-gray-900 font-bold px-2 py-1 rounded-lg flex items-center gap-1">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            {rating.toFixed(1)}
          </div>
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title and Year */}
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-lg font-bold text-white truncate pr-2">{title}</h2>
            <span className="text-gray-400 text-sm whitespace-nowrap">{year}</span>
          </div>

          {/* Genre Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {genres.slice(0, 3).map((genre) => (
              <span
                key={genre}
                className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded-full"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm line-clamp-2 mb-4">
            {description}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch
            </button>
            <button className="p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
