import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Tooltip, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Button from '../core/Button';
import Input from '../core/Input';
import useCart from '../../hooks/useCart';
import { Product } from '../../types/Product';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addProduct } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAddToCart = () => {
    addProduct(product.id, quantity, product.name, product.price, product.imageSrc);
    setSnackbarOpen(true);
  };

  const handleEdit = () => {
    navigate(`/edit-product/${product.id}`);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Number(event.target.value));
    setQuantity(value);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          maxWidth: 300,
          border: '1px solid #ddd',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={product.imageSrc}
          alt={product.name}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Tooltip title={product.name} placement="top" arrow>
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {product.name}
            </Typography>
          </Tooltip>

          <Tooltip title={product.description} placement="top" arrow>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                textAlign: 'center',
              }}
            >
              {product.description}
            </Typography>
          </Tooltip>

          <Typography variant="body1" color="text.primary" sx={{ mt: 1, textAlign: 'center', fontWeight: 'bold' }}>
            ${product.price.toFixed(2)}
          </Typography>

          <Box display="flex" alignItems="center" justifyContent="space-between" mt={2} flexWrap="wrap" gap={1}>
            <Input
              label="Qty"
              value={quantity}
              onChange={handleQuantityChange}
              type="number"
              inputProps={{ min: 1 }}
              sx={{ width: 70 }}
            />
            <Button label="Add to Cart" onClick={handleAddToCart} />
            <Button label="Edit" variant="outlined" color="secondary" onClick={handleEdit} />
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbarOpen}
        message="Product added successfully!"
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      />
    </>
  );
};

export default ProductCard;
