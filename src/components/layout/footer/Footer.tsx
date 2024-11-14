import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: '#f5f5f5', 
        color: '#000', 
        textAlign: 'center',
      }}
    >
      <Typography variant="h6" component="p" fontWeight="bold" gutterBottom>
        TechStore
      </Typography>
      <Box>
        <Link component={RouterLink} to="/" sx={{ mx: 1, textDecoration: 'none', color: 'inherit' }}>
          Home
        </Link>
        <Link component={RouterLink} to="/products" sx={{ mx: 1, textDecoration: 'none', color: 'inherit' }}>
          Products
        </Link>
        <Link component={RouterLink} to="/contact" sx={{ mx: 1, textDecoration: 'none', color: 'inherit' }}>
          Contact
        </Link>
        <Link component={RouterLink} to="/cart" sx={{ mx: 1, textDecoration: 'none', color: 'inherit' }}>
          Cart
        </Link>
      </Box>
      <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
        &copy; {new Date().getFullYear()} TechStore. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
