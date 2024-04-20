import {
  IosShareOutlined,
  PersonAddAltOutlined,
  Verified,
} from "@mui/icons-material";
import { Box, Button, Snackbar, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";

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

  const { mutateAsync, isPending: followOrganizerPending } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/Attendees/my/follows`,
        fakeAttendee,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InlhemVlZCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InlhemVlZEBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBdHRlbmRlZSIsImV4cCI6MTcxMTQ0MTEwMCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwIn0.nK_MZlfOTw4Fyic7K414WBg02Pk5sJh4BSwzqbUl4OE`,
          },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      //queryClient.invalidateQueries(["profileOwnerData"]);
      setIsFollowing(true);
    },
  });

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
