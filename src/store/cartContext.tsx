import { createContext, useReducer, useEffect, useCallback, ReactNode } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export interface CartItem {
  id: number;
  quantity: number;
  price: number;
  name: string;
  imageSrc: string;
}

interface CartState {
  cartItems: CartItem[];
}

const ACTION_TYPE = {
  ADD_PRODUCT: 'ADD_PRODUCT',
  REMOVE_PRODUCT: 'REMOVE_PRODUCT',
  SET_QUANTITY: 'SET_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  SET_STATE: 'SET_STATE',
};

const INITIAL_STATE: CartState = { cartItems: [] };

const cartReducer = (state: CartState, action: any): CartState => {
  switch (action.type) {
    case ACTION_TYPE.ADD_PRODUCT:
      const existingProduct = state.cartItems.find((item) => item.id === action.id);
      if (existingProduct) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.id ? { ...item, quantity: item.quantity + action.quantity } : item
          ),
        };
      }

      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          {
            id: action.id,
            quantity: action.quantity,
            name: action.name,
            price: action.price,
            imageSrc: action.imageSrc,
          },
        ],
      };
    case ACTION_TYPE.REMOVE_PRODUCT:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.id),
      };
    case ACTION_TYPE.SET_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.id ? { ...item, quantity: action.quantity } : item
        ),
      };
    case ACTION_TYPE.CLEAR_CART:
      return { ...state, cartItems: [] };
    case ACTION_TYPE.SET_STATE:
      return { ...state, cartItems: action.cartItems || [] };
    default:
      return state;
  }
};

const cartContext = createContext<any>(null);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const [storedCart, setStoredCart] = useLocalStorage<CartState>('cart', INITIAL_STATE);

  const addProduct = useCallback((id: number, quantity: number, name: string, price: number, imageSrc: string) => {
    dispatch({
      type: ACTION_TYPE.ADD_PRODUCT,
      id,
      quantity,
      name,
      price,
      imageSrc,
    });
  }, []);

  const removeProduct = useCallback((id: number) => {
    dispatch({ type: ACTION_TYPE.REMOVE_PRODUCT, id });
  }, []);

  const setProductQuantity = useCallback((id: number, quantity: number) => {
    dispatch({
      type: ACTION_TYPE.SET_QUANTITY,
      id,
      quantity,
    });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: ACTION_TYPE.CLEAR_CART });
  }, []);

  useEffect(() => {
    if (storedCart.cartItems.length > 0) {
      dispatch({
        type: ACTION_TYPE.SET_STATE,
        cartItems: storedCart.cartItems,
      });
    }
  }, [storedCart]);

  useEffect(() => {
    if (JSON.stringify(state) !== JSON.stringify(storedCart)) {
      setStoredCart(state);
    }
  }, [state, storedCart, setStoredCart]);

  return (
    <cartContext.Provider
      value={{ cartItems: state.cartItems, addProduct, removeProduct, setProductQuantity, clearCart }}
    >
      {children}
    </cartContext.Provider>
  );
};

export { cartContext };
