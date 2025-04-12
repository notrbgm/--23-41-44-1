import { Play, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getImageUrl } from "@/lib/tmdb";
import { useQuery } from "@tanstack/react-query";
import { getTrending } from "@/lib/tmdb";
import { useState, useEffect, useCallback, useRef } from "react";
import MovieDetailsModal from "./MovieDetailsModal";
import { Image } from "./ui/image";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Hero: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentMovieIndex, setCurrentMovieIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const autoSlideTimeout = useRef<NodeJS.Timeout | null>(null);

  const { data: trending } = useQuery({
    queryKey: ["trending"],
    queryFn: getTrending,
    refetchInterval: 1000 * 60 * 60,
  });

  if (!trending || trending.length === 0) {
    return <div>Loading...</div>; // Fallback UI instead of null
  }

  const movie = trending[currentMovieIndex];

  const handleNext = useCallback(() => {
    setCurrentMovieIndex((prevIndex) =>
      prevIndex === trending.length - 1 ? 0 : prevIndex +
