import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Paper, Rating, Tooltip } from "@mui/material";
import {
  ConfirmationNumberOutlined,
  ConfirmationNumberSharp,
  Favorite,
  FavoriteBorder,
  IosShare,
  PeopleOutlineTwoTone,
  StarRateRounded,
} from "@mui/icons-material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ShareCard from "./ShareCard";
import { UserContext } from "../../contexts/UserContext";
import { useAddLike, useRemoveLike } from "../../API/eventPageApi";
import ShowTicketsDialog from "../other/AttendeeProfileComponent/ShowTicketsDialog";
import { useContext } from "react";

const EventCard = React.memo(function EventCard({
  name,
  id,
  isOnline,
  startDate,
  startTime,
  organizerName,
  numberOfFollers,
  organizerImageUrl,
  imageUrl,
  isLikedByCurrentUser,
  customStyle,
  isBooking,
  isHome,
  rating,
}) {
  const [open, setOpen] = useState(false);
  const [openTickets, setOpenTickets] = useState(false);
  const [isLiked, setIsLiked] = useState(isLikedByCurrentUser);
  const navigate = useNavigate();
  const { isAttendee, isAuthenticated } = useContext(UserContext);

  const { mutateAsync: mutateLike, isPending: isPendingLike } = useAddLike(id);
  const location = `${window.location.protocol}//${window.location.host}`;
  const formatNumber = (number) => {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + "M";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + "K";
    } else {
      return number.toString();
    }
  };

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

  const handleOpenTickets = (event) => {
    event.stopPropagation();
    setOpenTickets(true);
  };

  const handleCloseTickets = () => {
    setOpenTickets(false);
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
        position: "relative",
      }}
    >
      {rating && (
        <Box
          sx={{
            position: "absolute",
            top: 4,
            right: 4,
            display: "flex",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.55)",
          }}
        >
          <Rating
            name="half-rating-read"
            precision={0.5}
            sx={{ p: 0.3 }}
            value={rating?.average}
            readOnly
          />
        </Box>
      )}
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
            {isBooking ? (
              <>
                <IconButton onClick={handleOpenTickets}>
                  <ConfirmationNumberOutlined fontSize="large" />
                </IconButton>

                <ShowTicketsDialog
                  open={openTickets}
                  handleClose={handleCloseTickets}
                  eventId={id}
                  eventName={name}
                />
              </>
            ) : (
              <>
                {(isAttendee() || !isAuthenticated()) && (
                  <Tooltip title="Like">
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
                  </Tooltip>
                )}
                <Tooltip title="Share">
                  <IconButton onClick={handleOpen}>
                    <IosShare />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Box>
        </Box>

        <Typography variant="body1" color="#283593" mt={1}>
          {handelMainDateTime()}
        </Typography>

        <Typography variant="body1" color="#283593">
          {isOnline ? "Online" : "On Site"}
        </Typography>

        {isHome && (
          <Box mt={2} display="flex" justifyContent="start" alignItems="start">
            <Avatar
              src={`${import.meta.env.VITE_API_URL}/${organizerImageUrl}`}
              sx={{ mr: 1, width: "50px", height: "50px" }}
            />
            <Box>
              <Typography sx={{ fontSize: "18px" }} color="#283593">
                {organizerName}
              </Typography>
              <Typography variant="body2" color="#283593" display="flex">
                <PeopleOutlineTwoTone fontSize="small" />
                {formatNumber(numberOfFollers)} Followers
              </Typography>
            </Box>
          </Box>
        )}
      </CardContent>
      <ShareCard
        open={open}
        handleClose={handleClose}
        label={"Event url"}
        url={`${location}/event/${id}`}
      />
    </Card>
  );
});

export default EventCard;
