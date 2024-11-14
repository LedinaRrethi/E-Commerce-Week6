import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        textAlign: 'center',
        p: 4,
      }}
    >
      <Box>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#333', mb: 3 }}>
          Page Not Found
        </Typography>
        <Typography variant="h6" sx={{ color: '#777', mb: 4 }}>
          The page you're looking for does not exist. Please check the URL or return to the homepage.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          sx={{
            textDecoration: 'none',
            fontSize: '1rem',
            padding: '10px 20px',
            borderRadius: '5px',
          }}
        >
          Go to Homepage
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;
