import { Box } from "@mui/material";
import React from "react";

export default function Container80({ children, style }) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "80%",
        margin: "auto",
        ...style,
      }}
    >
      {children}
    </Box>
  );
}
