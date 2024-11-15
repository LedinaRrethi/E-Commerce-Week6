import React from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import { CartItem as CartItemType } from '../../store/cartContext';

interface CartItemProps {
  item: CartItemType;
  onRemove: () => void;
  onQuantityChange: (id: number, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove, onQuantityChange }) => {
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = Math.max(1, Number(event.target.value));
    onQuantityChange(item.id, quantity);
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
      <Box display="flex" alignItems="center">
        <img src={item.imageSrc} alt={item.name} width={80} height={80} style={{ marginRight: 16 }} />
        <Box>
          <Typography variant="body1">{item.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            ${item.price.toFixed(2)}
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="body2" color="text.secondary" mr={2}>
              Qty:
            </Typography>
            <TextField
              type="number"
              value={item.quantity}
              onChange={handleQuantityChange}
              inputProps={{ min: 1 }}
              size="small"
              sx={{ width: 60 }}
            />
          </Box>
        </Box>
      </Box>
      <Box>
        <Button variant="outlined" color="error" onClick={onRemove}>
          Remove
        </Button>
      </Box>
    </Box>
  );
};

export default CartItem;
