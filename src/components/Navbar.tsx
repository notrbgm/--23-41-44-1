import { Search, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

interface NavbarProps {
  showAuthModal: () => void;
}

const Navbar = ({ showAuthModal }: NavbarProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleNavigation = (path: string) => {
    setSearchQuery("");
    navigate(path);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent">
      <div className="flex items-center justify-between px-4 py-4 md:px-8">
        {/* Left side navigation */}
        <div className="flex items-center gap-4 md:gap-6">
          <Link to="/" className="text-netflix-red font-bold text-2xl">
            CinePlay
          </Link>
          <div className="hidden md:flex gap-4">
            <Link to="/" className="text-white hover:text-gray-300">Home</Link>
            <Link to="/my-list" className="text-white hover:text-gray-300">My List</Link>
          </div>
        </div>

        {/* Right side navigation */}
        <div className="flex items-center gap-4">
          {/* Login Button */}
          <button onClick={showAuthModal} className="bg-netflix-red text-white px-4 py-2 rounded hover:bg-red-700">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
