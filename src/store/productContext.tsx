import React, { createContext, useReducer, useContext, ReactNode, useEffect } from 'react';
import { Product } from '../types/Product';
import useFetch from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage';

interface ProductState {
  products: Product[];
}

const ACTION_TYPE = {
  SET_PRODUCTS: 'SET_PRODUCTS',
  ADD_PRODUCT: 'ADD_PRODUCT',
  UPDATE_PRODUCT: 'UPDATE_PRODUCT',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
};

const productReducer = (state: ProductState, action: any): ProductState => {
  switch (action.type) {
    case ACTION_TYPE.SET_PRODUCTS:
      return { ...state, products: action.products };
    case ACTION_TYPE.ADD_PRODUCT:
      return { ...state, products: [...state.products, action.product] };
    case ACTION_TYPE.UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) => (product.id === action.product.id ? action.product : product)),
      };
    case ACTION_TYPE.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.id),
      };
    default:
      return state;
  }
};

const ProductContext = createContext<any>(null);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const { data, loading, error } = useFetch<Product[]>('/data/products.json');
  const [storedProducts, setStoredProducts] = useLocalStorage<Product[]>('products', []);
  const [state, dispatch] = useReducer(productReducer, { products: storedProducts });

  useEffect(() => {
    if (data && !loading && !error && storedProducts.length === 0) {
      // Set initial products from fetched data if storage is empty
      dispatch({ type: ACTION_TYPE.SET_PRODUCTS, products: data });
      setStoredProducts(data);
    }
  }, [data, loading, error, storedProducts.length, setStoredProducts]);

  const addProduct = (product: Product) => {
    dispatch({ type: ACTION_TYPE.ADD_PRODUCT, product });
    setStoredProducts([...state.products, product]);
  };

  const updateProduct = (product: Product) => {
    dispatch({ type: ACTION_TYPE.UPDATE_PRODUCT, product });
    setStoredProducts(state.products.map((p) => (p.id === product.id ? product : p)));
  };

  const deleteProduct = (id: number) => {
    dispatch({ type: ACTION_TYPE.DELETE_PRODUCT, id });
    setStoredProducts(state.products.filter((product) => product.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products: state.products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
