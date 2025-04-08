import { useState } from "react";
import { Star } from "lucide-react";
import MovieDetailsModal from "./MovieDetailsModal";
import { Image } from "./ui/image";

interface MovieCardProps {
  id: number;
  title: string;
  poster_path: string;
  media_type?: string;
  overview?: string;
  backdrop_path?: string;
  release_date?: string;
  vote_average?: number;
}

const MovieCard = ({ id, title, poster_path, media_type = "movie", release_date, vote_average, ...rest }: MovieCardProps) => {
  const [showModal, setShowModal] = useState(false);
  
  // Use smaller image size for thumbnails
  const imageUrl = poster_path 
    ? `https://image.tmdb.org/t/p/w342${poster_path}` // w342 is more appropriate for thumbnails than w500
    : "/placeholder.svg";
  
  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal(true);
  };
  
  const year = release_date ? new Date(release_date).getFullYear() : null;
  const rating = vote_average ? Number((vote_average).toFixed(1)) : null;
  
  return (
    <>
      <div 
        onClick={handleCardClick}
        className="movie-card relative rounded-lg overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300"
      >
        <Image
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          priority={false} // Will be overridden by parent components for above-the-fold content
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5">
          <span className="text-white text-sm sm:text-lg font-semibold line-clamp-2 mb-2">{title}</span>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
            {rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-medium">{rating}</span>
              </div>
            )}
            {year && <span>{year}</span>}
          </div>
        </div>
      </div>
      <MovieDetailsModal
        movie={{ id, title, poster_path, media_type, release_date, vote_average, ...rest }}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}

export default MovieCard;
