import { Box, Chip, Paper, Typography, IconButton } from "@mui/material";
import { Favorite, FavoriteBorder, IosShare } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ShareCard from "../../cards/ShareCard";
import { useContext, useState } from "react";
import { useAddLike, useRemoveLike } from "../../../API/eventPageApi";
import { UserContext } from "../../../contexts/UserContext";

export default function SerchEventCard({ eventData }) {
  const [open, setOpen] = useState(false);
  const host = window.location.host;
  const navigate = useNavigate();

  const { isAttendee } = useContext(UserContext);

  const { mutateAsync: mutateLike, isPending: isPendingLike } = useAddLike(
    eventData.id
  );

  const { mutateAsync: mutateDislike, isPending: isPendingDisLike } =
    useRemoveLike(eventData.id);

  const handleOpenShareDialog = (e) => {
    e.stopPropagation();
    setOpen(true);
  };
  const handleCloseShareDialog = () => {
    setOpen(false);
  };

  const handelLikeClick = (e) => {
    e.stopPropagation();
    if (eventData.isLiked) {
      mutateDislike();
    } else {
      mutateLike();
    }
  };

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
            objectFit: "fill",
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
          {eventData.startDate}
        </Typography>
        <Typography variant="body1" color="initial">
          From ${eventData.tickets[0].price}
        </Typography>
      </Box>
      <Box sx={{ alignSelf: "flex-end" }}>
        <IconButton onClick={handleOpenShareDialog}>
          <IosShare />
        </IconButton>
        <ShareCard
          open={open}
          handleClose={handleCloseShareDialog}
          url={`${host}/${eventData.id}`}
          label={"Event URL"}
        />
        {isAttendee() && (
          <IconButton onClick={handelLikeClick}>
            {eventData.isLikedByCurrentUser ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        )}
      </Box>
    </Paper>
  );
}
