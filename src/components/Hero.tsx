import { Play, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getImageUrl } from "@/lib/tmdb";
import { useQuery } from "@tanstack/react-query";
import { getTrending } from "@/lib/tmdb";
import { useState } from "react";
import MovieDetailsModal from "./MovieDetailsModal";
import { Image } from "./ui/image";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./Hero.css";


const Hero = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0); // Track current movie index

  // Fetch trending movies using React Query
  const { data: trending } = useQuery({
    queryKey: ["trending"],
    queryFn: getTrending,
    refetchInterval: 1000 * 60 * 60,
  });

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
    <div className="hero-container relative h-[40vh] sm:h-[50vh] md:h-[48vw] lg:h-[58vw] xl:h-[60vw] w-full mb-2 group"> {/* Adjusted height and bottom margin */}
      <TransitionGroup className="absolute inset-0">
        <CSSTransition
          key={movie.id}
          timeout={500}
          classNames="slide"
        >
          <div className="absolute inset-0">
            <div className="aspect-video">
              <Image
                src={getImageUrl(movie.backdrop_path || "/placeholder.jpg", "original")}
                alt={movie.title || movie.name}
                className="w-full h-full object-cover"
                priority={true}
              />
            </div>
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" /> {/* Bottom fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" /> {/* Top fade */}
            <div className="absolute inset-0 hero-gradient" />
          </div>
        </CSSTransition>
      </TransitionGroup>

      {/* Movie Details */}
      <div className="relative h-full flex items-center -translate-y-4"> {/* Moved content upward */}
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

      {/* Navigation Buttons */}
      <button
        onClick={handlePrevious}
        className="absolute left-[4%] top-[50%] transform -translate-y-[50%] bg-gray-800/70 text-white p-2 rounded-full opacity-20 group-hover:opacity-80 transition-opacity duration-300 hover:scale-[1.1]"
        aria-label="Previous Movie"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-[4%] top-[50%] transform -translate-y-[50%] bg-gray-800/70 text-white p-2 rounded-full opacity-20 group-hover:opacity-80 transition-opacity duration-300 hover:scale-[1.1]"
        aria-label="Next Movie"
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
