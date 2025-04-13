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
      
        
          CINEPLAY
          
            Home
            TV Shows
            Movies
          
        
        
          
            
          
        
      
        
          
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
        
      

      
        
      
    </nav>
  );
};

export default Navbar;
