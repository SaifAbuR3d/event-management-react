import { Grid, Box, Typography, useMediaQuery } from "@mui/material";
import intro from "../../assets/images/intro5.jpg";
import { useGetAllCategories, useGetEventMayLike } from "../../API/HomePageApi";
import CategoriesCard from "../cards/CategoriesCard";
import AttendeeFeed from "../other/HomePageComponent/AttendeeFeed";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import TopRatedEvent from "../other/HomePageComponent/TopRatedEvent";
import "swiper/css";
import "swiper/css/bundle";
import EventNearYou from "../other/HomePageComponent/EventNearYou";
import EventYouMayLike from "../other/HomePageComponent/EventYouMayLike";

export default function Home() {
  const { isAttendee } = useContext(UserContext);

  const isFullScreen = useMediaQuery("(max-width: 700px)");

  const { data: Categories, isLoading: CategoryLoading } =
    useGetAllCategories();

  const renderCategories = Categories?.map((c, index) => {
    return <CategoriesCard key={index} name={c.name} />;
  });

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

      <Grid
        component="section"
        width="100%"
        height="250px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        m="auto"
        sx={{ overflowX: "auto" }}
        whiteSpace="nowrap"
        borderBottom="#bdbdbd solid 1px"
      >
        {renderCategories}
      </Grid>

      <TopRatedEvent />

      <EventNearYou />

      {attendee && <EventYouMayLike />}

      {attendee && <AttendeeFeed />}
    </Grid>
  );
}
