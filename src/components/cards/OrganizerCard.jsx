import * as React from "react";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Button, Grid } from "@mui/material";
import { PersonRemoveOutlined, Verified } from "@mui/icons-material";
import { useUnFollowRequest } from "../../API/organizerProfileApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function OrganizerCard({
  displayName,
  isVerified,
  organizerId,
  imageUrl,
  userName,
}) {
  const unFollow = useUnFollowRequest();
  const navigate = useNavigate();
  const image = imageUrl
    ? `${import.meta.env.VITE_API_URL}/${imageUrl}`
    : "/static/images/avatar/1.jpg";

  return (
    <Grid
      height={270}
      border={1}
      borderColor="divider"
      position="relative"
      onClick={() => navigate(`/organizer-profile/${userName}`)}
      sx={{ cursor: "pointer" }}
    >
      <Grid
        width={{ xs: "35vw", sm: "25vw", md: "19vw", lg: "15vw", xl: "12.7vw" }}
        height={100}
        bgcolor="#c5cae9"
        position="relative"
        display="flex"
        justifyContent="center"
      >
        <Avatar
          src={image}
          sx={{
            width: "90px",
            height: "90px",
            position: "absolute",
            bottom: "-40%",
          }}
        />
        <Box display="flex" position="absolute" bottom="-90%">
          <Typography align="center">{displayName}</Typography>
          {isVerified && <Verified color="secondary" fontSize="inherit" />}
        </Box>
      </Grid>
      <Grid
        position="absolute"
        height={70}
        bottom={0}
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Button
          onClick={() => unFollow.mutate(organizerId)}
          variant="outlined"
          startIcon={<PersonRemoveOutlined />}
        >
          Unfollow
        </Button>
      </Grid>
    </Grid>
  );
}
