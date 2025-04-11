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

  // Only show first 10 movies
  const topTenMovies = movies.slice(0, 10);

  return (
    <div className="mx-4 space-y-2 md:mx-6">
      <h2 className="text-xl font-semibold text-white md:text-2xl">
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <span
            style={{
              fontSize: '40px', // Adjust the size as needed
              fontWeight: 'bold',
              position: 'relative',
              WebkitTextStroke: '2px #DC2626',
              color: 'rgba(51, 51, 51, 0.8)',
              textShadow: '0 0 8px #DC2626',
              letterSpacing: '-0.27em',
              zIndex: 1,
            }}
          >
            TOP 10
          </span>
          <span
            style={{
              position: 'absolute',
              bottom: '-10px', // Adjust the vertical position as needed
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '12px', // Adjust the size to be smaller than "TOP 10"
              fontWeight: 'bold',
              color: 'white',
              zIndex: 2,
              whiteSpace: 'nowrap', // Prevent line breaks
            }}
          >
            <b>CONTENT TODAY</b>
          </span>
        </div>
      </h2>
      <Carousel
        opts={{
          loop: true,
          align: "start",
        }}
        className="relative"
      >
        <CarouselContent className="-ml-1 pl-1">
          {topTenMovies.map((movie, index) => (
            <CarouselItem key={movie.id} className="basis-1/2 md:basis-1/5 lg:basis-1/10">
              <NumberedMovieCard
                index={index}
                {...movie}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 top-1/2 h-10 w-10 -translate-y-1/2 transform rounded-full bg-black/20 text-white focus:shadow-none" />
        <CarouselNext className="right-2 top-1/2 h-10 w-10 -translate-y-1/2 transform rounded-full bg-black/20 text-white focus:shadow-none" />
      </Carousel>
    </div>
  );
};

export default TopTenRow;
