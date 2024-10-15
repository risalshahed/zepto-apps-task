import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
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