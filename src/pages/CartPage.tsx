import { useState } from 'react';
import { Container, Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import CartItem from '../components/features/CartItem';
import useCart from '../hooks/useCart';
import { CartItem as CartItemType } from '../store/cartContext';

const CartPage = () => {
  const { cartItems = [], removeProduct, setProductQuantity, clearCart } = useCart();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleRemove = (id: number) => {
    if (window.confirm('Are you sure you want to remove this product?')) {
      removeProduct(id);
    }
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    setProductQuantity(id, quantity);
  };

  const handleCheckout = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    clearCart();
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
        <Typography variant="h6" fontWeight="bold">
          Total: ${total.toFixed(2)}
        </Typography>
        <Box display="flex" gap={2}>
          <Button variant="outlined" color="error" onClick={clearCart}>
            Clear Cart
          </Button>
          <Button variant="contained" color="primary" onClick={handleCheckout}>
            Checkout
          </Button>
        </Box>
      </Box>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Thank you for your purchase!</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Your order has been placed successfully. We will send you an email confirmation shortly.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            You can continue shopping to add more amazing products to your cart.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="contained" color="primary">
            Continue Shopping
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CartPage;
