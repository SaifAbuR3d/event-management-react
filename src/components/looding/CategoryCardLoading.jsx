import { Box, Skeleton, useMediaQuery } from "@mui/material";
import React from "react";

export default function CategoryCardLoading() {
  const isFullScreen = useMediaQuery("(max-width: 700px)");

  return (
    <Box
      width="180px"
      height="180px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      m={1}
    >
      <Skeleton
        variant="circular"
        sx={{
          width: isFullScreen ? "90px" : "130px",
          height: isFullScreen ? "90px" : "130px",
          mb: 2,
          p: isFullScreen ? 2 : 4,
          cursor: "pointer",
        }}
      />
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} width="60%" />
    </Box>
  );
}
