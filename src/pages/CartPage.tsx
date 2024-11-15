import { useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import CartItem from '../components/features/CartItem';
import useCart from '../hooks/useCart';
import { CartItem as CartItemType } from '../store/cartContext';

const CartPage = () => {
  const { cartItems = [], removeProduct, setProductQuantity, clearCart } = useCart();
  const [message, setMessage] = useState<string>('');

  const handleRemove = (id: number) => {
    if (window.confirm('Are you sure you want to remove this product?')) {
      removeProduct(id);
    }
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    setProductQuantity(id, quantity);
  };

  const handleCheckout = () => {
    setMessage('Proceeding to checkout...');
    // TODO:
  };

  const total = cartItems.reduce((acc: number, item: CartItemType) => acc + item.price * item.quantity, 0);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <Box mb={3}>
        {cartItems.length === 0 ? (
          <Typography>No items in cart</Typography>
        ) : (
          cartItems.map((item: CartItemType) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={() => handleRemove(item.id)}
              onQuantityChange={handleQuantityChange}
            />
          ))
        )}
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
        <Box>
          <Button variant="contained" color="secondary" onClick={clearCart}>
            Clear Cart
          </Button>
          <Button variant="contained" color="primary" onClick={handleCheckout}>
            Checkout
          </Button>
        </Box>
      </Box>
      {message && (
        <Box mt={2}>
          <Typography variant="body1">{message}</Typography>
        </Box>
      )}
    </Container>
  );
};

export default CartPage;
