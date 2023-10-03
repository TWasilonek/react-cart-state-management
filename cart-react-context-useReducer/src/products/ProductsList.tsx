import { formatCurrency } from "../helpers/formatCurrency";
import { productsMock } from "../mocks/productsMock";
import { useCartDispatch } from "../store/cartContext";
import { CART_ACTIONS } from "../store/cartReducer";
import { Product } from "../types";

export const ProductsList = () => {
  const dispatch = useCartDispatch();

  const handleAddToCart = (product: Product) => {
    dispatch &&
      dispatch({
        type: CART_ACTIONS.ADD_ITEM,
        payload: {
          product,
          quantity: 1,
        },
      });
  };

  return (
    <ul className="product-list">
      {productsMock.map((product) => (
        <li key={product.id} className="product-card">
          <img src={product.imageUrl} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>{formatCurrency(product.price)}</p>
          <button className="btn" onClick={() => handleAddToCart(product)}>
            + Add to cart
          </button>
        </li>
      ))}
    </ul>
  );
};
