import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Sideimage1 from "../../../public/Sideimage1.jpg";
import { Box, Paper } from "@mui/material";
import { PeopleOutline, PeopleOutlineTwoTone } from "@mui/icons-material";

export default function EventCard() {
  return (
    <Card
      component={Paper}
      elevation={5}
      sx={{
        minWidth: {
          xs:"70vw",
          sm: "40vw",
          md: "30vw",
        },
      }}
    >
      <CardMedia
        component="img"
        height="194"
        image={Sideimage1}
        alt="Paella dish"
      />
      <CardContent>
        <Box color="#283593" display="flex" alignItems="center">
          <Typography variant="h6" color="#283593">
            Event Title
          </Typography>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </Box>
        <Typography variant="body1" color="#283593" mt={1}>
          Wednesday, 9:30 PM - 11:00 PM
        </Typography>
        <Typography variant="body1" color="#283593">
          Event type (Online || Onsite)
        </Typography>
        <Typography variant="h6" color="#283593" mt={2}>
          Organizer Name
        </Typography>
        <Typography variant="body2" color="#283593" display="flex">
          <PeopleOutlineTwoTone fontSize="small" />
          9.9k followers
        </Typography>
      </CardContent>
    </Card>
  );
}
