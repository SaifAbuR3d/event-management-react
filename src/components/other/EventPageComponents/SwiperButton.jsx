import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";

import { useSwiper } from "swiper/react";

export default function SwiperButton() {
  const swiper = useSwiper();
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <IconButton
        onClick={() => swiper.slidePrev()}
        sx={{
          bgcolor: "#dbdae3",
          borderRadius: "0",
          color: "#6f7287",
          "&:hover": { bgcolor: "#dbdae3" },
        }}
      >
        <ArrowBack />
      </IconButton>
      <IconButton
        onClick={() => swiper.slideNext()}
        sx={{
          bgcolor: "#3f51b5",
          borderRadius: "0",
          color: "#ffffff",
          ml: 1,
          "&:hover": { bgcolor: "#3f51b5" },
        }}
      >
        <ArrowForward />
      </IconButton>
    </Box>
  );
}
