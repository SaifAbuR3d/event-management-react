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
import { LoadingButton } from "@mui/lab";

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

  const { mutateAsync: follow, isPending } = useFollowRequest(fakeAttendee);

  const { mutateAsync: unFollow, isPending: unFollowPending } =
    useUnFollowRequest();

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
          {displayName} {isVerified && <Verified color="secondary" />}
        </Typography>
      </Box>
      {isAttendee ? (
        <Box display="flex" gap={1} justifyContent="center">
          {isFollowing ? (
            <LoadingButton
              onClick={() => unFollow(organizerId)}
              variant="outlined"
              sx={{ width: { xs: "90%", sm: "110%" } }}
              startIcon={<PersonRemoveOutlined />}
              loading={unFollowPending}
            >
              Unfollow
            </LoadingButton>
          ) : (
            <LoadingButton
              onClick={follow}
              variant="contained"
              sx={{ width: { xs: "90%", sm: "110%" } }}
              startIcon={<PersonAddAltOutlined />}
              loading={isPending}
            >
              Follow
            </LoadingButton>
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
            sx={{ width: "130px" }}
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
