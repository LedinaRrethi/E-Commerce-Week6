import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, TextField, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { Product } from '../../types/Product';

interface ProductCardProps {
  product: Product;
  isDetailsPage?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isDetailsPage = false }) => {
  const { addProduct, setProductQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addProduct(product.id, quantity, product.name, product.price, product.imageSrc);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Number(event.target.value));
    setQuantity(value);
    setProductQuantity(product.id, value);
  };

  const handleViewDetails = () => {
    navigate(`/productDetails/${product.id}`);
  };

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      <CardMedia component="img" height="200" image={product.imageSrc} alt={product.name} />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="body1" color="text.primary" sx={{ mt: 1 }}>
          ${product.price.toFixed(2)}
        </Typography>

        <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
          <Box display="flex" alignItems="center" mb={2}>
            <TextField
              type="number"
              label="Quantity"
              value={quantity}
              onChange={handleQuantityChange}
              inputProps={{ min: 1 }}
              size="small"
              sx={{ width: 80, marginRight: 1 }}
            />
            <Button variant="contained" color="primary" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </Box>

          {isDetailsPage && (
            <Box display="flex" justifyContent="space-between" width="100%">
              <Button variant="outlined" color="secondary" onClick={handleViewDetails} sx={{ flex: 1 }}>
                View Details
              </Button>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
