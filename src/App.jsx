import { AppRoutes } from './routes/index.jsx';
import { CssBaseline } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'dayjs/locale/es';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  );
}
