import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSwiper } from "swiper/react";

export default function SwiperButton() {
  const swiper = useSwiper();
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <IconButton
        onClick={() => swiper.slidePrev()}
        sx={{ bgcolor: "#dbdae3", borderRadius: "0", color: "#6f7287" }}
      >
        <ArrowBack />
      </IconButton>
      <IconButton
        onClick={() => swiper.slideNext()}
        sx={{ bgcolor: "#4b4d63", borderRadius: "0", color: "#ffffff", ml: 1 }}
      >
        <ArrowForward />
      </IconButton>
    </Box>
  );
}
