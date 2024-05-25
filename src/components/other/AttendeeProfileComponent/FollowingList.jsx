import React, { Fragment } from "react";
import { useGetFollowing } from "../../../API/AttendeeProfileApi";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { Box, Button } from "@mui/material";
import OrganizerCard from "../../cards/OrganizerCard";
import OrganizerCardLoading from "../../looding/OrganizerCardLoading";

export default function FollowingList({ id }) {
  const {
    data: following,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useGetFollowing(id);

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
        {
          <>
            {following?.pages?.map((page) => (
              <Fragment key={page.currentPage}>
                {page.data.map((follow) => (
                  <OrganizerCard
                    key={follow.id}
                    displayName={follow.displayName}
                    isVerified={follow.isVerified}
                    organizerId={follow.id}
                    imageUrl={follow.imageUrl}
                    userName={follow.userName}
                  />
                ))}
              </Fragment>
            ))}

            {isFetchingNextPage &&
              Array.from(new Array(8)).map((_, index) => (
                <OrganizerCardLoading key={index} />
              ))}
          </>
        }
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
