import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchMovieById } from "../../../lib/api";
import MovieActions from "../../../components/MovieActions";

// Server Component
interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;

  // Fetch movie data from TMDB
  let movie;
  try {
    movie = await fetchMovieById(id);
  } catch (error) {
    console.error("Failed to fetch movie:", error);
    return notFound();
  }

  if (!movie) {
    return notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Backdrop */}
      <div className="relative h-[50vh] w-full">
        <Image
          src={movie.backdropUrl}
          alt={movie.title}
          fill={true}
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />

        {/* Back Button */}
        <Link
          href="/"
          className="absolute top-24 left-8 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </Link>

        {/* Movie Title & Info */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-end">
              {/* Poster */}
              <div className="hidden md:block relative w-48 h-72 rounded-xl overflow-hidden shadow-2xl flex-shrink-0">
                <Image
                  src={movie.posterUrl}
                  alt={movie.title}
                  fill={true}
                  className="object-cover"
                />
              </div>

              {/* Title & Details */}
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{movie.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-gray-300">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {movie.year}
                  </span>
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <span className="font-semibold text-yellow-500">{movie.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-gray-500">•</span>
                  <div className="flex gap-2">
                    {movie.genres.map((genre) => (
                      <span key={genre} className="text-sm">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
              <p className="text-gray-300 leading-relaxed text-lg">{movie.description}</p>
            </section>

            {/* Cast */}
            {movie.cast && movie.cast.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-6">Cast</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {movie.cast.map((actor) => (
                    <div key={actor.name} className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={actor.image}
                          alt={actor.name}
                          fill={true}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm truncate">{actor.name}</p>
                        <p className="text-gray-400 text-xs truncate">{actor.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <MovieActions movie={movie} />
          </div>
        </div>
      </div>
    </div>
  );
}
