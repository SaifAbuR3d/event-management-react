import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

export default function MainLoding({isLoading}) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <CircularProgress color="primary" size={"70px"} />
    </Backdrop>
  );
}
