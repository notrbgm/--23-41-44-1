import { useLocation } from "react-router-dom";
import { Search, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import CategoriesMenu from "./CategoriesMenu";
import DropdownMenu from "./DropdownMenu"; // Assuming DropdownMenu is another component
import { toast } from "react-toastify"; // If you're using toast for notifications

const Navbar = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const getNavLinkClass = (path: string) => {
    return location.pathname === path
      ? "text-red-600 font-semibold"
      : "text-white hover:text-gray-300";
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.length >= 2) {
      handleNavigation(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
    if (e.key === 'Escape') {
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        document.querySelector<HTMLInputElement>('.search-input')?.focus();
      }, 100);
    } else {
      setSearchQuery("");
    }
  };

  const handleNavigation = (path: string) => {
    // Navigate to the given path
    window.location.href = path;
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-4 md:gap-8">
          <Link to="/" className="text-red-600 text-2xl md:text-3xl font-bold">
            CINEPLAY
          </Link>
          <MobileMenu />
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => handleNavigation("/")}
              className={getNavLinkClass("/")}
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation("/category/tv")}
              className={getNavLinkClass("/category/tv")}
            >
              TV Shows
            </button>
            <button
              onClick={() => handleNavigation("/category/movie")}
              className={getNavLinkClass("/category/movie")}
            >
              Movies
            </button>
            <CategoriesMenu />
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative search-container">
            <div className="flex items-center">
              {isSearchOpen && (
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-input bg-black/80 text-white px-4 py-2 rounded-l border-r border-gray-700 w-[140px] sm:w-[200px] md:w-[300px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={handleSearchInput}
                  onKeyDown={handleSearchKeyPress}
                  autoFocus
                />
              )}
              <button
                className={`p-2 ${isSearchOpen ? 'bg-black/80 rounded-r' : 'rounded'} hover:bg-white/10 transition-colors`}
                onClick={toggleSearch}
                title="Toggle search"
              >
                <Search className="w-5 h-5 md:w-6 md:h-6 text-white hover:text-gray-300" />
              </button>
              {searchQuery && isSearchOpen && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 text-white hover:text-gray-300"
                  title="Clear search"
                >
                  ✖️
                </button>
              )}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="focus:outline-none transform transition-all duration-200 hover:scale-105" // Added scaling effect on hover
                title="User menu"
              >
                <User className="w-6 h-6 text-white hover:text-gray-300" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-black/90 text-white border-gray-700">
              <DropdownMenuItem onClick={() => toast.info("My List coming soon!")} className="cursor-pointer hover:bg-gray-800">
                My List
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info("Account settings coming soon!")} className="cursor-pointer hover:bg-gray-800">
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigation("/legal")} className="cursor-pointer hover:bg-gray-800">
                Legal Disclaimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
