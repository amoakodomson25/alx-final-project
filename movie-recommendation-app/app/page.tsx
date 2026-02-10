import MovieCarousel from "../components/ui/MovieCarousel";

// Mock movie data
const trendingMovies = [
  { id: "1", title: "Inception", year: "2010", rating: 8.8, posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400", genre: "Sci-Fi" },
  { id: "2", title: "The Dark Knight", year: "2008", rating: 9.0, posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400", genre: "Action" },
  { id: "3", title: "Interstellar", year: "2014", rating: 8.6, posterUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400", genre: "Sci-Fi" },
  { id: "4", title: "Dunkirk", year: "2017", rating: 7.8, posterUrl: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400", genre: "War" },
  { id: "5", title: "Tenet", year: "2020", rating: 7.3, posterUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400", genre: "Sci-Fi" },
  { id: "6", title: "Oppenheimer", year: "2023", rating: 8.5, posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400", genre: "Drama" },
  { id: "6", title: "Oppenheimer", year: "2023", rating: 8.5, posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400", genre: "Drama" },
];

const recommendedMovies = [
  { id: "7", title: "The Prestige", year: "2006", rating: 8.5, posterUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400", genre: "Thriller" },
  { id: "8", title: "Insomnia", year: "2002", rating: 7.2, posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400", genre: "Crime" },
  { id: "9", title: "Memento", year: "2000", rating: 8.4, posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400", genre: "Mystery" },
  { id: "10", title: "The Matrix", year: "1999", rating: 8.7, posterUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400", genre: "Sci-Fi" },
  { id: "11", title: "Blade Runner", year: "1982", rating: 8.1, posterUrl: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=400", genre: "Sci-Fi" },
  { id: "12", title: "Avatar", year: "2009", rating: 7.9, posterUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?w=400", genre: "Sci-Fi" },
];

const favoriteMovies = [
  { id: "1", title: "Inception", year: "2010", rating: 8.8, posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400", genre: "Sci-Fi" },
  { id: "2", title: "The Dark Knight", year: "2008", rating: 9.0, posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400", genre: "Action" },
  { id: "3", title: "Interstellar", year: "2014", rating: 8.6, posterUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400", genre: "Sci-Fi" },
];

export default function Home() {
  return (
    <div className="pt-24 px-8">
      {/* Trending Movies Carousel */}
      <section className="mb-16">
        <MovieCarousel title="Trending Movies" movies={trendingMovies} />
      </section>

      {/* Recommended Movies Carousel */}
      <section className="mb-16">
        <MovieCarousel title="Recommended for You" movies={recommendedMovies} />
      </section>

      {/* Favorite Movies Carousel */}
      <section className="mb-16">
        <MovieCarousel title="Your Favorites" movies={favoriteMovies} />
      </section>
    </div>
  );
}
