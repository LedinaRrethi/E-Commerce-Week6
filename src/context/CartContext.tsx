import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

interface CartItem {
  id: number;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
}

type CartAction =
  | { type: 'ADD_PRODUCT'; payload: CartItem }
  | { type: 'REMOVE_PRODUCT'; payload: { id: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_STATE'; payload: CartState };

const INITIAL_STATE: CartState = { cartItems: [] };

const CartContext = createContext<{
  cartItems: CartItem[];
  addProduct: (id: number, quantity: number) => void;
  removeProduct: (id: number) => void;
  clearCart: () => void;
}>({
  cartItems: [],
  addProduct: () => {},
  removeProduct: () => {},
  clearCart: () => {},
});

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_PRODUCT': {
      const existingProduct = state.cartItems.find((item) => item.id === action.payload.id);
      return {
        ...state,
        cartItems: existingProduct
          ? state.cartItems.map((item) =>
              item.id === action.payload.id ? { ...item, quantity: item.quantity + action.payload.quantity } : item
            )
          : [...state.cartItems, action.payload],
      };
    }
    case 'REMOVE_PRODUCT':
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload.id),
      };
    case 'CLEAR_CART':
      return INITIAL_STATE;
    case 'SET_STATE':
      return action.payload;
    default:
      return state;
  }
};

export const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [storedCart, setStoredCart] = useLocalStorage<CartState>('cart', INITIAL_STATE);
  const [state, dispatch] = useReducer(cartReducer, storedCart);

  const addProduct = useCallback((id: number, quantity: number) => {
    dispatch({ type: 'ADD_PRODUCT', payload: { id, quantity } });
  }, []);

  const removeProduct = useCallback((id: number) => {
    dispatch({ type: 'REMOVE_PRODUCT', payload: { id } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  useEffect(() => {
    setStoredCart(state);
  }, [state, setStoredCart]);

  return (
    <CartContext.Provider value={{ cartItems: state.cartItems, addProduct, removeProduct, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
