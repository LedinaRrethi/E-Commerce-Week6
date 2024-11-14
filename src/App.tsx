import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/layout/Layout';
import AppRoutes from './routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

const App: React.FC = () => {
  return (
      <CartProvider>
        <BrowserRouter>
          <CssBaseline />
          <Layout>
            <AppRoutes />
          </Layout>
        </BrowserRouter>
      </CartProvider>
  );
};

export default App;
