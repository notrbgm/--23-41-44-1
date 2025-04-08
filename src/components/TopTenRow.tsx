import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Movie } from "@/lib/tmdb";
import NumberedMovieCard from "./NumberedMovieCard";
import { useState } from "react";

interface TopTenRowProps {
  title: string;
  movies: Movie[];
}

const TopTenRow = ({ title, movies }: TopTenRowProps) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!movies?.length) return null;

  // Only show the first 10 movies
  const topTenMovies = movies.slice(0, 10);

  return (
    <div
      className="space-y-4 relative category-row-container py-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 className="text-xl md:text-2xl font-medium px-[4%] text-white">
        {title}
      </h2>
      <div className="relative px-[4%]">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            margin: 10, // Add spacing between items
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-1 md:-ml-2">
            {topTenMovies.map((movie, index) => (
              <CarouselItem
                key={movie.id}
                className="pl-1 md:pl-2 basis-[45%] xs:basis-[40%] sm:basis-[35%] md:basis-[28%] lg:basis-[22%] xl:basis-[18%]"
              >
                <div className="relative group">
                  <NumberedMovieCard
                    id={movie.id}
                    title={movie.title || movie.name || ""}
                    poster_path={movie.poster_path}
                    media_type={title === "Korean Dramas" ? "tv" : movie.media_type}
                    overview={movie.overview}
                    index={index}
                    release_date={movie.release_date}
                    vote_average={movie.vote_average}
                    recently_added={movie.recently_added}
                  />
                  {movie.recently_added && (
                    <div className="absolute top-2 left-0 right-0 flex justify-center">
                      <div className="bg-red-600 text-[8px] xs:text-[10px] text-white px-2 py-1 font-medium rounded">
                        Recently Added
                      </div>
                    </div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious
            className={`absolute left-[2%] z-40 h-full w-[4%] bg-black/30 hover:bg-black/60 border-none rounded-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} hidden sm:flex`}
          />
          <CarouselNext
            className={`absolute right-[2%] z-40 h-full w-[4%] bg-black/30 hover:bg-black/60 border-none rounded-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} hidden sm:flex`}
          />
        </Carousel>
      </div>
    </div>
  );
};

export default TopTenRow;
