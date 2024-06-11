import { Box, Skeleton } from "@mui/material";
import React from "react";

export default function SkeletonLoadingCard() {
  return (
    <Box
      sx={{
        m: 2,
        p: 1,
        borderRadius: "17px",
        display: "flex",
        gap: 3,
      }}
    >
      <Skeleton variant="rounded" sx={{ flexBasis: "30%", height: "100px" }} />
      <Box sx={{ display: "flex", flexDirection: "column", flexBasis: "70%" }}>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </Box>
    </Box>
  );
}
