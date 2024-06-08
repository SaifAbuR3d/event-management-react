import { Box, Skeleton } from "@mui/material";
import React from "react";

export default function OrganizerCardLoading() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      height={270}
      width={{ xs: "35vw", sm: "25vw", md: "19vw", lg: "15vw", xl: "12.7vw" }}
      pt={4}
    >
      <Skeleton
        variant="circular"
        width={80}
        height={80}
        sx={{ m: "auto" }}
      />

      <Skeleton variant="text" width={"50%"} sx={{ m: "auto" }} />
      <Skeleton variant="rectangular" width={"60%"} height={30} sx={{ m: "auto" }} />
    </Box>
  );
}
