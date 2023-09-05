import {
  Container,
  Box,
  Typography,
  Button,
  Avatar,
  Stack,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { useAuth0 } from '@auth0/auth0-react';
import { routesMap } from '../../routes/routes-map.js';
export function Login() {
  const { loginWithRedirect } = useAuth0();
  const handleLoginClick = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: routesMap.get('dashboard').get('home').path,
      },
    });
  };
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 9,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" component="h1">
            Inicio de sesión
          </Typography>
          <Typography varian="p" component="p">
            Serás redireccionado a la página de inicio de sesión.
          </Typography>

          <Box sx={{ mt: 5 }}>
            <Stack direction="row" spacing={2}>
              <Button
                onClick={handleLoginClick}
                variant="contained"
                color="primary"
                startIcon={<LoginIcon />}
              >
                Iniciar sesión
              </Button>

              <Button
                variant="contained"
                color="secondary"
                startIcon={<LockOpenIcon />}
              >
                Solicitar acceso
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </>
  );
}
