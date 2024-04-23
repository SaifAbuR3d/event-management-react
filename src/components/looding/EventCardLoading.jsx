import { Box, Skeleton } from "@mui/material";
import React from "react";

export default function EventCardLoading({ customStyle }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={1}
      sx={{
        ...customStyle,
      }}
    >
      <Skeleton
        variant="rectangular"
        height={240}
        width={"100%"}
        sx={{ borderTopLeftRadius: "5%", borderTopRightRadius: "5%" }}
      />
      <Skeleton
        variant="rectangular"
        height={20}
        width={"100%"}
        sx={{ borderRadius: "2%" }}
      />
      <Skeleton
        variant="rectangular"
        height={20}
        width={"60%"}
        sx={{ borderRadius: "2%" }}
      />
    </Box>
  );
}
