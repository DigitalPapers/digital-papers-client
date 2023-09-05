import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Box, Toolbar, Divider, Container } from '@mui/material';

import { useState } from 'react';

import HeaderAppBar from '../../components/AppBar';
import SideBar from '../../components/SideBar/SideBar.jsx';
import Copyright from '../../components/Copyright';
import MenuItems from '../../components/SideBar/MenuItems';
import { useAuth0 } from '@auth0/auth0-react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

const drawerWidth = 260;

export default function MainLayout() {
  const { isAuthenticated, user, isLoading } = useAuth0();

  console.log('MainLayout', isAuthenticated, user, isLoading);
  if (!isAuthenticated) {
    return <Navigate to={'/'} />;
  }

  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <Box sx={{ display: 'flex' }}>
        <HeaderAppBar
          drawerWidth={drawerWidth}
          toggleDrawer={toggleDrawer}
          open={open}
        />
        <SideBar open={open} toggleDrawer={toggleDrawer}>
          <Divider />
          <MenuItems />
        </SideBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Outlet />
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
