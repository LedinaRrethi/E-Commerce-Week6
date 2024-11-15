import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import MenuIcon from '@mui/icons-material/Menu';

import { useState } from 'react';
import { Link } from 'react-router-dom';

const PAGES = ['About us', 'Products', 'Contact', 'Cart'];

const DrawerComponent = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List sx={{ width: 250 }}>
          {PAGES.map((page, index) => (
            <ListItemButton
              key={index}
              component={Link}
              to={`/${page.toLowerCase().replace(' ', '')}`}
              onClick={() => setOpenDrawer(false)}
            >
              <ListItemText primary={page} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <IconButton edge="start" color="inherit" onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default DrawerComponent;
