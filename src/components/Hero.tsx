import { Play, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getImageUrl } from "@/lib/tmdb";
import { useQuery } from "@tanstack/react-query";
import { getTrending } from "@/lib/tmdb";
import { useState, useEffect } from "react";
import MovieDetailsModal from "./MovieDetailsModal";
import { Image } from "./ui/image";

const Hero = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0); // Track current movie index

  // Fetch trending movies using React Query
  const { data: trending, isLoading, error } = useQuery({
    queryKey: ["trending"],
    queryFn: getTrending,
    staleTime: Infinity,
    refetchInterval: false,
  });

  // Reset scroll position on refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="relative h-[40vh] sm:h-[50vh] md:h-[50vw] w-full mb-6 flex items-center justify-center">
        <div className="loader"></div> {/* Replace with your loader */}
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="relative h-[40vh] sm:h-[50vh] md:h-[50vw] w-full mb-6 flex items-center justify-center">
        <p className="text-red-500">Failed to load trending movies.</p>
      </div>
    );
  }

  // Handle empty state
  if (!trending || trending.length === 0) return null;

  // Get the current movie based on the index
  const movie = trending[currentMovieIndex];

  // Navigate to the next movie
  const handleNext = () => {
    setCurrentMovieIndex((prevIndex) =>
      prevIndex === trending.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Navigate to the previous movie
  const handlePrevious = () => {
    setCurrentMovieIndex((prevIndex) =>
      prevIndex === 0 ? trending.length - 1 : prevIndex - 1
    );
  };

  return (
<div className="hero-container relative h-[40vh] sm:h-[50vh] md:h-[48vw] lg:h-[58vw] xl:h-[60vw] w-full mb-[0.6rem] group"> {/* Reduced height */}}
      {/* Backdrop Image */}
      <div className="absolute inset-0">
        <div className="aspect-video">
          <Image
            src={getImageUrl(movie.backdrop_path || "/placeholder.jpg", "original")}
            alt={movie.title || movie.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Movie Details */}
      <div className="relative h-full flex items-center -translate-y-4"> {/* Move content up */}
        <div className="px-[4%] w-full md:max-w-[50%] space-y-2 md:space-y-4">
          {/* Title */}
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold animate-fade-in line-clamp-2">
            {movie.title || movie.name}
          </h1>

          {/* Overview */}
          <p className="text-xs sm:text-sm md:text-lg text-gray-200 line-clamp-2 md:line-clamp-3 animate-fade-in">
            {movie.overview}
          </p>

          {/* Buttons */}
          <div className="flex gap-2 md:gap-3">
            {/* Play Button */}
            <Link
              to={`/${movie.media_type || "movie"}/${movie.id}/watch`}
              className="flex items-center gap-1 md:gap-2 bg-white text-black px-2 md:px-8 py-1 md:py-3 rounded text-xs md:text-base hover:bg-gray-300 transition font-medium animate-fade-in"
              aria-label={`Play ${movie.title || movie.name}`}
              tabIndex="-1"
            >
              <Play className="w-3 h-3 md:w-6 md:h-6 fill-current" />
              Play
            </Link>

            {/* More Info Button */}
            <button
              onClick={() => setSelectedMovie(movie)}
              className="flex items-center gap-1 md:gap-2 bg-gray-500/70 text-white px-2 md:px-8 py-1 md:py-3 rounded text-xs md:text-base hover:bg-gray-500/50 transition font-medium animate-fade-in"
              aria-label={`More information about ${movie.title || movie.name}`}
              tabIndex="-1"
            >
              <Info className="w-3 h-3 md:w-6 md:h-6" />
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrevious}
        className="absolute left-[4%] top-[50%] transform -translate-y-[50%] bg-gray-800/70 text-white p-2 rounded-full opacity-20 group-hover:opacity-80 transition-opacity duration-300"
        aria-label="Previous Movie"
        tabIndex="-1"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-[4%] top-[50%] transform -translate-y-[50%] bg-gray-800/70 text-white p-2 rounded-full opacity-20 group-hover:opacity-80 transition-opacity duration-300"
        aria-label="Next Movie"
        tabIndex="-1"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

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
