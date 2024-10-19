import { Link } from "react-router-dom";
import logo from '../assets/logo.avif'

const Navbar = () => {
  return (
    <nav>
      <img src={logo} alt='Logo' />
      <ul>
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