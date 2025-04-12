import { Play, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { getImageUrl } from "@/lib/tmdb";
import { useQuery } from "@tanstack/react-query";
import { getTrending } from "@/lib/tmdb";
import { useState, useMemo, useEffect } from "react";
import MovieDetailsModal from "./MovieDetailsModal";
import { Image } from "./ui/image";

const Hero = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [previousMovieId, setPreviousMovieId] = useState(null);

  const { data: trending, isLoading, error } = useQuery({
    queryKey: ["trending"],
    queryFn: getTrending,
    staleTime: Infinity,
    refetchInterval: false,
  });

  const movie = useMemo(() => {
    if (!trending) return null;

    let randomMovie;
    do {
      randomMovie = trending[Math.floor(Math.random() * trending.length)];
    } while (randomMovie?.id === previousMovieId);

    setPreviousMovieId(randomMovie?.id);
    return randomMovie;
  }, [trending]);

  // Reset scroll position on refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="relative h-[40vh] sm:h-[50vh] md:h-[56.25vw] w-full mb-8 flex items-center justify-center">
        <div className="loader"></div> {/* Replace with your loader */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative h-[40vh] sm:h-[50vh] md:h-[56.25vw] w-full mb-8 flex items-center justify-center">
        <p className="text-red-500">Failed to load trending movies.</p>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="hero-container relative h-[40vh] sm:h-[50vh] md:h-[56.25vw] lg:h-[65vw] xl:h-[70vw] w-full mb-8">
      <div className="absolute inset-0">
        <div className="aspect-video">
          <Image
            src={getImageUrl(movie.backdrop_path || "/placeholder.jpg", "original")}
            alt={movie.title || movie.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 hero-gradient" />
      </div>
      <div className="relative h-full flex items-center">
        <div className="px-[4%] w-full md:max-w-[50%] space-y-2 md:space-y-4">
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold animate-fade-in line-clamp-2">
            {movie.title || movie.name}
          </h1>
          <p className="text-xs sm:text-sm md:text-lg text-gray-200 line-clamp-2 md:line-clamp-3 animate-fade-in">
            {movie.overview}
          </p>
          <div className="flex gap-2 md:gap-3">
            <Link
              to={`/${movie.media_type || "movie"}/${movie.id}/watch`}
              className="flex items-center gap-1 md:gap-2 bg-white text-black px-2 md:px-8 py-1 md:py-3 rounded text-xs md:text-base hover:bg-gray-300 transition font-medium animate-fade-in"
              aria-label={`Play ${movie.title || movie.name}`}
              tabIndex="-1"
            >
              <Play className="w-3 h-3 md:w-6 md:h-6 fill-current" />
              Play
            </Link>
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
