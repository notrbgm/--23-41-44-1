import { Search, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchContent } from "@/lib/tmdb";
import { toast } from "sonner";
import MovieDetailsModal from "./MovieDetailsModal";
import NotificationsMenu from "./NotificationsMenu";
import CategoriesMenu from "./CategoriesMenu";
import MobileMenu from "./MobileMenu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AuthModal from "@/components/AuthModal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logOut } from "@/lib/firebase";

interface Movie {
  id: number;
  title: string;
  name: string;
  poster_path: string | null;
  media_type: string;
  number_of_episodes?: number;
}

const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user] = useAuthState(auth);

  const { data: searchResults } = useQuery({
    queryKey: ["search", searchQuery],
    queryFn: () => searchContent(searchQuery),
    enabled: searchQuery.length > 2,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.search-container')) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = (path: string) => {
    setSearchQuery("");
    setIsSearchOpen(false);
    navigate(path);
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.length >= 2) {
      handleNavigation(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => document.querySelector('.search-input')?.focus(), 100);
    } else {
      setSearchQuery("");
    }
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  const showMyList = () => {
    navigate("/my-list");
  };

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-white text-xl">CINEPLAY</div>
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-white">Home</Link>
          <Link to="/tv-shows" className="text-white">TV Shows</Link>
          <Link to="/movies" className="text-white">Movies</Link>

          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-500 cursor-pointer" onClick={toggleSearch} />
            {isSearchOpen && (
              <input
                className="search-input border p-2 rounded"
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchInput}
                onKeyDown={handleSearchKeyPress}
              />
            )}
          </div>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <User className="h-6 w-6 cursor-pointer text-white" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={showMyList}>My List</DropdownMenuItem>
                <DropdownMenuItem>Account Settings</DropdownMenuItem>
                <DropdownMenuItem>Legal Disclaimer</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Log Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button className="text-white" onClick={() => setIsAuthModalOpen(true)}>
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Display search results */}
      {searchQuery.length > 2 && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg z-50">
          <div className="px-4 py-2 text-gray-700">
            <p>See all results for "{searchQuery}"</p>
          </div>
          {searchResults?.slice(0, 5).map((result: any) => (
            <div key={result.id} onClick={() => handleMovieSelect(result)} className="flex items-center p-4 cursor-pointer hover:bg-gray-200">
              {result.poster_path ? (
                <img src={`https://image.tmdb.org/t/p/w500${result.poster_path}`} alt={result.title || result.name} className="w-16 h-24 object-cover" />
              ) : (
                <div className="w-16 h-24 bg-gray-200" />
              )}
              <div className="ml-4">
                <p>{result.title || result.name}</p>
                <p className="text-sm text-gray-500">{result.media_type === 'movie' ? 'Movie' : 'TV Show'} {result.media_type === 'tv' && result.number_of_episodes && `(${result.number_of_episodes} episodes)`}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedMovie && <MovieDetailsModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
      {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
    </nav>
  );
};

export default Navbar;
