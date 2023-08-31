import Routes from './routes';
import { AuthProvider } from './hooks/AuthProvider';
import { CssBaseline } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/es';
import { Auth0Provider } from '@auth0/auth0-react';
const theme = createTheme();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Auth0Provider
        domain="dev-ib5n44tx.us.auth0.com"
        clientId="A3CsSRkD1OKOrOa3LEXx8cUyihg6q2mZ"
        authorizationParams={{
          redirect_uri: `${window.location.origin}/login`,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
          <Routes />
        </LocalizationProvider>
      </Auth0Provider>
    </ThemeProvider>
  );
}
