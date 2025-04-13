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
import AuthModal from "@/components/AuthModal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logOut } from "@/lib/firebase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
      if (!target.closest(".search-container")) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent p-4 flex justify-between items-center text-white">
      <Link to="/" className="text-2xl font-bold">
        CINEPLAY
      </Link>

      <div className="flex items-center gap-4">
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/tv-shows")}>TV Shows</button>
        <button onClick={() => navigate("/movies")}>Movies</button>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <User className="h-6 w-6 cursor-pointer text-white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => navigate("/my-list")}>
                My List
              </DropdownMenuItem>
              <DropdownMenuItem>Account Settings</DropdownMenuItem>
              <DropdownMenuItem>Legal Disclaimer</DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Log Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="bg-red-600 px-4 py-1 rounded hover:bg-red-700"
          >
            Sign In
          </button>
        )}
      </div>

      {/* Mount the AuthModal at the bottom */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </nav>
  );
};

export default Navbar;
