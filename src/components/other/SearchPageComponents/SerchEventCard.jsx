import { Box, Chip, Paper, Typography, IconButton } from "@mui/material";
import { Favorite, FavoriteBorder, IosShare } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ShareCard from "../../cards/ShareCard";
import { useContext, useState } from "react";
import { useAddLike, useRemoveLike } from "../../../API/eventPageApi";
import { UserContext } from "../../../contexts/UserContext";
import dayjs from "dayjs";

export default function SerchEventCard({ eventData }) {
  const [open, setOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(eventData.isLikedByCurrentUser);
  const host = window.location.host;
  const navigate = useNavigate();

  const { isAttendee } = useContext(UserContext);

  const { mutateAsync: mutateLike, isPending: isPendingLike } = useAddLike(
    eventData.id
  );

  const handelMutateLike = () =>
    mutateLike()
      .then(setIsLiked(true))
      .catch((error) => {
        console.log(error?.response?.data?.detail);
      });
  const { mutateAsync: mutateDislike, isPending: isPendingDisLike } =
    useRemoveLike(eventData.id);
  const handelMutateDislike = () =>
    mutateDislike()
      .then(setIsLiked(false))
      .catch((error) => {
        console.log(error?.response?.data?.detail);
      });

  const handleOpenShareDialog = (e) => {
    e.stopPropagation();
    setOpen(true);
  };
  const handleCloseShareDialog = () => {
    setOpen(false);
  };

  const handelLikeClick = (e) => {
    e.stopPropagation();
    if (isLiked) {
      handelMutateDislike();
    } else {
      handelMutateLike();
    }
  };

  const handelPrice = () => {
    const prices = eventData.tickets.map((item) => item.price);
    return Math.min(...prices);
  };

  handelPrice();

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        m: 2,
        gap: 3,
        p: 1,
        "&:hover": {
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        },
        borderRadius: "17px",
        cursor: "pointer",
      }}
      onClick={() => navigate(`/event/${eventData.id}`)}
    >
      <Box sx={{ height: "150px", flexBasis: "30%" }}>
        <img
          src={`${import.meta.env.VITE_API_URL}/${eventData.thumbnailUrl}`}
          alt="a"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "15px",
          }}
        />
      </Box>
      <Box
        sx={{
          flexBasis: "20%",
          display: "flex",
          flexDirection: "column",
          flexGrow: "1",
        }}
      >
        <Chip
          label={
            eventData.ticketsSalesRunning ? "Sales Running" : "Sales Ended"
          }
          color={eventData.ticketsSalesRunning ? "info" : "default"}
          sx={{ width: "fit-content" }}
        />
        <Typography variant="h6" color="initial">
          {eventData.name}
        </Typography>
        <Typography variant="body1" color="initial">
          {dayjs(
            new Date(`${eventData.startDate}T${eventData.startTime}z`)
          ).format("DD MMM YYYY, hh:mm A")}
        </Typography>
        <Typography variant="body1" color="initial">
          {eventData.organizer.displayName}
        </Typography>
        <Typography variant="body1" color="initial" fontWeight={"bold"}>
          From ${handelPrice()}
        </Typography>
      </Box>
      <Box sx={{ alignSelf: "flex-end" }}>
        <IconButton onClick={handleOpenShareDialog}>
          <IosShare />
        </IconButton>
        <ShareCard
          open={open}
          handleClose={handleCloseShareDialog}
          url={`${host}/event/${eventData.id}`}
          label={"Event URL"}
        />
        {isAttendee() && (
          <IconButton
            onClick={handelLikeClick}
            disabled={isPendingLike || isPendingDisLike}
          >
            {isLiked ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        )}
      </Box>
    </Paper>
  );
}
