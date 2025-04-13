import { Search, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchContent } from "@/lib/tmdb";
import { toast } from "sonner";
import MovieDetailsModal from "./MovieDetailsModal";
import NotificationsMenu from "./NotificationsMenu";
import CategoriesMenu from "./CategoriesMenu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Movie {
  id: number;
  title: string;
  name: string;
  poster_path: string | null;
  media_type: string;
  number_of_episodes?: number;
}

interface NavbarProps {
  showAuthModal: () => void;
}

const Navbar = ({ showAuthModal }: NavbarProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

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

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent">
      <div className="flex items-center justify-between px-4 py-4 md:px-8">
        {/* Left side navigation */}
        <div className="flex items-center gap-4 md:gap-6">
          <Link to="/" className="text-netflix-red font-bold text-2xl">
            CINEPLAY
          </Link>
          <div className="hidden md:flex gap-4">
            <Link onClick={() => handleNavigation("/")} className="text-white hover:text-gray-300">Home</Link>
            <Link onClick={() => handleNavigation("/category/tv")} className="text-white hover:text-gray-300">TV Shows</Link>
            <Link onClick={() => handleNavigation("/category/movie")} className="text-white hover:text-gray-300">Movies</Link>
          </div>
        </div>

        {/* Right side navigation */}
        <div className="flex items-center gap-4">
          {/* Search Input */}
          <div className="search-container relative">
            <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-500" />
            <input
              type="search"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchInput}
              onKeyDown={handleSearchKeyPress}
              onClick={toggleSearch}
              className={`search-input peer relative h-10 w-full rounded-md bg-gray-900 pl-10 pr-4 text-sm text-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isSearchOpen ? 'w-[200px]' : 'w-0'}`}
            />
          </div>

          {/* Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <User className="h-6 w-6 cursor-pointer text-white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-900 text-white border-none shadow-lg">
              <DropdownMenuItem onClick={showMyList} className="cursor-pointer hover:bg-gray-800">
                My List
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info("Account settings coming soon!")} className="cursor-pointer hover:bg-gray-800">
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={showAuthModal} className="cursor-pointer hover:bg-gray-800">
                Sign In / Sign Up
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigation("/legal")} className="cursor-pointer hover:bg-gray-800">
                Legal Disclaimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Search Results */}
      {isSearchOpen && searchResults && searchResults.length > 0 && searchQuery.length > 2 && (
        
          
            See all results for "{searchQuery}"
          
          {searchResults.slice(0, 5).map((result: any) => (
            
              
                {result.poster_path ? (
                  
                ) : (
                  No Image
                )}
                {result.title || result.name}
                {result.media_type === 'movie' ? 'Movie' : 'TV Show'}
                {result.media_type === 'tv' && result.number_of_episodes && (
                  ({result.number_of_episodes} episodes)
                )}
              
            
          ))}
        
      )}

      {/* Movie Details Modal */}
      {selectedMovie && (
        
      )}
    </nav>
  );
};

export default Navbar;
