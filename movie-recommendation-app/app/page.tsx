import MovieCarousel from "../components/ui/MovieCarousel";
import { fetchTrendingMovies, fetchPopularMovies, fetchTopRatedMovies } from "../lib/api";

export default async function Home() {
  // Fetch movies from TMDB API
  const trendingMovies = await fetchTrendingMovies();
  const popularMovies = await fetchPopularMovies();
  const topRatedMovies = await fetchTopRatedMovies();

  return (
    <div className="pt-24 px-8">
      {/* Trending Movies Carousel */}
      <section className="mb-16">
        <MovieCarousel title="Trending Movies" movies={trendingMovies} />
      </section>

      {/* Popular Movies Carousel */}
      <section className="mb-16">
        <MovieCarousel title="Popular Movies" movies={popularMovies} />
      </section>

      {/* Top Rated Movies Carousel */}
      <section className="mb-16">
        <MovieCarousel title="Top Rated Movies" movies={topRatedMovies} />
      </section>
    </div>
  );
}
