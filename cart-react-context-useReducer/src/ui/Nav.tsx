import { Link } from "react-router-dom";
import cartIcon from "../assets/cart.svg";
import "../App.css";
import { useCart } from "../store/cartContext";

export const Nav = () => {
  const { cartItems } = useCart();

  return (
    <nav className="nav-container">
      <ul className="nav">
        <li className="nav-item">
          <Link to="/">Products</Link>
        </li>
        <li className="nav-item">
          <Link to="/cart" className="cart-link">
            {cartItems.length > 0 && (
              <span className="cart-items-count">{cartItems.length}</span>
            )}
            <img src={cartIcon} alt="cart link" className="cart-icon" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
