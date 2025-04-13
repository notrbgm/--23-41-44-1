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
} from "@/lib/tmdb";

const GENRE_IDS = {
  horror: "27",
  scifi: "878",
  animation: "16",
  thriller: "53",
  romance: "10749",
  action: "28",
  comedy: "35",
  drama: "18",
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
    <>
      <Navbar />
      <AnnouncementBanner />
      <Hero />

      {trending && trending.length > 0 && (
        <TopTenRow title="🔥 Trending Now" movies={trending} />
      )}

      {popularMovies && popularMovies.length > 0 && (
        <CategoryRow title="Popular Movies" movies={popularMovies} />
      )}

      {newReleases && newReleases.length > 0 && (
        <CategoryRow title="🆕 New Releases" movies={newReleases} />
      )}

      {kdramas && kdramas.length > 0 && (
        <CategoryRow title="💜 K-Dramas" movies={kdramas} />
      )}

      {tvShows && tvShows.length > 0 && (
        <CategoryRow title="📺 TV Shows" movies={tvShows} />
      )}

      {horrorMovies?.results && horrorMovies.results.length > 0 && (
        <CategoryRow title="😱 Horror" movies={horrorMovies.results} />
      )}

      {actionMovies?.results && actionMovies.results.length > 0 && (
        <CategoryRow title="💥 Action" movies={actionMovies.results} />
      )}

      {scifiMovies?.results && scifiMovies.results.length > 0 && (
        <CategoryRow title="🚀 Sci-Fi" movies={scifiMovies.results} />
      )}

      {animationMovies?.results && animationMovies.results.length > 0 && (
        <CategoryRow title="🎨 Animation" movies={animationMovies.results} />
      )}

      {thrillerMovies?.results && thrillerMovies.results.length > 0 && (
        <CategoryRow title="🔪 Thriller" movies={thrillerMovies.results} />
      )}

      {romanceMovies?.results && romanceMovies.results.length > 0 && (
        <CategoryRow title="💘 Romance" movies={romanceMovies.results} />
      )}

      <Footer />
    </>
  );
};

export default Index;
