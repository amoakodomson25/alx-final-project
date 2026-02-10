# Movie Discovery App

A modern, responsive movie discovery application built with Next.js that helps users explore, discover, and keep track of their favorite movies. The app integrates with The Movie Database (TMDB) API to provide up-to-date movie information, ratings, cast details, and trailers.

## Live Demo

**Hosted Website:** [https://alx-final-project-usu3.onrender.com/](https://alx-final-project-usu3.onrender.com/)

## Features

### Movie Discovery
- **Trending Movies**: Browse the hottest movies trending right now
- **Popular Movies**: Explore the most popular movies currently showing
- **Top Rated Movies**: Discover critically acclaimed movies of all time
- **Movie Carousels**: Smooth horizontal scrolling carousels for easy browsing

### Movie Details
- **Comprehensive Info**: View movie titles, release years, ratings, and synopses
- **High-Quality Images**: Beautiful backdrop and poster images
- **Genre Tags**: Easy-to-read genre categorization
- **Cast Information**: Full cast listings with photos
- **Trailer Access**: Watch trailers directly from the movie page
- **Taglines**: Original movie taglines for added context

### Favorites System
- **Save Favorites**: Add any movie to your favorites list
- **Persistent Storage**: Favorites are saved locally in your browser
- **Easy Management**: Toggle favorites on/off with instant feedback
- **Dedicated Page**: View all your saved favorites in one place

### User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Fast Navigation**: Client-side navigation with Next.js App Router
- **Clean UI**: Modern, minimalist interface with intuitive controls
- **Loading States**: Smooth loading indicators throughout the app

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **API Integration**: [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api)
- **UI Components**: Custom-built React components
- **Icons**: Lucide React icons
- **Font**: Geist font family

## Project Structure

```
movie-recommendation-app/
├── app/
│   ├── favorites/
│   │   └── page.tsx          # Favorites page
│   ├── movie/
│   │   └── [id]/
│   │       └── page.tsx      # Movie details page
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page (movie listings)
├── components/
│   ├── layout/
│   │   └── Footer.tsx        # Footer component
│   ├── MovieActions.tsx      # Favorite/trailer actions
│   └── ui/
│       ├── BigCard.tsx       # Large movie card
│       ├── MovieCarousel.tsx # Movie carousel component
│       └── SmallCard.tsx     # Small movie card
├── lib/
│   ├── api.ts                # API functions and data transformation
│   └── tmdb.ts               # TMDB configuration
├── types/
│   └── index.ts              # TypeScript type definitions
├── public/
│   └── placeholder-movie.png # Placeholder image
├── eslint.config.mjs         # ESLint configuration
├── next.config.ts            # Next.js configuration
├── package.json              # Dependencies
├── postcss.config.mjs        # PostCSS configuration
├── tailwind.config.ts        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun
- TMDB API key (free from [themoviedb.org](https://www.themoviedb.org/))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd alx-final-project
   ```

2. **Navigate to the app directory**
   ```bash
   cd movie-recommendation-app
   ```

3. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

4. **Set up environment variables**

   Create a `.env.local` file in the `movie-recommendation-app` directory:

   ```env
   TMDB_API_KEY=your_api_key_here
   TMDB_BASE_URL=https://api.themoviedb.org/3
   TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
   ```

   Get your free API key from [TMDB](https://www.themoviedb.org/settings/api).

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the app.

## Pages

### Home Page (`/`)
The main landing page featuring three movie carousels:
- Trending Movies
- Popular Movies
- Top Rated Movies

Each carousel displays movies in a horizontal scrollable format with small cards showing the poster, title, year, and rating.

### Movie Details Page (`/movie/[id]`)
Individual movie pages showing:
- Large backdrop image
- Movie poster
- Full description
- Rating and release year
- Genre tags
- Cast members with photos
- Trailer/video section
- Add to favorites button

### Favorites Page (`/favorites`)
A dedicated page showing all your saved favorite movies with the ability to remove them.

## API Integration

The app uses TMDB API endpoints:
- `/trending/{media_type}/week` - Trending content
- `/movie/popular` - Popular movies
- `/movie/top_rated` - Top rated movies
- `/movie/{movie_id}` - Movie details
- `/movie/{movie_id}/credits` - Cast information
- `/movie/{movie_id}/videos` - Trailers and videos

## Key Components

### MovieCarousel
A horizontally scrolling carousel component that displays movies in a smooth, responsive layout. Supports touch scrolling on mobile devices.

### SmallCard
Compact movie card for carousel views, showing poster, title, year, and rating.

### BigCard
Expanded movie card for detailed views, featuring backdrop image, full description, and cast information.

### MovieActions
Interactive component for each movie providing:
- Favorite toggle (add/remove from favorites)
- Trailer viewing option

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `TMDB_API_KEY` | Your TMDB API key | Yes |
| `TMDB_BASE_URL` | Base URL for TMDB API (default: https://api.themoviedb.org/3) | No |
| `TMDB_IMAGE_BASE_URL` | Base URL for TMDB images (default: https://image.tmdb.org/t/p) | No |

## Responsive Design

The app is fully responsive and optimized for:
- **Desktop**: Full-width carousels and detailed movie views
- **Tablet**: Adjusted layouts for medium screens
- **Mobile**: Touch-friendly carousels and stacked layouts

## Development
### Code Formatting
```bash
npm run lint
```

### Type Checking
```bash
npx tsc --noEmit
```

## Deployment
### Render (Recommended)
The app is configured for easy deployment on Render. Connect your repository and set the build command to `npm install` and start command to `npm run start`.

## License

This project is for educational purposes as part of the ALX Africa program.

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the API
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [ALX Africa](https://www.alxafrica.com/) for the learning program
