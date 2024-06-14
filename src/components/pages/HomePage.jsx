import { Grid, Box } from "@mui/material";
import intro from "../../assets/images/intro5.jpg";
import AttendeeFeed from "../other/HomePageComponent/AttendeeFeed";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import TopRatedEvent from "../other/HomePageComponent/TopRatedEvent";
import "swiper/css";
import "swiper/css/bundle";
import EventNearYou from "../other/HomePageComponent/EventNearYou";
import EventYouMayLike from "../other/HomePageComponent/EventYouMayLike";
import Categories from "../other/HomePageComponent/Categories";

export default function Home() {
  const { isAttendee } = useContext(UserContext);

  const attendee = isAttendee();

  return (
    <Grid container>
      <Grid component="section" width="100%">
        <Box
          width="100%"
          maxHeight="550px"
          sx={{
            position: "relative",
            backgroundImage: `url(${intro})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            aspectRatio: "16/9",
          }}
        />
      </Grid>

      <Categories />

      <TopRatedEvent />

      <EventNearYou />

      {attendee && <EventYouMayLike />}

      {attendee && <AttendeeFeed />}
    </Grid>
  );
}
