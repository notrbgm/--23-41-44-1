import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaUserAlt } from "react-icons/fa";
import { HiMenuAlt4 } from "react-icons/hi";
import Logo from "./Logo"; // Assuming you have a logo component

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Logo />
      </div>

      {/* Mobile Menu Button */}
      <div className="navbar__menu-toggle" onClick={toggleMenu}>
        <HiMenuAlt4 size={24} />
      </div>

      {/* Navbar Menu */}
      <div className={`navbar__menu ${isMenuOpen ? "open" : ""}`}>
        <ul className="navbar__links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/movies">Movies</Link></li>
          <li><Link to="/tv-shows">TV Shows</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>

        {/* Search and User Icons */}
        <div className="navbar__actions">
          <button className="navbar__search">
            <FaSearch size={20} />
          </button>

          <Link to="/profile" className="navbar__user">
            <FaUserAlt size={20} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
