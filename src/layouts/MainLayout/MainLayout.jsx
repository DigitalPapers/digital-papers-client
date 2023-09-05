import { Outlet } from 'react-router-dom';
import { Box, Toolbar, Divider, Container } from '@mui/material';

import { useState } from 'react';

import HeaderAppBar from '../../components/AppBar';
import SideBar from '../../components/SideBar/SideBar.jsx';
import Copyright from '../../components/Copyright';
import MenuItems from '../../components/SideBar/MenuItems';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { useAuth0 } from '@auth0/auth0-react';
import { PageLoader } from '../../pages/PageLoader.jsx';

const drawerWidth = 260;

export default function MainLayout() {
  const [open, setOpen] = useState(false);
  const { isLoading } = useAuth0();
  if (isLoading) {
    return <PageLoader />;
  }
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
