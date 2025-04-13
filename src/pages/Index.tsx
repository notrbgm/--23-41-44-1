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

// Add props interface
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

const Index = ({ showAuthModal }: IndexProps) => {  // Add props
  // ... existing query definitions ...

  return (
    <div className="min-h-screen bg-netflix-black">
      {/* Pass showAuthModal to Navbar */}
      <Navbar showAuthModal={showAuthModal} />
      <AnnouncementBanner />
      <Hero />
      {/* ... rest of the existing content ... */}
    </div>
  );
};

export default Index;
