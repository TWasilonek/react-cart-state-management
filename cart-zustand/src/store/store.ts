import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "../types";

export type CartState = {
  cartItems: CartItem[];
};

export type CartActions = {
  addItem: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
  incrementQuantity: (item: CartItem) => void;
  decrementQuantity: (item: CartItem) => void;
};

export const useCartStore = create<CartState & CartActions>()(
  persist(
    (set, get) => ({
      cartItems: [],
      addItem: (item: CartItem) => {
        const items = get().cartItems;
        const itemIndex = findItemIndex(items, item);

        if (itemIndex === -1) {
          set({ cartItems: [...items, { ...item, quantity: 1 }] });
        }
      },
      removeItem: (item: CartItem) => {
        const items = get().cartItems;
        const itemIndex = findItemIndex(items, item);

        if (itemIndex > -1) {
          items.splice(itemIndex, 1);
          set({ cartItems: [...items] });
        }
      },
      incrementQuantity: (item: CartItem) => {
        const items = get().cartItems;
        const itemIndex = findItemIndex(items, item);

        if (itemIndex > -1) {
          items[itemIndex].quantity++;
          set({ cartItems: [...items] });
        }
      },
      decrementQuantity: (item: CartItem) => {
        const items = get().cartItems;
        const itemIndex = findItemIndex(items, item);

        if (itemIndex > -1) {
          items[itemIndex].quantity--;

          // if the decremented item quantity is 0, remove the item
          if (items[itemIndex].quantity === 0) {
            items.splice(itemIndex, 1);
          }

          set({ cartItems: [...items] });
        }
      },
    }),
    { name: "cart-storage" }
  )
);

const findItemIndex = (cartItems: CartItem[], item: CartItem) => {
  return cartItems.findIndex(
    (cartItem) => cartItem.product.id === item.product.id
  );
};
