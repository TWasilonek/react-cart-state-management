import { Link } from "react-router-dom";
import { isInCart } from "../helpers/cartHelpers";
import { formatCurrency } from "../helpers/formatCurrency";
import { productsMock } from "../mocks/productsMock";
import { Product } from "../types";
import { useAtom } from "jotai";
import { addItemAtom, cartItemsAtom } from "../store/store";
import { useEffect, useState } from "react";

export const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems] = useAtom(cartItemsAtom);
  const [, addItem] = useAtom(addItemAtom);

  useEffect(() => {
    const fetchProducts = async () => {
      // normally we would fetch products from an API
      const products = await Promise.resolve(productsMock);
      setProducts(products);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addItem({ product, quantity: 1 });
  };

  return (
    <ul className="product-list">
      {products.map((product) => (
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
