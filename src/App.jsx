import { RouterProvider } from "react-router-dom";
import { Router } from "./Routes";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const defaultTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#283593",
    },
    navBarColor: {
      main: "#ffffff",
    },
    navBarColorSecondary: {
      main: "#f7f7fa",
    },
  },
  typography: {
    fontFamily: "DM Sans, sans-serif",
    fontWeightLight: 400, // DM Sans Regular
    fontWeightRegular: 500, // DM Sans Medium
    fontWeightMedium: 500, // DM Sans Medium
    fontWeightBold: 700, // DM Sans Bold
  },
});

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <RouterProvider router={Router} />
    </ThemeProvider>
  );
}
