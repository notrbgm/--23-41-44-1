import { Movie } from "@/lib/tmdb";
import NumberedMovieCard from "./NumberedMovieCard";

interface TopTenRowProps {
  title: string;
  movies: Movie[];
}

const TopTenRow = ({ title, movies }: TopTenRowProps) => {
  if (!movies?.length) return null;

  // Only show the first 10 movies
  const topTenMovies = movies.slice(0, 10);

  return (
    <div className="space-y-4 py-4">
      {/* Title */}
      <h2 className="text-xl md:text-2xl font-medium px-[4%] text-white">
        {title}
      </h2>

      {/* Horizontal Scroll Container */}
      <div className="px-[4%]">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {topTenMovies.map((movie, index) => (
            <div 
              key={movie.id} 
              className="min-w-[150px] flex-none" // Fixed width for cards
            >
              <NumberedMovieCard
                id={movie.id}
                title={movie.title || movie.name || ""}
                poster_path={movie.poster_path}
                media_type={title.includes("Drama") ? "tv" : movie.media_type}
                overview={movie.overview}
                index={index}
                release_date={movie.release_date}
                vote_average={movie.vote_average}
                recently_added={movie.recently_added}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopTenRow;
