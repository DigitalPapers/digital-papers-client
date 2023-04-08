import Routes from "./routes";
import { AuthProvider } from "./hooks/AuthProvider";
import { CssBaseline } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es";
const theme = createTheme();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
          <Routes />
        </LocalizationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
