import { useTheme } from "@emotion/react";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useGetEventNearYou } from "../../../API/HomePageApi";
import { Box } from "@mui/system";
import EventCardLoading from "../../looding/EventCardLoading";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import SwiperButton from "../EventPageComponents/SwiperButton";
import EventCard from "../../cards/EventCard";

export default function EventNearYou() {
  const [defaultPosition, setDefaultPosition] = useState([31.8996, 35.2042]);

  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesLG = useMediaQuery(theme.breakpoints.up("lg"));

  const handelSlidesPerView = () => {
    if (matchesSM) {
      return 1;
    } else if (matchesLG) {
      return 3.6;
    } else {
      return 2.6;
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setDefaultPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const { data: EventNearYou, isLoading: EventNearLoading } =
    useGetEventNearYou(defaultPosition[0], defaultPosition[1], 8000, 8);

  const cardStyle = {
    width: {
      xs: "70vw",
      sm: "32vw",
      md: "30vw",
      lg: "23vw",
    },
    mb: 1,
  };

  return (
    <Grid component="section" width="100%" maxWidth="90%" m="auto" mt={4}>
      <Box
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        mb={3}
        mt={4}
        sx={{
          gap: 2,
        }}
      >
        <Swiper
          slidesPerView={handelSlidesPerView()}
          style={{
            display: "flex",
            flexDirection: "column-reverse",
            marginBottom: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold", flexGrow: "1" }}>
              Event Near You
            </Typography>

            <SwiperButton />
          </Box>

          <Box>
            {EventNearYou?.map((event) => (
              <SwiperSlide key={event.id}>
                <EventCard
                  key={event.id}
                  id={event.id}
                  imageUrl={event.thumbnailUrl}
                  name={event.name}
                  isOnline={event.isOnline}
                  startDate={event.startDate}
                  startTime={event.startTime}
                  customStyle={cardStyle}
                  isLikedByCurrentUser={event.isLikedByCurrentUser}
                />
              </SwiperSlide>
            ))}
            {EventNearLoading && (
              <Box display="flex" gap={4}>
                {Array.from(new Array(4)).map((_, index) => (
                  <SwiperSlide key={index}>
                    <EventCardLoading key={index} customStyle={cardStyle} />
                  </SwiperSlide>
                ))}
              </Box>
            )}
          </Box>
        </Swiper>
      </Box>
    </Grid>
  );
}
