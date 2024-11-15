import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import ProductForm from '../components/features/ProductForm';

const AdminPage = () => {
  const [showForm, setShowForm] = useState(false);

  const handleAddProductClick = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Admin Page</Typography>
      <Button variant="contained" color="primary" onClick={handleAddProductClick} sx={{ mt: 2 }}>
        Add Product
      </Button>
      {showForm && <ProductForm onClose={handleFormClose} />}
    </Box>
  );
};

export default AdminPage;
