import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import ProductForm from '../components/features/ProductForm';
import { useProduct } from '../store/productContext';

const AdminPage = () => {
  const [showForm, setShowForm] = useState(false);

  //TODO
  const { clearProducts } = useProduct();

  const handleAddProductClick = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all products?')) {
      clearProducts();
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Admin Page</Typography>
      <Button variant="contained" color="primary" onClick={handleAddProductClick} sx={{ mt: 2 }}>
        Add Product
      </Button>
      {showForm && <ProductForm onClose={handleFormClose} />}
      <Button variant="outlined" color="error" onClick={handleClearAll} sx={{ mt: 2 }}>
        Clear All Products
      </Button>
    </Box>
  );
};

export default AdminPage;
