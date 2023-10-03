import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../types";
import { RootState } from "./store";

export type CartState = {
  cartItems: CartItem[];
};

const initialState: CartState = {
  cartItems: [],
};

const findItemIndex = (cartItems: CartItem[], item: CartItem) => {
  return cartItems.findIndex(
    (cartItem) => cartItem.product.id === item.product.id
  );
};

const addItemReducer = (state: CartState, action: PayloadAction<CartItem>) => {
  const itemIndex = findItemIndex(state.cartItems, action.payload);

  if (itemIndex === -1) {
    state.cartItems.push({ ...action.payload, quantity: 1 });
  }
};

const removeItemReducer = (
  state: CartState,
  action: PayloadAction<CartItem>
) => {
  const itemIndex = findItemIndex(state.cartItems, action.payload);

  if (itemIndex > -1) {
    state.cartItems.splice(itemIndex, 1);
  }
};

const incrementQuantityReducer = (
  state: CartState,
  action: PayloadAction<CartItem>
) => {
  const itemIndex = findItemIndex(state.cartItems, action.payload);

  if (itemIndex > -1) {
    state.cartItems[itemIndex].quantity++;
  }
};

const decrementQuantityReducer = (
  state: CartState,
  action: PayloadAction<CartItem>
) => {
  const itemIndex = findItemIndex(state.cartItems, action.payload);

  if (itemIndex > -1) {
    state.cartItems[itemIndex].quantity--;

    // if the decremented item quantity is 0, remove the item
    if (state.cartItems[itemIndex].quantity === 0) {
      state.cartItems.splice(itemIndex, 1);
    }
  }
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: addItemReducer,
    removeItem: removeItemReducer,
    incrementQuantity: incrementQuantityReducer,
    decrementQuantity: decrementQuantityReducer,
  },
});

export const { addItem, removeItem, incrementQuantity, decrementQuantity } =
  cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.cartItems;

export const cartReducer = cartSlice.reducer;
