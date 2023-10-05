import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import cartIcon from "../assets/cart.svg";
import "../App.css";
import { cartCountAtom } from "../store/store";

export const Nav = () => {
  const [cartCount] = useAtom(cartCountAtom);

  return (
    <nav className="nav-container">
      <ul className="nav">
        <li className="nav-item">
          <Link to="/">Products</Link>
        </li>
        <li className="nav-item">
          <Link to="/cart" className="cart-link">
            {cartCount > 0 && (
              <span className="cart-items-count">{cartCount}</span>
            )}
            <img src={cartIcon} alt="cart link" className="cart-icon" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
