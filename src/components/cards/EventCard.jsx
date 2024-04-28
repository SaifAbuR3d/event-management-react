import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Box, Paper } from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  IosShare,
  PeopleOutlineTwoTone,
} from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShareCard from "./ShareCard";
import { UserContext } from "../../contexts/UserContext";
import { useAddLike, useRemoveLike } from "../../API/eventPageApi";

const EventCard = React.memo(function EventCard({
  name,
  id,
  isOnline,
  startDate,
  startTime,
  organizerName,
  numberOfFollers,
  imageUrl,
  isLikedByCurrentUser,
  customStyle,
}) {
  const [open, setOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(isLikedByCurrentUser);
  const navigate = useNavigate();
  const { isOrganizer, isAuthenticated } = React.useContext(UserContext);

  const { mutateAsync: mutateLike, isPending: isPendingLike } = useAddLike(id);

  const handelMutateLike = () =>
    mutateLike()
      .then(setIsLiked(true))
      .catch((error) => {
        console.log(error?.response?.data?.detail);
      });
  const { mutateAsync: mutateDislike, isPending: isPendingDisLike } =
    useRemoveLike(id);
  const handelMutateDislike = () =>
    mutateDislike()
      .then(setIsLiked(false))
      .catch((error) => {
        console.log(error?.response?.data?.detail);
      });

  const handleOpen = (event) => {
    event.stopPropagation();
    setOpen(true);
  };
  const handleClose = (event) => {
    setOpen(false);
  };

  const handelMainDateTime = () => {
    const startDatee = new Date(`${startDate}T${startTime}z`);
    startDatee.setSeconds(0);
    const formattedStartDate = startDatee.toLocaleString("en-US", {
      month: "short",
      weekday: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    return formattedStartDate;
  };
  const url = `http://localhost:3000/event/${id}`;

  return (
    <Card
      onClick={() => navigate(`/event/${id}`)}
      component={Paper}
      elevation={2}
      sx={{
        borderBottomLeftRadius: "4%",
        borderBottomRightRadius: "4%",
        transition: "transform 0.5s ease",
        "&:hover": {
          transform: "scale(1.01)",
        },
        cursor: "pointer",
        ...customStyle,
      }}
    >
      <CardMedia
        component="img"
        height="194"
        image={`${import.meta.env.VITE_API_URL}/${imageUrl}`}
        sx={{ maxWidth: "100%", maxHeight: "100%", margin: "auto" }}
      />
      <CardContent>
        <Box
          color="#283593"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" color="#283593">
            {name}
          </Typography>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {!isOrganizer() && (
              <IconButton
                disabled={isPendingLike || isPendingDisLike}
                onClick={(event) => {
                  event.stopPropagation();
                  if (isAuthenticated()) {
                    if (isLiked) {
                      handelMutateDislike();
                    } else {
                      handelMutateLike();
                    }
                  } else {
                    navigate("/login");
                  }
                }}
              >
                {isLiked ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            )}

            <IconButton onClick={handleOpen}>
              <IosShare />
            </IconButton>
          </Box>
        </Box>

        <Typography variant="body1" color="#283593" mt={1}>
          {handelMainDateTime()}
        </Typography>

        <Typography variant="body1" color="#283593">
          {isOnline ? "Online" : "On Site"}
        </Typography>

        {organizerName && (
          <Typography variant="h6" color="#283593" mt={2}>
            {organizerName}
          </Typography>
        )}

        {numberOfFollers && (
          <Typography variant="body2" color="#283593" display="flex">
            <PeopleOutlineTwoTone fontSize="small" />
            {numberOfFollers}
          </Typography>
        )}
      </CardContent>
      <ShareCard
        open={open}
        handleClose={handleClose}
        label={"Event url"}
        url={`http://localhost:3000/event/${id}`}
      />
    </Card>
  );
});

export default EventCard;
