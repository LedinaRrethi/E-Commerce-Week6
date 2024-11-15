import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, TextField, Button, Snackbar, Typography } from '@mui/material';
import { useProduct } from '../store/productContext';

const EditProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { products, editProduct } = useProduct();
  const navigate = useNavigate();

  const product = products.find((prod: { id: number }) => prod.id === parseInt(id || '', 10));
  if (!product) return <Typography>Product not found</Typography>;

  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price.toString());
  const [image, setImage] = useState<File | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImage(e.target.files[0]);
  };

  const handleSave = () => {
    const updatedProduct = {
      ...product,
      name,
      description,
      price: parseFloat(price),
      imageSrc: image ? URL.createObjectURL(image) : product.imageSrc,
    };
    editProduct(updatedProduct);
    setSnackbarOpen(true);
    setTimeout(() => navigate('/products'), 2000);
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Edit Product
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
      <Button variant="contained" component="label" sx={{ mt: 2 }}>
        Upload Image
        <input type="file" hidden onChange={handleImageUpload} />
      </Button>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        message="Product updated successfully!"
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
      />
    </Box>
  );
};

export default EditProductPage;
