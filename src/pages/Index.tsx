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

interface IndexProps {
  showAuthModal: () => void;
}

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

const Index = ({ showAuthModal }: IndexProps) => {
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

  return (
    <div className="min-h-screen bg-netflix-black">
      {/* Pass showAuthModal to Navbar */}
      <Navbar showAuthModal={showAuthModal} />
      <AnnouncementBanner />
      <Hero />
      {/* Other rows */}
      {trending && trending.length > 0 && (
        <TopTenRow title="Top 10 Today" movies={trending} />
      )}
      {popularMovies && popularMovies.length > 0 && (
        <CategoryRow title="Popular Movies" movies={popularMovies} />
      )}
      {/* Add other rows here */}
      <Footer />
    </div>
  );
};

export default Index;
