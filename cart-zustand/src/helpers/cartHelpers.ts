import { CartItem, Product } from "../types";

export const isInCart = (cartItems: CartItem[], item: Product) => {
  return cartItems.some((cartItem) => cartItem.product.id === item.id);
};

export const getTotalPrice = (cartItems: CartItem[]) => {
  return cartItems.reduce((total, cartItem) => {
    return total + cartItem.product.price * cartItem.quantity;
  }, 0);
};
