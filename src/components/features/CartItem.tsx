import React from 'react';
import { Box, Typography } from '@mui/material';
import Button from '../core/Button';
import Input from '../core/Input';
import { CartItem as CartItemType } from '../../store/cartContext';

interface CartItemProps {
  item: CartItemType;
  onRemove: () => void;
  onQuantityChange: (id: number, quantity: number) => void;
}

const CartItem = ({ item, onRemove, onQuantityChange }: CartItemProps) => {
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
            <Input
              value={item.quantity}
              onChange={handleQuantityChange}
              type="number"
              inputProps={{ min: 1 }}
              sx={{ width: 60 }}
              label={''}
            />
          </Box>
        </Box>
      </Box>
      <Box>
        <Button label="Remove" color="error" onClick={onRemove} />
      </Box>
    </Box>
  );
};

export default CartItem;
