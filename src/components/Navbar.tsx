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
  const [selectedMovie, setSelectedMovie] = useState(null);
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
      
        
          CINEPLAY
          
            Home
            TV Shows
            Movies
          
        
        
          
            <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-500" />
            
          

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <User className="h-6 w-6 cursor-pointer text-white" />
              </DropdownMenuTrigger>
              
                
                  My List
                
                
                  Account Settings
                
                
                  Legal Disclaimer
                
                
                  Log Out
                
              
            </DropdownMenu>
          ) : (
            
              Sign In
            
          )}
        
      

      
        
          
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
        
      

      
        
          setSelectedMovie(null)}
        />
      
       
       
    </nav>
  );
};

export default Navbar;
