import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { CartItem as CartItemType } from '../../store/cartContext';

interface CartItemProps {
  item: CartItemType;
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
      <Box>
        <Typography variant="body1">{item.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          ${item.price.toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Qty: {item.quantity}
        </Typography>
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
