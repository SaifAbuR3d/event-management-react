import React, { Fragment } from "react";
import { useInView } from "react-intersection-observer";
import { userGetAllFollowingEvents } from "../../../API/HomePageApi";
import EventCard from "../../cards/EventCard";
import { Box, Grid, Typography } from "@mui/material";
import EventCardLoading from "../../looding/EventCardLoading";
import { useEffect } from "react";
import feed from "../../../assets/images/feed.jpg";

export default function AttendeeFeed() {
  const {
    data: FollowingEvents,
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

  const cardStyle = {
    width: {
      xs: "85vw",
      sm: "40vw",
      md: "28vw",
      lg: "21vw",
    },
  };

  const renderFollowingEvents = FollowingEvents?.pages?.map((page) => (
    <Fragment key={page.currentPage}>
      {page.data.map((event) => (
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
          numberOfFollers={event.organizer.followersCount}
        />
      ))}
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

      {FollowingEvents?.pages?.[0]?.data.length === 0 ? (
        <Grid component="section" width="100%" maxWidth="90%" m="auto" mt={4}>
          <Typography variant="h5" sx={{ fontWeight: "bold", marginRight: 2 }}>
            Your Feed
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
              No events available at the moment.
            </Typography>
          </Box>
        </Grid>
      ) : (
        <Grid component="section" width="100%" maxWidth="90%" m="auto" mt={4}>
          <Typography variant="h5" sx={{ fontWeight: "bold", marginRight: 2 }}>
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
      )}
    </>
  );
}
