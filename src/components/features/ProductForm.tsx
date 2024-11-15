import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useProduct } from '../../store/productContext';
import { Product } from '../../types/Product';

interface ProductFormProps {
  productToEdit?: Product;
  onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ productToEdit, onClose }) => {
  const { addProduct, updateProduct } = useProduct();
  const [name, setName] = useState(productToEdit?.name || '');
  const [description, setDescription] = useState(productToEdit?.description || '');
  const [price, setPrice] = useState(productToEdit?.price || '');
  const [image, setImage] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImage(e.target.files[0]);
  };

  const handleSubmit = () => {
    const newProduct: Product = {
      id: productToEdit ? productToEdit.id : Date.now(),
      name,
      description,
      price: Number(price),
      imageSrc: image ? URL.createObjectURL(image) : productToEdit?.imageSrc || '',
    };

    productToEdit ? updateProduct(newProduct) : addProduct(newProduct);
    alert(productToEdit ? 'Product updated successfully!' : 'Product added successfully!');
    onClose();
  };

  return (
    <Box>
      <Typography variant="h5">{productToEdit ? 'Edit Product' : 'Add New Product'}</Typography>
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
      <Button variant="contained" component="label">
        Upload Image
        <input type="file" hidden onChange={handleImageUpload} />
      </Button>
      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
        {productToEdit ? 'Update Product' : 'Add Product'}
      </Button>
    </Box>
  );
};

export default ProductForm;
