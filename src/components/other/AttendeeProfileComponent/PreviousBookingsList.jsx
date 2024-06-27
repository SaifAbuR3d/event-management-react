import React, { Fragment } from "react";
import { useGetPreviousBookings } from "../../../API/AttendeeProfileApi";
import EventCard from "../../cards/EventCard";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { Box, Button, Typography } from "@mui/material";
import EventCardLoading from "../../looding/EventCardLoading";

export default function PreviousBookingsList() {
  const { user } = useContext(UserContext);

  const {
    data: PreviousBookings,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useGetPreviousBookings(user?.id);

  const cardStyle = {
    width: {
      xs: "78vw",
      sm: "39vw",
      md: "26.4vw",
      lg: "26vw",
      xl: "20vw",
    },
  };

  return (
    <>
      <Box
        component="div"
        display="flex"
        justifyContent="center"
        flexDirection="row"
        flexWrap="wrap"
        pt={2}
        pb={1}
        gap={2}
      >
        {PreviousBookings?.pages?.map((page) => (
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
                organizerName={event.organizer.displayName}
                customStyle={cardStyle}
                isBooking={true}
              />
            ))}
          </Fragment>
        ))}

        {(isFetchingNextPage || isLoading) &&
          Array.from(new Array(4)).map((_, index) => (
            <EventCardLoading key={index} customStyle={cardStyle} />
          ))}

        {PreviousBookings?.pages?.[0]?.data.length === 0 && (
          <Typography variant="h6" sx={{ color: "gray", p: 10 }}>
            No events available at the moment.
          </Typography>
        )}
      </Box>

      {hasNextPage && (
        <Box width="100%" display="flex" justifyContent="center" mb={1} mt={1}>
          <Button
            sx={{ ml: "auto", mr: "auto" }}
            variant="outlined"
            onClick={fetchNextPage}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            Show More
          </Button>
        </Box>
      )}
    </>
  );
}
