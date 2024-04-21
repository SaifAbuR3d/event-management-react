import {
  IosShareOutlined,
  PersonAddAltOutlined,
  Verified,
} from "@mui/icons-material";
import { Box, Button, Snackbar, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { followRequest } from "../../API/organizerProfileApi";

export default function ProfileTitleCard({
  displayName,
  isAttendee,
  isFollowing,
  isVerified,
  setIsFollowing,
  attendeeId,
  userName,
}) {
  const [copied, setCopied] = useState(false);

  const handleShareClick = () => {
    const currentUrl = `http://localhost:3000/profile/${userName}`;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1500);
      })
  };

  const fakeAttendee = {
    organizerId: attendeeId,
  };

  const { mutateAsync } = followRequest(fakeAttendee, setIsFollowing);

  return (
    <Box display={"flex"} flexDirection="column" gap={3} 
        alignItems={{xs:"center", md:"start"}}
    >
      <Box display="flex">
        <Typography
          component="h1"
          variant="h4"
          mr={1}
          sx={{ fontSize: "2rem" }}
        >
          {displayName}
        </Typography>

        {isVerified && <Verified color="secondary" />}
      </Box>
      {isAttendee ? (
        <Box display="flex" gap={1} justifyContent="center">
          {isFollowing ? (
            <Button
              variant="outlined"
              sx={{ width: { xs: "90%", sm: "110%" } }}
              startIcon={<PersonRemoveOutlined />}
            >
              Unfollow
            </Button>
          ) : (
            <Button
              onClick={mutateAsync}
              variant="contained"
              sx={{ width: { xs: "90%", sm: "110%" } }}
              startIcon={<PersonAddAltOutlined />}
            >
              Follow
            </Button>
          )}

          <Button
            variant="contained"
            sx={{ width: { xs: "60%", sm: "70%", lg: "70%" } }}
            startIcon={<IosShareOutlined />}
            onClick={handleShareClick}
          >
            Share
          </Button>

          <Snackbar
            open={copied}
            message="Copied!"
            autoHideDuration={1500} 
          />

        </Box>
      ) : (
        <>
          <Button
            variant="contained"
            sx={{ width: { xs: "70%", md:"23%" } }}
            startIcon={<IosShareOutlined />}
            onClick={handleShareClick}
          >
            Share
          </Button>
          <Snackbar
            open={copied}
            message="Copied!"
            autoHideDuration={2000} // Automatically hide after 2 seconds
            onClose={() => setCopied(false)}
          />
        </>
      )}
    </Box>
  );
}
