import { Navigate, Outlet } from "react-router-dom";
import { Box, Toolbar, Divider, Container } from '@mui/material'

import { useAuth } from "../../hooks/AuthProvider";
import { useState } from 'react'

import HeaderAppBar from "../../components/AppBar";
import DrawerStyledComponent from "../../components/Navigation";
import Copyright from '../../components/Copyright';
import MenuItems from "../../components/Navigation/MenuItems";


const drawerWidth = 260;



export default function MainLayout() {
  const { user } = useAuth();
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  if (!user) {
    console.log('Main layout there is not authenticated')
    return <Navigate to={'/login'}></Navigate>
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <HeaderAppBar drawerWidth={drawerWidth} toggleDrawer={toggleDrawer} open={open} />
      <DrawerStyledComponent open={open} toggleDrawer={toggleDrawer}>
        <Divider />
        <MenuItems />
      </DrawerStyledComponent>
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
    </Box >
  )
}