import { Link } from "react-router-dom";
import { formatCurrency } from "../helpers/formatCurrency";
import { CartItem } from "../types";
import TrashIcon from "../assets/trash.svg";
import { getTotalPrice } from "../helpers/cartHelpers";
import { useCartStore } from "../store/store";

export const Cart = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const removeItem = useCartStore((state) => state.removeItem);
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);

  const handleIncrementQuantity = (cartItem: CartItem) => {
    incrementQuantity({ ...cartItem });
  };

  const handleDecrementQuantity = (cartItem: CartItem) => {
    decrementQuantity({ ...cartItem });
  };

  const handleRemoveItem = (cartItem: CartItem) => {
    removeItem({ ...cartItem });
  };

  return (
    <>
      <h1>Cart</h1>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th className="product-data-cell">Quantity</th>
            <th className="product-data-cell">Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((cartItem) => (
            <tr key={cartItem.product.id} className="product-row">
              <td className="product-head">
                <img
                  src={cartItem.product.imageUrl}
                  alt={cartItem.product.name}
                  className="product-image"
                  width="60"
                  height="60"
                />
                <h4>
                  <Link to="#">{cartItem.product.name}</Link>
                </h4>
              </td>
              <td className="product-data-cell">
                <div className="product-quantity">
                  <button
                    className="btn-left"
                    onClick={() => handleDecrementQuantity(cartItem)}
                  >
                    -
                  </button>
                  <span className="product-quantity_value">
                    {cartItem.quantity}
                  </span>
                  <button
                    className="btn-right"
                    onClick={() => handleIncrementQuantity(cartItem)}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveItem(cartItem)}
                  className="delete-btn"
                >
                  <img src={TrashIcon} alt="Remove" className="icon" />
                </button>
              </td>
              <td className="product-data-cell">
                {formatCurrency(cartItem.product.price * cartItem.quantity)}
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={3} className="total-cell">
              Total: &nbsp;
              <span className="total">
                {formatCurrency(getTotalPrice(cartItems))}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
