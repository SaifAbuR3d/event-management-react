import * as React from "react";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Button, Grid } from "@mui/material";
import { PersonRemoveOutlined, Verified } from "@mui/icons-material";
import { useUnFollowRequest } from "../../API/organizerProfileApi";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

export default function OrganizerCard({
  displayName,
  isVerified,
  organizerId,
  imageUrl,
  userName,
}) {
  const { mutateAsync: unFollow, isPending } = useUnFollowRequest();
  const navigate = useNavigate();
  const image = imageUrl
    ? `${import.meta.env.VITE_API_URL}/${imageUrl}`
    : "/static/images/avatar/1.jpg";

  const handleUnFollowClick = async (event) => {
    event.stopPropagation();
    await unFollow(organizerId);
  };

  return (
    <Grid
      height={280}
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
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          position="absolute"
          top="40%"
        >
          <Avatar
            src={image}
            sx={{
              width: "100px",
              height: "100px",
            }}
          />
          <Box display="flex" mt={1}>
            <Typography align="center">
              {displayName}{" "}
              {isVerified && <Verified color="secondary" fontSize="inherit" />}
            </Typography>
          </Box>
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
        <LoadingButton
          onClick={handleUnFollowClick}
          variant="outlined"
          startIcon={<PersonRemoveOutlined />}
          loading={isPending}
        >
          Unfollow
        </LoadingButton>
      </Grid>
    </Grid>
  );
}
