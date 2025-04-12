import { Play, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { getImageUrl } from "@/lib/tmdb";
import { useQuery } from "@tanstack/react-query";
import { getTrending } from "@/lib/tmdb";
import { useState, useMemo } from "react";
import MovieDetailsModal from "./MovieDetailsModal";
import { Image } from "./ui/image";

const Hero = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [previousMovieId, setPreviousMovieId] = useState(null);

  // Fetch trending movies using React Query
  const { data: trending, isLoading, error } = useQuery({
    queryKey: ["trending"],
    queryFn: getTrending,
    staleTime: Infinity, // Cache data indefinitely until manually invalidated
    refetchInterval: false, // Disable automatic refetching
  });

  // Select a random movie from the trending list
  const movie = useMemo(() => {
    if (!trending) return null;

    let randomMovie;
    do {
      randomMovie = trending[Math.floor(Math.random() * trending.length)];
    } while (randomMovie?.id === previousMovieId);

    setPreviousMovieId(randomMovie?.id);
    return randomMovie;
  }, [trending]);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="relative h-[40vh] sm:h-[50vh] md:h-[56.25vw] w-full mb-8 flex items-center justify-center">
        <div className="loader"></div> {/* Replace with your loader */}
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="relative h-[40vh] sm:h-[50vh] md:h-[56.25vw] w-full mb-8 flex items-center justify-center">
        <p className="text-red-500">Failed to load trending movies.</p>
      </div>
    );
  }

  // Handle empty movie state
  if (!movie) return null;

  return (
    <div className="relative h-[40vh] sm:h-[50vh] md:h-[56.25vw] lg:h-[65vw] xl:h-[70vw] w-full mb-8">
      {/* Backdrop Image */}
      <div className="absolute inset-0">
        <Image
          src={getImageUrl(movie.backdrop_path || "/placeholder.jpg", "original")}
          alt={movie.title || movie.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Movie Details */}
      <div className="relative h-full flex items-center">
        <div className="px-[4%] w-full md:max-w-[50%] space-y-2 md:space-y-4">
          {/* Title */}
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold animate-fade-in line-clamp-2">
            {movie.title || movie.name}
          </h1>

          {/* Overview */}
          <p className="text-xs sm:text-sm md:text-lg text-gray-200 line-clamp-2 md:line-clamp-3 animate-fade-in">
            {movie.overview}
          </p>

          {/* Genre Tags */}
          <div className="flex flex-wrap gap-2">
            {movie.genre_ids?.map((genreId) => (
              <span key={genreId} className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
                {/* Replace genreMap with your genre mapping */}
                Genre Name Here
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-2 md:gap-3">
            {/* Play Button */}
            <Link
              to={`/${movie.media_type || "movie"}/${movie.id}/watch`}
              className="flex items-center gap-1 md:gap-2 bg-white text-black px-2 md:px-8 py-1 md:py-3 rounded text-xs md:text-base hover:bg-gray-300 transition font-medium animate-fade-in"
              aria-label={`Play ${movie.title || movie.name}`}
            >
              <Play className="w-3 h-3 md:w-6 md:h-6 fill-current" />
              Play
            </Link>

            {/* More Info Button */}
            <button
              onClick={() => setSelectedMovie(movie)}
              className="flex items-center gap-1 md:gap-2 bg-gray-500/70 text-white px-2 md:px-8 py-1 md:py-3 rounded text-xs md:text-base hover:bg-gray-500/50 transition font-medium animate-fade-in"
              aria-label={`More information about ${movie.title || movie.name}`}
            >
              <Info className="w-3 h-3 md:w-6 md:h-6" />
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          isOpen={!!selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default Hero;
