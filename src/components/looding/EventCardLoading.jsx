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
        height={200}
        width={"100%"}
        sx={{ borderTopLeftRadius: "5%", borderTopRightRadius: "5%" }}
      />
      <Skeleton variant="text" animation="wave" width={"90%"} />
      <Skeleton variant="text" animation="wave" width={"60%"} sx={{ mt: 1 }} />
      <Skeleton variant="text" animation="wave" width={"35%"} />
      <Skeleton variant="text" animation="wave" width={"50%"} sx={{ mt: 3 }} />
    </Box>
  );
}
