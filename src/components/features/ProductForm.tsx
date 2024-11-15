import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Snackbar, Alert } from '@mui/material';
import { useProduct } from '../../store/productContext';
import { Product } from '../../types/Product';

interface ProductFormProps {
  onClose: () => void;
}

const ProductForm = ({ onClose }: ProductFormProps) => {
  const { addProduct } = useProduct();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImage(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (!name || !description || !price) {
      alert('Please fill in all fields');
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      name,
      description,
      price: parseFloat(price),
      imageSrc: image ? URL.createObjectURL(image) : '',
    };

    addProduct(newProduct);
    setOpenSnackbar(true);
    onClose();
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add New Product
      </Typography>
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth margin="normal" />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        type="number"
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        component="label"
        sx={{
          backgroundColor: '#4caf50',
          '&:hover': { backgroundColor: '#45a049' },
          marginTop: 2,
        }}
      >
        Upload Image
        <input type="file" hidden onChange={handleImageUpload} />
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{
          marginTop: 2,
        }}
      >
        Add Product
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Product added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductForm;
