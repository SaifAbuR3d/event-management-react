import React from "react";
import { RouterProvider } from "react-router-dom";
import { Router } from "./Routes";
import { ThemeProvider, createTheme } from "@mui/material";

const defaultTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#283593",
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
        <RouterProvider router={Router} />
    </ThemeProvider>
  );
}
