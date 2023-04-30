import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import React from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2BA900",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FFFFFF",
      contrastText: "#2BA900",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
