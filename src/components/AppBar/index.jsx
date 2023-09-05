import {
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Avatar,
} from '@mui/material';

import AppBarStyled from './styles';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocalStorage } from '../../hooks/useLocalStorage.js';

export default function HeaderAppBar({ toggleDrawer, open: toggleOpen }) {
  const { logout, user } = useAuth0();
  console.log('header user', user);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout({
      logoutParams: { returnTo: window.location.origin },
    }).then(() => {
      console.log('logged out');
    });
  };

  return (
    <>
      <AppBarStyled position="absolute" open={toggleOpen}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(toggleOpen && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>

          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            keepMounted
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
          </Menu>
        </Toolbar>
      </AppBarStyled>
    </>
  );
}
