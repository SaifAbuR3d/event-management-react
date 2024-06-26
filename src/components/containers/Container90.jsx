import { Box } from "@mui/material";
import React from "react";

export default function Container90({ children, style }) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "90%",
        margin: "auto",
        ...style,
      }}
    >
      {children}
    </Box>
  );
}
