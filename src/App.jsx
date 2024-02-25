import { AppRoutes } from './routes/index.jsx';
import { CssBaseline } from '@mui/material';

import { ThemeProvider } from '@mui/material/styles';
import 'dayjs/locale/es';
import { createTheme } from './theme/index.js';

const theme = createTheme();
export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  );
}
