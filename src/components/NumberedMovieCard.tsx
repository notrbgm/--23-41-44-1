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

  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w342${poster_path}`
    : "/placeholder.svg";

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const year = release_date ? new Date(release_date).getFullYear() : null;
  const rating = vote_average ? Number((vote_average).toFixed(1)) : null;

  return (
    <>
      <div className="relative group flex h-full w-full items-center"
           onMouseEnter={() => setIsHovered(true)}
           onMouseLeave={() => setIsHovered(false)}>

        {/* Aligned Number with Dark Mode Support */}
        <div
          className="absolute inset-0 flex items-end justify-end"
          style={{
            right: '32%',
            bottom: '10%', // Align to the bottom

          }}
        >
          <span
            className={`text-[117px] font-black leading-none transition-all duration-300  ${isHovered ? 'scale-110' : 'scale-100'
              } `}
            style={{
              color: 'rgba(51, 51, 51, 0.8)', // Consistent color in dark mode
              WebkitTextStroke: "2px red", // Red outline
              textShadow: "0 0 8px red",
            }}
          >
            {index + 1}
          </span>
        </div>

        {/* Movie Poster */}
        <div className="relative z-10 ml-auto w-[45%]">
          <div
            onClick={handleCardClick}
            className="cursor-pointer overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105"
          >
            <Image
              src={imageUrl}
              alt={title}
              className="aspect-[2/3] w-full object-cover"
              priority={index < 3}
            />

            {/* Recently Added Badge */}
            {recently_added && (
              <div className="absolute left-2 top-2 rounded bg-red-600 px-2 py-1 text-xs font-medium text-white">
                Recently Added
              </div>
            )}

            {/* Info Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-4">
              <span className="mb-2 line-clamp-2 text-xs font-semibold text-white sm:text-sm">
                {title}
              </span>
              <div className="flex items-center gap-2 text-xs text-gray-300">
                {rating && (
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
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
