import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, Paper, Snackbar } from "@mui/material";
import {
  DoneAll,
  IosShare,
  Key,
  PeopleOutlineTwoTone,
} from "@mui/icons-material";
import { useState } from "react";

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
  const [copied, setCopied] = useState(false);

  const handleShareClick = () => {
    const currentUrl = `http://localhost:3000/event/${id}`;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

  return (
    <Card
      component={Paper}
      elevation={2}
      sx={{
        borderBottomLeftRadius: "4%",
        borderBottomRightRadius: "4%",
        transition: "transform 0.5s ease",
        "&:hover": {
          transform: "scale(1.02)",
        },
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
              <IconButton>
                <FavoriteIcon />
              </IconButton>
            )}
            {!copied ? (
              <IconButton onClick={handleShareClick}>
                <IosShare />
              </IconButton>
            ) : (
              <IconButton>
                <DoneAll />
              </IconButton>
            )}
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
    </Card>
  );
}
