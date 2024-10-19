import { Link } from "react-router-dom";
import logo from '../assets/logo.avif'
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <nav>
      <img src={logo} alt='Logo' />
      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>
      <ul className={`${isMenuOpen && 'open'}`}>
        <Link to='/'>
          <li>
            Home
          </li>
        </Link>
        <Link to='/wishlist'>
          <li>
            Wishlist
          </li>
        </Link>
      </ul>
    </nav>
  );
}

export default Navbar;