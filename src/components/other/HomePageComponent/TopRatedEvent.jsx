import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useGetTopRatedEvents } from "../../../API/HomePageApi";
import EventCard from "../../cards/EventCard";
import useFetchRatings from "./useFetchRatings";
import EventCardLoading from "../../looding/EventCardLoading";

export default function TopRatedEvent() {
  const { data: TopRatedEvents, isLoading: TopRatedLoading } =
    useGetTopRatedEvents(7, 4);

  const allEvents = TopRatedEvents || [];
  const ratings = useFetchRatings(allEvents);

  const cardStyle = {
    width: {
      xs: "70vw",
      sm: "40vw",
      md: "28vw",
      lg: "21vw",
    },
  };

  const renderTopRatedEvents = TopRatedEvents?.map((event, index) => {
    const rating = ratings[event.id] || 0;

    return (
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
        rating={rating}
      />
    );
  });

  return (
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
        {TopRatedLoading}
        {TopRatedLoading &&
          Array.from(new Array(4)).map((_, index) => (
            <EventCardLoading key={index} customStyle={cardStyle} />
          ))}
      </Box>
    </Grid>
  );
}
