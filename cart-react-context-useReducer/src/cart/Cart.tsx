import { Link } from "react-router-dom";
import { CartItem } from "../types";
import { formatCurrency } from "../helpers/formatCurrency";

const cartItems: CartItem[] = [
  {
    product: {
      id: "1",
      name: "Product 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 12,
      imageUrl: "https://source.unsplash.com/random/200x200?sig=1",
    },
    quantity: 1,
  },
  {
    product: {
      id: "2",
      name: "Product 2",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 22,
      imageUrl: "https://source.unsplash.com/random/200x200?sig=2",
    },
    quantity: 2,
  },
];

export const Cart = () => {
  const getTotal = () => {
    return cartItems.reduce((total, cartItem) => {
      return total + cartItem.product.price * cartItem.quantity;
    }, 0);
  };

  return (
    <>
      <h1>Cart</h1>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((cartItem) => (
            <tr key={cartItem.product.id}>
              <td className="product-head">
                <img
                  src={cartItem.product.imageUrl}
                  alt={cartItem.product.name}
                  className="product-image"
                />
                <h4>
                  <Link to="#">{cartItem.product.name}</Link>
                </h4>
              </td>
              <td>
                <div className="product-quantity">
                  <button className="btn-left">-</button>
                  <span className="product-quantity_value">
                    {cartItem.quantity}
                  </span>
                  <button className="btn-right">+</button>
                </div>
              </td>
              <td>
                {formatCurrency(cartItem.product.price * cartItem.quantity)}
              </td>
            </tr>
          ))}
          <td colSpan={2} className="total-cell">
            Total:
          </td>
          <td>
            <span className="total">{formatCurrency(getTotal())}</span>
          </td>
        </tbody>
      </table>
    </>
  );
};
