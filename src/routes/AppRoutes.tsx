import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import ProductDetailsPage from '../pages/ProductDetails';
import CartPage from '../pages/CartPage';
import AboutUs from '../pages/AboutUs';
import Contact from '../pages/Contact';
import ProductsPage from '../pages/ProductsPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/productDetails/:productId" element={<ProductDetailsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/products" element={<ProductsPage />} />
    </Routes>
  );
};

export default AppRoutes;
