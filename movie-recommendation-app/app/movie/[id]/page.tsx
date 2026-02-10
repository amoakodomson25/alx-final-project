"sue client"
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

// Mock movie data - replace with actual API calls
const mockMovies: Record<string, { id: string; title: string; year: string; rating: number; backdropUrl: string; posterUrl: string; description: string; genres: string[]; cast: { name: string; role: string; image: string }[] }> = {
  "1": {
    id: "1",
    title: "Inception",
    year: "2010",
    rating: 8.8,
    backdropUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200",
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
    genres: ["Action", "Sci-Fi", "Thriller"],
    cast: [
      { name: "Leonardo DiCaprio", role: "Dominick Cobb", image: "https://i.pravatar.cc/150?img=1" },
      { name: "Joseph Gordon-Levitt", role: "Arthur", image: "https://i.pravatar.cc/150?img=2" },
      { name: "Ellen Page", role: "Ariadne", image: "https://i.pravatar.cc/150?img=3" },
      { name: "Tom Hardy", role: "Eames", image: "https://i.pravatar.cc/150?img=4" },
    ],
  },
  "2": {
    id: "2",
    title: "The Dark Knight",
    year: "2008",
    rating: 9.0,
    backdropUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200",
    posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    genres: ["Action", "Crime", "Drama"],
    cast: [
      { name: "Christian Bale", role: "Bruce Wayne", image: "https://i.pravatar.cc/150?img=5" },
      { name: "Heath Ledger", role: "Joker", image: "https://i.pravatar.cc/150?img=6" },
      { name: "Aaron Eckhart", role: "Harvey Dent", image: "https://i.pravatar.cc/150?img=7" },
    ],
  },
};

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const movie = mockMovies[id] || mockMovies["1"];

  if (!movie) {
    notFound();
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

            {/* Similar Movies */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Similar Movies</h2>
              <div className="flex gap-4 overflow-x-auto pb-4">
                {Object.values(mockMovies).filter(m => m.id !== movie.id).map((simMovie) => (
                  <Link key={simMovie.id} href={`/movie/${simMovie.id}`} className="flex-shrink-0 w-40">
                    <div className="relative w-40 h-60 rounded-xl overflow-hidden group">
                      <Image
                        src={simMovie.posterUrl}
                        alt={simMovie.title}
                        fill={true}
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <p className="text-white text-sm mt-2 truncate group-hover:text-red-400 transition-colors">
                      {simMovie.title}
                    </p>
                    <p className="text-gray-400 text-xs">{simMovie.year}</p>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <div className="bg-gray-900 rounded-xl p-6 space-y-4">
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch Trailer
              </button>
              <button className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Add to Favorites
              </button>
              <button className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
              </button>
            </div>

            {/* Movie Info */}
            <div className="bg-gray-900 rounded-xl p-6 space-y-4">
              <h3 className="text-white font-semibold text-lg">Movie Info</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm">Status</p>
                  <p className="text-white">Released</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Original Language</p>
                  <p className="text-white">English</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Budget</p>
                  <p className="text-white">$160,000,000</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Revenue</p>
                  <p className="text-white">$836,836,967</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
