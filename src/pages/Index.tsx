import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryRow from "@/components/CategoryRow";
import TopTenRow from "@/components/TopTenRow";
import Footer from "@/components/Footer";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import {
  getPopular,
  getNewReleases,
  getMoviesByGenre,
  getKDramas,
  getTVShows,
  getTrending,
  type Movie,
  type MovieResponse,
} from "@/lib/tmdb";

const GENRE_IDS = {
  horror: "27",
  scifi: "878",
  animation: "16",
  thriller: "53",
  romance: "10749",
  action: "28",
  comedy: "35",
  drama: "18"
};

const Index = () => {
  const { data: popularMovies } = useQuery({
    queryKey: ["popular"],
    queryFn: async () => {
      const response = await getPopular();
      return response.results;
    },
  });

  const { data: newReleases } = useQuery({
    queryKey: ["new-releases"],
    queryFn: getNewReleases,
  });

  const { data: kdramas } = useQuery({
    queryKey: ["kdramas"],
    queryFn: getKDramas,
  });

  const { data: tvShows } = useQuery({
    queryKey: ["tvshows"],
    queryFn: async () => {
      const response = await getTVShows();
      return response.results;
    },
  });

  const { data: trending } = useQuery({
    queryKey: ["trending"],
    queryFn: getTrending,
  });

  // Genre-specific queries
  const { data: horrorMovies } = useQuery({
    queryKey: ["genre", GENRE_IDS.horror],
    queryFn: () => getMoviesByGenre(GENRE_IDS.horror),
  });

  const { data: actionMovies } = useQuery({
    queryKey: ["genre", GENRE_IDS.action],
    queryFn: () => getMoviesByGenre(GENRE_IDS.action),
  });

  const { data: scifiMovies } = useQuery({
    queryKey: ["genre", GENRE_IDS.scifi],
    queryFn: () => getMoviesByGenre(GENRE_IDS.scifi),
  });

  const { data: animationMovies } = useQuery({
    queryKey: ["genre", GENRE_IDS.animation],
    queryFn: () => getMoviesByGenre(GENRE_IDS.animation),
  });

  const { data: thrillerMovies } = useQuery({
    queryKey: ["genre", GENRE_IDS.thriller],
    queryFn: () => getMoviesByGenre(GENRE_IDS.thriller),
  });

  const { data: romanceMovies } = useQuery({
    queryKey: ["genre", GENRE_IDS.romance],
    queryFn: () => getMoviesByGenre(GENRE_IDS.romance),
  });

  return (
    
      
        
        
        
        
        
        
        
        
        
        
        
        
      
      
    
  );
};

export default Index;
