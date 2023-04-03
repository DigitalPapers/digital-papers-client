import Routes from "./routes";
import { AuthProvider } from "./hooks/AuthProvider";
import { CssBaseline } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
