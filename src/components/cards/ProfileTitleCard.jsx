import {
  IosShareOutlined,
  PersonAddAltOutlined,
  PersonRemoveOutlined,
  Verified,
} from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import {
  useFollowRequest,
  useUnFollowRequest,
} from "../../API/organizerProfileApi";
import { useState } from "react";
import ShareCard from "./ShareCard";

export default function ProfileTitleCard({
  displayName,
  isAttendee,
  isFollowing,
  isVerified,
  organizerId,
  userName,
}) {
  const [open, setOpen] = useState(false);
  const location = `${window.location.protocol}//${window.location.host}`;

  location;
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fakeAttendee = {
    organizerId: organizerId,
  };

  const { mutateAsync: follow } = useFollowRequest(fakeAttendee);

  const unFollow = useUnFollowRequest();

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      gap={3}
      alignItems={{ xs: "center", md: "start" }}
    >
      <Box display="flex">
        <Typography
          component="h1"
          variant="h4"
          mr={1}
          sx={{ fontSize: "2rem" }}
          align="center"
        >
          {displayName}
        </Typography>

        {isVerified && <Verified color="secondary" />}
      </Box>
      {isAttendee ? (
        <Box display="flex" gap={1} justifyContent="center">
          {isFollowing ? (
            <Button
              onClick={() => unFollow.mutate(organizerId)}
              variant="outlined"
              sx={{ width: { xs: "90%", sm: "110%" } }}
              startIcon={<PersonRemoveOutlined />}
            >
              Unfollow
            </Button>
          ) : (
            <Button
              onClick={follow}
              variant="contained"
              sx={{ width: { xs: "90%", sm: "110%" } }}
              startIcon={<PersonAddAltOutlined />}
            >
              Follow
            </Button>
          )}

          <Button
            onClick={handleOpen}
            variant="contained"
            sx={{ width: { xs: "60%", sm: "70%", lg: "70%" } }}
            startIcon={<IosShareOutlined />}
          >
            Share
          </Button>
        </Box>
      ) : (
        <>
          <Button
            onClick={handleOpen}
            variant="contained"
            sx={{ width: { xs: "70%", md: "23%" } }}
            startIcon={<IosShareOutlined />}
          >
            Share
          </Button>
        </>
      )}

      <ShareCard
        open={open}
        handleClose={handleClose}
        label={"Profile url"}
        url={`${location}/profile/${userName}`}
      />
    </Box>
  );
}
