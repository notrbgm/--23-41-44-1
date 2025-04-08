import React, { useState } from 'react';
import { Star } from 'lucide-react';
import './NumberedMovieCard.css'; // Ensure this path is correct

interface MovieProps {
  id: number;
  title: string;
  poster_path: string;
  media_type?: string;
  index: number;
  release_date: string;
  vote_average: number;
  recently_added?: boolean;
}

const NumberedMovieCard: React.FC<MovieProps> = ({
  id,
  title,
  poster_path,
  media_type = 'movie',
  index,
  release_date,
  vote_average,
  recently_added,
}) => {
  const [showModal, setShowModal] = useState(false);

  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w342${poster_path}`
    : '/assets/images/placeholder.svg';

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const year = release_date ? new Date(release_date).getFullYear() : null;
  const rating = vote_average ? Number(vote_average.toFixed(1)) : null;

  return (
    <>
      <div className="relative w-full h-full">
        {/* Movie Poster Container */}
        <div className="relative w-[45%] ml-auto z-10">
          <div onClick={handleCardClick} className="movie-card-container cursor-pointer group">
            <div className="movie-card">
              <img
                src={imageUrl}
                alt={title}
                className="movie-image"
                loading={index < 3 ? 'eager' : 'lazy'}
              />
              {/* Recently Added Badge */}
              {recently_added && (
                <div className="absolute top-2 left-0 right-0 flex justify-center">
                  <div className="badge">
                    Recently Added
                  </div>
                </div>
              )}
              {/* Info Overlay */}
              <div className="info-overlay flex flex-col justify-end p-3 sm:p-4">
                <span className="movie-title">{title}</span>
                <div className="movie-details">
                  {rating && (
                    <div className="rating flex items-center gap-1">
                      <Star className="star-icon" />
                      <span>{rating}</span>
                    </div>
                  )}
                  {year && <span>{year}</span>}
                </div>
              </div>
            </div>
          </div>
          {/* Background Number */}
          <div className="number-container absolute bottom-[10px] left-[10px] z-10">
            <span className="number-text">{index + 1}</span>
          </div>
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <MovieDetailsModal
          movieId={id}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default NumberedMovieCard;
