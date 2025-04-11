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
  const { data: popularMovies } = useQuery<Movie[]>({
    queryKey: ["popular"],
    queryFn: async () => {
      const response = await getPopular();
      return response.results;
    },
  });

  const { data: newReleases } = useQuery<Movie[]>({
    queryKey: ["new-releases"],
    queryFn: getNewReleases,
  });

  const { data: kdramas } = useQuery<Movie[]>({
    queryKey: ["kdramas"],
    queryFn: getKDramas,
  });

  const { data: tvShows } = useQuery<Movie[]>({
    queryKey: ["tvshows"],
    queryFn: async () => {
      const response = await getTVShows();
      return response.results;
    },
  });

  const { data: trending } = useQuery<Movie[]>({
    queryKey: ["trending"],
    queryFn: getTrending,
  });

  // Genre-specific queries
  const { data: horrorMovies } = useQuery<MovieResponse>({
    queryKey: ["genre", GENRE_IDS.horror],
    queryFn: () => getMoviesByGenre(GENRE_IDS.horror),
  });

  const { data: actionMovies } = useQuery<MovieResponse>({
    queryKey: ["genre", GENRE_IDS.action],
    queryFn: () => getMoviesByGenre(GENRE_IDS.action),
  });

  const { data: scifiMovies } = useQuery<MovieResponse>({
    queryKey: ["genre", GENRE_IDS.scifi],
    queryFn: () => getMoviesByGenre(GENRE_IDS.scifi),
  });

  const { data: animationMovies } = useQuery<MovieResponse>({
    queryKey: ["genre", GENRE_IDS.animation],
    queryFn: () => getMoviesByGenre(GENRE_IDS.animation),
  });

  const { data: thrillerMovies } = useQuery<MovieResponse>({
    queryKey: ["genre", GENRE_IDS.thriller],
    queryFn: () => getMoviesByGenre(GENRE_IDS.thriller),
  });

  const { data: romanceMovies } = useQuery<MovieResponse>({
    queryKey: ["genre", GENRE_IDS.romance],
    queryFn: () => getMoviesByGenre(GENRE_IDS.romance),
  });
   const topTenTitle = (
        
            
                TOP 10
                
                    <b>CONTENT TODAY</b>
                
            
        
    );
  return (
        
            
            
            
            
                {trending && trending.length > 0 && (
                    
                )}
                {popularMovies && popularMovies.length > 0 && (
                    
                )}
                {newReleases && newReleases.length > 0 && (
                    
                )}
                {kdramas && kdramas.length > 0 && (
                    
                )}
                {tvShows && tvShows.length > 0 && (
                    
                )}
                {horrorMovies?.results && horrorMovies.results.length > 0 && (
                    
                )}
                {actionMovies?.results && actionMovies.results.length > 0 && (
                    
                )}
                {scifiMovies?.results && scifiMovies.results.length > 0 && (
                    
                )}
                {animationMovies?.results && animationMovies.results.length > 0 && (
                    
                )}
                {thrillerMovies?.results && thrillerMovies.results.length > 0 && (
                    
                )}
                {romanceMovies?.results && romanceMovies.results.length > 0 && (
                    
                )}
            
            
        
  );
};

export default Index;
