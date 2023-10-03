import { Link } from "react-router-dom";
import cartIcon from "../assets/cart.svg";
import "../App.css";

export const Nav = () => {
  return (
    <nav className="nav-container">
      <ul className="nav">
        <li className="nav-item">
          <Link to="/">Products</Link>
        </li>
        <li className="nav-item">
          <Link to="/cart">
            <img src={cartIcon} alt="cart link" className="cart-icon" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
