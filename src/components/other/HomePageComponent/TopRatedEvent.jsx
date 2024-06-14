import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { useGetTopRatedEvents } from "../../../API/HomePageApi";
import EventCard from "../../cards/EventCard";
import EventCardLoading from "../../looding/EventCardLoading";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import SwiperButton from "../EventPageComponents/SwiperButton";
import { useTheme } from "@emotion/react";

export default function TopRatedEvent() {
  const { data: TopRatedEvents, isLoading: TopRatedLoading } =
    useGetTopRatedEvents(50, 8);

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
    <>
      {TopRatedEvents?.length === 0 ? (
        <Grid component="section" width="100%" maxWidth="90%" m="auto" mt={4}>
          <Typography variant="h5" sx={{ fontWeight: "bold", marginRight: 2 }}>
            Top Rated Event
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            height="40vh"
            sx={{
              gap: 2,
            }}
          >
            <Typography variant="h6" sx={{ color: "gray" }}>
              No top-rated events available at the moment.
            </Typography>
          </Box>
        </Grid>
      ) : (
        <Grid component="section" width="100%" maxWidth="90%" m="auto" mt={4}>
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
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", flexGrow: "1" }}
              >
                Top Rated Events
              </Typography>

              <SwiperButton />
            </Box>

            <Box>
              {TopRatedEvents?.map((event) => {
                return (
                  event?.rateAvg?.average >= 0.5 && (
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
                        rating={event.rateAvg}
                      />
                    </SwiperSlide>
                  )
                );
              })}
              {TopRatedLoading && (
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
        </Grid>
      )}
    </>
  );
}
