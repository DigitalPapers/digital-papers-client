import { Outlet } from 'react-router-dom';
import { Box, Toolbar, Container } from '@mui/material';

import { useState } from 'react';

import HeaderAppBar from '../../components/AppBar';
import SideBar from '../../components/SideBar/SideBar.jsx';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { useAuth0 } from '@auth0/auth0-react';
import { PageLoader } from '../../pages/PageLoader.jsx';

const drawerWidth = 260;

export default function MainLayout() {
  const [open, setOpen] = useState(false);
  //const { isLoading } = useAuth0();
  // if (isLoading) {
  //   return <PageLoader />;
  // }
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
        <SideBar open={open} toggleDrawer={toggleDrawer} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) => theme.palette.grey[100],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="xl" sx={{ mt: 10 }}>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
