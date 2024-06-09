import { Grid, Box, Typography, Button, useMediaQuery } from "@mui/material";
import React from "react";
import intro from "../../assets/images/intro5.jpg";
import {
  useGetAllCategories,
  useGetEventMayLike,
  useGetEventNearYou,
  useGetTopRatedEvents,
} from "../../API/HomePageApi";
import CategoriesCard from "../cards/CategoriesCard";
import EventCard from "../cards/EventCard";
import { useState } from "react";
import { useEffect } from "react";

export default function Home() {
  const [defaultPosition, setDefaultPosition] = useState([31.8996, 35.2042]);

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

  console.log(defaultPosition);
  
  const isFullScreen = useMediaQuery("(max-width: 700px)");

  const { data: Categories, isLoading: CategoryLoading } =
    useGetAllCategories();

  const { data: TopRatedEvents, isLoading: TopRatedLoading } =
    useGetTopRatedEvents(7, 4);

  const { data: EventMayLike, isLoading: MayLikeLoading } =
    useGetEventMayLike();

  const { data: EventNearYou, isLoading: EventNearLoading } =
    useGetEventNearYou(defaultPosition[0], defaultPosition[1], 8000, 4);

  const renderCategories = Categories?.map((c, index) => {
    return <CategoriesCard key={index} name={c.name} />;
  });

  const renderTopRatedEvents = TopRatedEvents?.map((event, index) => {
    return (
      <EventCard
        key={index}
        id={event.id}
        imageUrl={event.thumbnailUrl}
        name={event.name}
        isOnline={event.isOnline}
        startDate={event.startDate}
        startTime={event.startTime}
        customStyle={cardStyle}
        isLikedByCurrentUser={event.isLikedByCurrentUser}
      />
    );
  });

  const renderEventMayLike = EventMayLike?.map((event, index) => {
    return (
      <EventCard
        key={index}
        id={event.id}
        imageUrl={event.thumbnailUrl}
        name={event.name}
        isOnline={event.isOnline}
        startDate={event.startDate}
        startTime={event.startTime}
        customStyle={cardStyle}
        isLikedByCurrentUser={event.isLikedByCurrentUser}
      />
    );
  });

  const renderEventNear = EventNearYou?.map((event, index) => {
    return (
      <EventCard
        key={index}
        id={event.id}
        imageUrl={event.thumbnailUrl}
        name={event.name}
        isOnline={event.isOnline}
        startDate={event.startDate}
        startTime={event.startTime}
        customStyle={cardStyle}
        isLikedByCurrentUser={event.isLikedByCurrentUser}
      />
    );
  });

  const cardStyle = {
    width: {
      xs: "70vw",
      sm: "40vw",
      md: "28vw",
      lg: "21vw",
    },
  };

  return (
    <Grid container>
      <Grid component="section" width="100%">
        <Box
          width="100%"
          maxHeight="550px"
          sx={{
            position: "relative",
            backgroundImage: `url(${intro})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            aspectRatio: "16/9",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              display: "flex",
              justifyContent: "start",
            }}
          >
            <Box
              p={isFullScreen ? 2 : 5}
              width={isFullScreen ? "45vw" : { sm: "40%", md: "30%" }}
              height="100%"
              sx={{ backgroundColor: "rgba(255, 255, 255, 0.50)" }}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                align="center"
                variant={isFullScreen ? "h6" : "h3"}
                component="h1"
              >
                Event Aura
              </Typography>
              <Typography
                variant={isFullScreen ? "body1" : "h6"}
                align="center"
              >
                Start planning your dream event with Event Aura today!
              </Typography>

              <Button
                variant="contained"
                sx={{
                  fontSize: isFullScreen ? "8px" : "13px",
                  height: isFullScreen ? "30px" : "45px",
                }}
              >
                Find Your Next Event
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>

      <Grid
        component="section"
        width="100%"
        height="250px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        m="auto"
        sx={{ overflowX: "auto" }}
        whiteSpace="nowrap"
        borderBottom="#bdbdbd solid 1px"
      >
        {renderCategories}
      </Grid>

      <Grid component="section" width="100%" maxWidth="90%" m="auto" mt={4}>
        <Typography variant="h5" ml={1}>
          Top rated events
        </Typography>
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
          {renderTopRatedEvents}
        </Box>
      </Grid>

      <Grid component="section" width="100%" maxWidth="90%" m="auto" mt={4}>
        <Typography variant="h5" ml={1}>
          Event you may like
        </Typography>
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
          {renderEventMayLike}
        </Box>
      </Grid>

      <Grid component="section" width="100%" maxWidth="90%" m="auto" mt={4}>
        <Typography variant="h5" ml={1}>
          Event near you
        </Typography>
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
          {renderEventNear}
        </Box>
      </Grid>
    </Grid>
  );
}
