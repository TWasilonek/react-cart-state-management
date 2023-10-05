import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { CartItem } from "../types";

export const cartItemsAtom = atomWithStorage<CartItem[]>("cartItems", []);

export const cartCountAtom = atom((get) => {
  return get(cartItemsAtom).length;
});

export const cartTotalAtom = atom((get) => {
  const items = get(cartItemsAtom);
  return items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
});

// Write only atom = this is two way data binding
// Be careful with this pattern, you may sometimes just do the logic in the component, or in the atom setter function (read/write atom)
export const addItemAtom = atom(null, (get, set, item: CartItem) => {
  const items = get(cartItemsAtom);
  const itemIndex = findItemIndex(items, item);

  if (itemIndex === -1) {
    set(cartItemsAtom, [...items, { ...item, quantity: 1 }]);
  }
});

export const removeItemAtom = atom(null, (get, set, item: CartItem) => {
  const items = get(cartItemsAtom);
  const itemIndex = findItemIndex(items, item);

  if (itemIndex > -1) {
    items.splice(itemIndex, 1);
    set(cartItemsAtom, [...items]);
  }
});

export const incrementQuantityAtom = atom(null, (get, set, item: CartItem) => {
  const items = get(cartItemsAtom);
  const itemIndex = findItemIndex(items, item);

  if (itemIndex > -1) {
    items[itemIndex].quantity++;
    set(cartItemsAtom, [...items]);
  }
});

export const decrementQuantityAtom = atom(null, (get, set, item: CartItem) => {
  const items = get(cartItemsAtom);
  const itemIndex = findItemIndex(items, item);

  if (itemIndex > -1) {
    items[itemIndex].quantity--;

    // if the decremented item quantity is 0, remove the item
    if (items[itemIndex].quantity === 0) {
      items.splice(itemIndex, 1);
    }

    set(cartItemsAtom, [...items]);
  }
});

const findItemIndex = (cartItems: CartItem[], item: CartItem) => {
  return cartItems.findIndex(
    (cartItem) => cartItem.product.id === item.product.id
  );
};
