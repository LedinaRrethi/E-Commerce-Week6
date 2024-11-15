import React, { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { Link } from 'react-router-dom';
import DrawerComponent from './navComp/DrawerComp';

const PAGES = ['About us', 'Products', 'Contact'];

const Navbar: React.FC = () => {
  const [value, setValue] = useState<number>(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar position="static" sx={{ bgcolor: 'primary.main', py: 1 }}>
      <Toolbar>
        {isMobile ? (
          <>
            <DrawerComponent />
            <Typography
              variant="h4"
              sx={{
                flexGrow: 1,
                textAlign: 'center',
              }}
            >
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                TechStore
              </Link>
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h5" sx={{ mr: 4 }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                TechStore
              </Link>
            </Typography>
            <Tabs
              value={value}
              onChange={(_, newValue) => setValue(newValue)}
              textColor="inherit"
              indicatorColor="secondary"
            >
              {PAGES.map((page, index) => (
                <Tab
                  key={index}
                  label={
                    <Link
                      to={`/${page.toLowerCase().replace(' ', '')}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      {page}
                    </Link>
                  }
                />
              ))}
            </Tabs>
          </>
        )}

        <Box sx={{ ml: 'auto', display: 'flex', gap: 2 }}>
          <IconButton color="inherit" component={Link} to="/cart">
            <ShoppingCartIcon />
          </IconButton>
          <IconButton color="inherit" component={Link} to="/account">
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
