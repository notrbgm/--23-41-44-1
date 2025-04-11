// Example: Assuming you have an array called 'topTenMovies'
import NumberedMovieCard from './NumberedMovieCard';

const TopTenMovies = ({ topTenMovies }: { topTenMovies: any[] }) => {
  return (
    <div className="flex space-x-4 overflow-x-auto py-4">
      {topTenMovies.map((movie, index) => (
        <NumberedMovieCard
          key={movie.id}
          index={index}
          {...movie} // Assuming each movie object has the required props
        />
      ))}
    </div>
  );
};

export default TopTenMovies;
