import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, Paper } from "@mui/material";
import { DoneAll, IosShare, PeopleOutlineTwoTone } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShareCard from "./ShareCard";

export default function EventCard({
  name,
  id,
  isOnline,
  startDate,
  startTime,
  organizerName,
  numberOfFollers,
  imageUrl,
  customStyle,
  isAttendee,
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = (event) => {
    event.stopPropagation();
    setOpen(true);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setOpen(false);
  };

  const url = `http://localhost:3000/event/${id}`;

  const openNewWindow = () => {
    window.open(url, "_blank");
  };

  return (
    <Card
      onClick={openNewWindow}
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
            {isAttendee && (
              <IconButton onClick={(event) => event.stopPropagation()}>
                <FavoriteIcon />
              </IconButton>
            )}

            <IconButton onClick={handleOpen}>
              <IosShare />
            </IconButton>
          </Box>
        </Box>

        <Typography variant="body1" color="#283593" mt={1}>
          {startDate}, {startTime} PM
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
        url={url}
      />
    </Card>
  );
}
