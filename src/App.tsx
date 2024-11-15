import React from 'react';
import Layout from './components/layout/Layout';
import AppRoutes from './routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './store/cartContext';

const App: React.FC = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
