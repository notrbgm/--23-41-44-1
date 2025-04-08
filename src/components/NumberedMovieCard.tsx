import { useState } from "react";
import { Star } from "lucide-react";
import MovieDetailsModal from "./MovieDetailsModal";
import { Image } from "./ui/image";

interface NumberedMovieCardProps {
  id: number;
  title: string;
  poster_path: string;
  media_type?: string;
  overview?: string;
  backdrop_path?: string;
  release_date?: string;
  vote_average?: number;
  index: number;
  recently_added?: boolean;
}

const NumberedMovieCard = ({
  id,
  title,
  poster_path,
  media_type = "movie",
  index,
  release_date,
  vote_average,
  recently_added,
  ...rest
}: NumberedMovieCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Use smaller image size for thumbnails
  const imageUrl =
    poster_path
      ? `https://image.tmdb.org/t/p/w342${poster_path}` // w342 is more appropriate for thumbnails than w500
      : "/placeholder.svg";

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const year = release_date ? new Date(release_date).getFullYear() : null;
  const rating = vote_average ? Number(vote_average.toFixed(1)) : null;

  return (
    <>
      <div
        className="relative w-full h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Movie Card Container */}
        <div
          onClick={handleCardClick}
          className="flex items-center cursor-pointer group w-full h-full transition-all duration-300"
          style={{
            transform: isHovered ? "scale(1.02)" : "scale(1)", // Subtle pop-out effect
          }}
        >
          {/* Number */}
          <div
            className={`absolute bottom-0 left-0 w-[15%] h-[20%] flex items-center justify-center transition-all duration-300 ${
              isHovered
                ? "text-red-600 scale-150" // On hover: red color and larger
                : "text-gray-400 scale-100 border-4 border-red-600 bg-transparent" // When not hovered: red border with no background
            }`}
            style={{
              fontFamily: "Netflix Sans, Arial Black, sans-serif",
              fontSize: "100px",
              fontWeight: "bold",
              letterSpacing: "-4px",
              borderRadius: "8px",
            }}
          >
            {index + 1}
          </div>

          {/* Movie Poster */}
          <div className="relative w-[85%] h-full">
            <Image
              src={imageUrl}
              alt={title}
              className="w-full h-full rounded-sm object-cover"
              priority={index < 3} // Eagerly load first 3 items
            />
            {/* Recently Added Badge */}
            {recently_added && (
              <div className="absolute top-2 left-0 right-0 flex justify-center">
                <div className="bg-red-600 text-[8px] xs:text-[10px] text-white px-2 py-0.5 font-medium rounded">
                  Recently Added
                </div>
              </div>
            )}
            {/* Info Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
              <span className="text-white text-[12px] sm:text-xs font-semibold line-clamp-2 mb-2">{title}</span>
              <div className="flex items-center gap-2 text-[10px] sm:text-[12px] text-gray-300">
                {rating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span>{rating}</span>
                  </div>
                )}
                {year && <span>{year}</span>}
              </div>
            </div>
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
};

export default NumberedMovieCard;
