import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import AdminPage from '../pages/AdminPage';
import EditProductPage from '../pages/EditProductPage';

const AboutUs = lazy(() => import('../pages/AboutUs'));
const ProductsPage = lazy(() => import('../pages/ProductsPage'));
const CartPage = lazy(() => import('../pages/CartPage'));
const Contact = lazy(() => import('../pages/Contact'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

const LoadingFallback = () => (
  <Container sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
    <CircularProgress />
  </Container>
);

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/edit-product/:id" element={<EditProductPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
