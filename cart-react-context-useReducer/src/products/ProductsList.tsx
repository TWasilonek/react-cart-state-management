import { formatCurrency } from "../helpers/formatCurrency";
import { productsMock } from "../mocks/productsMock";

export const ProductsList = () => {
  return (
    <ul className="product-list">
      {productsMock.map((product) => (
        <li key={product.id} className="product-card">
          <img src={product.imageUrl} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>{formatCurrency(product.price)}</p>
          <button className="btn">+ Add to cart</button>
        </li>
      ))}
    </ul>
  );
};
