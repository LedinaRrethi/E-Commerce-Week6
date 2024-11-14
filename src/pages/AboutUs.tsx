import React from 'react';
import { Typography, Container } from '@mui/material';

const AboutUs: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>
      <Typography>
        TechStore is your one-stop shop for the latest tech gadgets and accessories. We aim to bring you the best products at competitive prices.
      </Typography>
    </Container>
  );
};

export default AboutUs;
