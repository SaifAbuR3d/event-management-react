import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Sideimage1 from "../../assets/images/registerImges/Sideimage1.jpg";
import { Box, Paper } from "@mui/material";
import { IosShare, PeopleOutlineTwoTone } from "@mui/icons-material";

export default function EventCard({
  name,
  isOnline,
  startDate,
  startTime,
  organizerName,
  numberOfFollers,
  customStyle,
}) {
  return (
    <Card
      component={Paper}
      elevation={2}
      sx={{
        minWidth: {
          xs: "70vw",
          sm: "44vw",
          md: "30vw",
        },
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
        image={Sideimage1}
        alt="Paella dish"
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
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
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
    </Card>
  );
}
