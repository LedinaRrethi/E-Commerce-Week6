import { Box, Typography, Container } from '@mui/material';
import WelcomeImage from '../assets/welcome.jpg';

const AboutUs = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
          About TechStore
        </Typography>
        <Typography variant="h6" component="p" sx={{ color: 'text.secondary', mb: 4 }}>
          Welcome to TechStore, your go-to online shop for cutting-edge electronics, home gadgets, and lifestyle
          accessories. We are dedicated to bringing you the best in tech with a focus on quality, innovation, and
          exceptional customer service.
        </Typography>

        <Box
          sx={{
            maxWidth: '100%',
            height: 'auto',
            mb: 4,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img
            src={WelcomeImage}
            alt="TechStore"
            style={{ width: '100%', maxWidth: '600px', height: 'auto', borderRadius: '8px' }}
          />
        </Box>

        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
          Our Mission
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
          Our mission is to empower you with the tools you need to enhance your daily life through technology. Whether
          you're looking for the latest gadgets, home automation solutions, or gaming gear, we have something for
          everyone.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutUs;
