import { Link } from "react-router-dom";
import { isInCart } from "../helpers/cartHelpers";
import { formatCurrency } from "../helpers/formatCurrency";
import { productsMock } from "../mocks/productsMock";
import { Product } from "../types";
import {
  useAppDispatch,
  useAppSelector,
  selectCartItems,
  addItem,
} from "../store";

export const ProductsList = () => {
  const cartItems = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();

  const handleAddToCart = (product: Product) => {
    dispatch(addItem({ product, quantity: 1 }));
  };

  return (
    <ul className="product-list">
      {productsMock.map((product) => (
        <li key={product.id} className="product-card">
          <img
            src={product.imageUrl}
            alt={product.name}
            width="300"
            height="300"
          />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>{formatCurrency(product.price)}</p>
          {isInCart(cartItems, product) ? (
            <Link to="/cart">Added to cart</Link>
          ) : (
            <button onClick={() => handleAddToCart(product)}>
              + Add to cart
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};
