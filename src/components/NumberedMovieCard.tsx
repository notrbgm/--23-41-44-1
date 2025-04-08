import { useState } from "react";
import { Star } from "lucide-react";
import MovieDetailsModal from "./MovieDetailsModal";
import { Image } from "./ui/image";

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
}) => {
  const [showModal, setShowModal] = useState(false);

  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w342${poster_path}`
    : "/placeholder.svg";

  const handleCardClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const year = release_date ? new Date(release_date).getFullYear() : null;
  const rating = vote_average ? Number((vote_average).toFixed(1)) : null;

  return (
    <>
      <div className="relative w-full h-full">
        {/* Movie Poster Container */}
        <div className="relative w-[45%] ml-auto z-10">
          <div onClick={handleCardClick} className="movie-card-container cursor-pointer group">
            <div className="movie-card">
              <Image
                src={imageUrl}
                alt={title}
                className="movie-image"
                priority={index < 3}
              />
              {/* Recently Added Badge */}
              {recently_added && (
                <div className="absolute top-2 left-0 right-0 flex justify-center">
                  <div className="bg-red-600 text-[8px] xs:text-[10px] text-white px-2 py-1 font-medium rounded">
                    Recently Added
                  </div>
                </div>
              )}
              {/* Info Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
                <span className="text-white text-[12px] sm:text-xs font-semibold line-clamp-2 mb-2">
                  {title}
                </span>
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
          {/* Background Number */}
          <div className="absolute bottom-[10px] left-[10px] z-10">
            <span className="number-text">{index + 1}</span>
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
