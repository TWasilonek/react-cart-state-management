import { CartItem } from "../types";

export type CartState = {
  cartItems: CartItem[];
};

export type CartAction = {
  type: string;
  payload: CartItem;
};

export const CART_ACTIONS = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  INCREMENT_QUANTITY: "INCREMENT_QUANTITY",
  DECREMENT_QUANTITY: "DECREMENT_QUANTITY",
};

const addItem = (state: CartState, item: CartItem): CartState => {
  const newCartItems = [...state.cartItems];
  const itemIndex = newCartItems.findIndex(
    (cartItem) => cartItem.product.id === item.product.id
  );

  // if item is already in the cart, don't update the state
  if (itemIndex > -1) {
    return { ...state };
  }

  newCartItems.push({ ...item, quantity: 1 });
  return { ...state, cartItems: newCartItems };
};

const removeItem = (state: CartState, item: CartItem): CartState => {
  const newCartItems = [...state.cartItems];
  const itemIndex = newCartItems.findIndex(
    (cartItem) => cartItem.product.id === item.product.id
  );

  // if item is not in cart, don't update the state
  if (itemIndex === -1) {
    return { ...state };
  }

  newCartItems.splice(itemIndex, 1);
  return { ...state, cartItems: newCartItems };
};

const incrementQuantity = (state: CartState, item: CartItem): CartState => {
  const newCartItems = [...state.cartItems];
  const itemIndex = newCartItems.findIndex(
    (cartItem) => cartItem.product.id === item.product.id
  );

  // if item is not in cart, don't update the state
  if (itemIndex === -1) {
    return { ...state };
  }

  const newItem = { ...newCartItems[itemIndex] };
  newItem.quantity++;
  newCartItems[itemIndex] = newItem;

  return { ...state, cartItems: newCartItems };
};

const decrementQuantity = (state: CartState, item: CartItem): CartState => {
  const newCartItems = [...state.cartItems];
  const itemIndex = newCartItems.findIndex(
    (cartItem) => cartItem.product.id === item.product.id
  );

  // if item is not in cart,don't update the state
  if (itemIndex === -1) {
    return { ...state };
  }

  const newItem = { ...newCartItems[itemIndex] };
  newItem.quantity--;
  newCartItems[itemIndex] = newItem;

  // if the decremented item quantity is 0, remove the item
  if (newCartItems[itemIndex].quantity === 0) {
    newCartItems.splice(itemIndex, 1);
  }

  return { ...state, cartItems: newCartItems };
};

export const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM:
      return addItem(state, action.payload);
    case CART_ACTIONS.REMOVE_ITEM:
      return removeItem(state, action.payload);
    case CART_ACTIONS.INCREMENT_QUANTITY:
      return incrementQuantity(state, action.payload);
    case CART_ACTIONS.DECREMENT_QUANTITY:
      return decrementQuantity(state, action.payload);
    default:
      return state;
  }
};
