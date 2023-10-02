import { CartItem } from "../types";

export type CartState = {
  cartItems: CartItem[];
};

export type CartAction = {
  type: string;
  payload: CartItem;
};

const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";

const addItem = (state: CartState, item: CartItem): CartState => {
  const newCartItems = [...state.cartItems];
  const itemIndex = newCartItems.findIndex(
    (cartItem) => cartItem.product.id === item.product.id
  );
  if (itemIndex > -1) {
    newCartItems[itemIndex].quantity++;
  } else {
    newCartItems.push({ ...item, quantity: 1 });
  }
  return { ...state, cartItems: newCartItems };
};

const removeItem = (state: CartState, item: CartItem): CartState => {
  const newCartItems = [...state.cartItems];
  const itemIndex = newCartItems.findIndex(
    (cartItem) => cartItem.product.id === item.product.id
  );
  if (itemIndex > -1) {
    newCartItems[itemIndex].quantity--;
    if (newCartItems[itemIndex].quantity === 0) {
      newCartItems.splice(itemIndex, 1);
    }
  }
  return { ...state, cartItems: newCartItems };
};

// reducer
export const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case ADD_ITEM:
      return addItem(state, action.payload);
    case REMOVE_ITEM:
      return removeItem(state, action.payload);
    default:
      return state;
  }
};
