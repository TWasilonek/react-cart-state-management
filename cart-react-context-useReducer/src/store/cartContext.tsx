import {
  Dispatch,
  FC,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";
import { CartAction, CartState, cartReducer } from "./cartReducer";

const initialState = {
  cartItems: [],
};

export const CartContext = createContext<CartState>(initialState);
export const CartDispatchContext = createContext<Dispatch<CartAction> | null>(
  null
);

type CartProviderProps = {
  children: ReactNode;
  cartValue?: CartState;
};

export const CartProvider: FC<CartProviderProps> = ({
  children,
  cartValue = initialState,
}) => {
  const [state, dispatch] = useReducer(cartReducer, cartValue);
  return (
    <CartContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
};

export function useCart() {
  return useContext(CartContext);
}

export function useCartDispatch() {
  return useContext(CartDispatchContext);
}
