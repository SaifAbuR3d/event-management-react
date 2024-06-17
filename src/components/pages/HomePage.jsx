import { Grid, Box, Typography } from "@mui/material";
import AttendeeFeed from "../other/HomePageComponent/AttendeeFeed";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import TopRatedEvent from "../other/HomePageComponent/TopRatedEvent";
import "swiper/css";
import "swiper/css/bundle";
import EventNearYou from "../other/HomePageComponent/EventNearYou";
import EventYouMayLike from "../other/HomePageComponent/EventYouMayLike";
import Categories from "../other/HomePageComponent/Categories";
import Introduction from "../other/HomePageComponent/Introduction";

export default function Home() {
  const { isAttendee } = useContext(UserContext);
  const attendee = isAttendee();

  return (
    <Grid container>
      <Introduction />

      <Categories />

      <TopRatedEvent />

      <EventNearYou />

      {attendee && <EventYouMayLike />}

      {attendee && <AttendeeFeed />}
    </Grid>
  );
}
