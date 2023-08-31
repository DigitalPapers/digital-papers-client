import { Navigate, Outlet } from 'react-router-dom';
import { Box, Toolbar, Divider, Container } from '@mui/material';

import { useState } from 'react';

import HeaderAppBar from '../../components/AppBar';
import SideBar from '../../components/SideBar/SideBar.jsx';
import Copyright from '../../components/Copyright';
import MenuItems from '../../components/SideBar/MenuItems';
import { useAuth0 } from '@auth0/auth0-react';
import { useAuth } from '../../hooks/AuthProvider.jsx';

const drawerWidth = 260;

export default function MainLayout() {
  const { isAuthenticated } = useAuth0();
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  if (!isAuthenticated) {
    console.log('Main layout there is not authenticated');
    return <Navigate to={'/login'}></Navigate>;
  }

  return (
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
  );
}
