import React from 'react';
import Layout from './components/layout/Layout';
import AppRoutes from './routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './store/cartContext';
import { ProductProvider } from './store/productContext';

const App: React.FC = () => {
  return (
    <CartProvider>
      <ProductProvider>
        <BrowserRouter>
          <Layout>
            <AppRoutes />
          </Layout>
        </BrowserRouter>
      </ProductProvider>
    </CartProvider>
  );
};

export default App;
