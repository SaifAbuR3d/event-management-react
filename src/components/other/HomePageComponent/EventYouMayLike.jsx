import { useState } from "react";
import { useGetEventMayLike } from "../../../API/HomePageApi";
import EventCard from "../../cards/EventCard";
import { Box, Grid, Typography, useMediaQuery, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import SwiperButton from "../EventPageComponents/SwiperButton";
import EventCardLoading from "../../looding/EventCardLoading";
import { useTheme } from "@emotion/react";
import InterestDialog from "./InterestDialog";

export default function EventYouMayLike() {
  const [open, setOpen] = useState(false);
  const { data: EventMayLike, isLoading: MayLikeLoading } =
    useGetEventMayLike();

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
      xs: "81vw",
      sm: "32vw",
      md: "30vw",
      lg: "23vw",
    },
    mb: 1,
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {EventMayLike?.length === 0 ? (
        <Grid component="section" width="100%" maxWidth="90%" m="auto" mt={4}>
          <Typography variant="h5" sx={{ fontWeight: "bold", marginRight: 2 }}>
            Event You May Like
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
            <Typography variant="h6" sx={{ color: "gray", m: 0 }}>
              No events available at the moment. set your interests
              <Button
                variant="text"
                onClick={handleOpen}
                sx={{
                  color: "inherit",
                  textTransform: "none",
                  fontSize: "18px",
                  fontWeight: "bold",
                  p: 0,
                  "&:hover": {
                    bgcolor: "transparent",
                    color: "#757ce8",
                  },
                }}
              >
                here
              </Button>
            </Typography>
            <InterestDialog open={open} handleClose={handleClose} />
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
                Event You May Like
              </Typography>

              <SwiperButton />
            </Box>

            <Box>
              {EventMayLike?.map((event) => (
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
              {MayLikeLoading && (
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
