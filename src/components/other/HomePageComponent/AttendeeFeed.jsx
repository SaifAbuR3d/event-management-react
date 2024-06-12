import React, { Fragment } from "react";
import { useInView } from "react-intersection-observer";
import { userGetAllFollowingEvents } from "../../../API/HomePageApi";
import EventCard from "../../cards/EventCard";
import { Box, Grid, Typography } from "@mui/material";
import EventCardLoading from "../../looding/EventCardLoading";
import { useEffect } from "react";
import feed from "../../../assets/images/feed.jpg";
import useFetchFollowers from "./useFetchFollowers";

export default function AttendeeFeed() {
  const {
    data: FollowingEvents,
    isLoading: FollowingEventLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = userGetAllFollowingEvents();

  const { ref, inView } = useInView({
    threshold: 1.0,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  const allEvents = FollowingEvents?.pages?.flatMap((page) => page.data) || [];
  const followers = useFetchFollowers(allEvents);

  const cardStyle = {
    width: {
      xs: "70vw",
      sm: "40vw",
      md: "28vw",
      lg: "21vw",
    },
  };

  const renderFollowingEvents = FollowingEvents?.pages?.map((page) => (
    <Fragment key={page.currentPage}>
      {page.data.map((event) => {
        const numberOfFollowers = followers[event.organizer.id] || 0;

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
            isHome={true}
            organizerName={event.organizer.displayName}
            organizerImageUrl={event.organizer.imageUrl}
            numberOfFollers={numberOfFollowers}
          />
        );
      })}
    </Fragment>
  ));

  return (
    <>
      <Grid component="section" width="100%" mt={4}>
        <Box
          width="100%"
          maxHeight="440px"
          sx={{
            position: "relative",
            backgroundImage: `url(${feed})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            aspectRatio: "16/9",
          }}
        />
      </Grid>

      <Grid component="section" width="100%" maxWidth="90%" m="auto" mt={4}>
        <Typography variant="h5" ml={1}>
          Your Feed
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
          {renderFollowingEvents}

          {isFetchingNextPage &&
            Array.from(new Array(8)).map((_, index) => (
              <EventCardLoading key={index} customStyle={cardStyle} />
            ))}
          <div ref={ref}></div>
        </Box>
      </Grid>
    </>
  );
}
