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

  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w342${poster_path}`
    : "/placeholder.svg";

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const year = release_date ? new Date(release_date).getFullYear() : null;
  const rating = vote_average ? Number(vote_average.toFixed(1)) : null;

  return (
    <>
      <div className="relative w-full h-full group">
        {/* Background Number */}
        <div className="absolute inset-0 flex items-center justify-start pl-4">
          <span
            className="text-[120px] font-extrabold leading-none text-transparent"
            style={{
              WebkitTextStroke: "2px white",
              backgroundImage: "linear-gradient(to bottom, red, yellow)",
              WebkitBackgroundClip: "text",
            }}
          >
            {index + 1}
          </span>
        </div>

        {/* Movie Poster Container */}
        <div
          className="relative w-[60%] ml-auto z-10 transform transition-transform duration-300 group-hover:scale-105"
          onClick={handleCardClick}
        >
          <Image
            src={imageUrl}
            alt={title}
            className="w-full h-full rounded-lg object-cover"
            priority={index < 3}
          />
          {/* Recently Added Badge */}
          {recently_added && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
              Recently Added
            </div>
          )}
          {/* Info Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <span className="text-white text-lg font-semibold mb-2">{title}</span>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              {rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{rating}</span>
                </div>
              )}
              {year && <span>{year}</span>}
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
