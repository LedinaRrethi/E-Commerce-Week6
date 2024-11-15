import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import Button from '../core/Button';
import Input from '../core/Input';
import useCart from '../../hooks/useCart';
import { Product } from '../../types/Product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addProduct } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addProduct(product.id, quantity, product.name, product.price, product.imageSrc);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Number(event.target.value));
    setQuantity(value);
  };

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardMedia component="img" height="200" image={product.imageSrc} alt={product.name} />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="body1" color="text.primary" sx={{ mt: 1 }}>
          ${product.price.toFixed(2)}
        </Typography>

        <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
          <Box display="flex" alignItems="center" mb={2}>
            <Input
              label="Quantity"
              value={quantity}
              onChange={handleQuantityChange}
              type="number"
              inputProps={{ min: 1 }}
              sx={{ width: 80, marginRight: 1 }}
            />
            <Button label="Add to Cart" onClick={handleAddToCart} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
