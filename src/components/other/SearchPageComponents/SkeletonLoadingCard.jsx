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
      <Skeleton
        variant="rounded"
        animation="wave"
        sx={{ flexBasis: "30%", height: "150px" }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexBasis: "70%",
          gap: "7px",
        }}
      >
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton
            key={index}
            animation="wave"
            variant="text"
            sx={{ height: "30px" }}
          />
        ))}
      </Box>
    </Box>
  );
}
