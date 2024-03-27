import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
  Container,
  Typography,
  Box,
  IconButton,
  Snackbar,
  Button,
} from "@mui/material";
import { Flag } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IosShareIcon from "@mui/icons-material/IosShare";
//----------------------------------------------------------------
import GetTicketsCard from "../cards/GetTicketsCard.jsx";
import TitleAndSubtitleCard from "../cards/TitleAndSubtitleCard.jsx";
import OrganizedByCard from "../cards/OrganizedByCard.jsx";
import EventCard from "../cards/EventCard.jsx";
import SwiperButton from "../buttons/SwiperButton.jsx";
//----------------------------------------------------------------
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
//----------------------------------------------------------------
import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  useGetEventData,
  useGetOrganizerFollowers,
} from "../../API/eventPageApi.js";

export default function EventPage() {
  //---------for testing  !! --------------------------
  const [isAtndee, setIsAtndee] = useState(true);

  //-----------------------------
  const [copied, setcopied] = useState(false);
  const { eventId } = useParams();

  {
    /* get data api*/
  }
  const { data, isLoading } = useGetEventData(eventId);

  const organizerId = data?.organizer.id;

  const { data: followersData, isLoading: followersLoading } =
    useGetOrganizerFollowers(organizerId);

  if (isLoading || followersLoading) {
    return <div>Loading...</div>;
  }

  // console.log(followersData);
  console.log(data);
  const handelMainDateTime = () => {
    const startDate = new Date(`${data.startDate}T${data.startTime}z`);
    const endDate = new Date(`${data.endDate}T${data.endTime}z`);

    startDate.setSeconds(0);
    endDate.setSeconds(0);

    const formattedStartDate = startDate.toLocaleString("en-US", {
      hour12: false,
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    const formattedEndDate = endDate.toLocaleString("en-US", {
      hour12: false,
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    if (startDate.getDay() === endDate.getDay()) {
      return formattedStartDate.concat(
        " - ",
        endDate.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }
    return formattedStartDate.concat(" - ", formattedEndDate);
  };

  const handelShortDate = () => {
    const startDate = new Date(data.startDate);

    const formattedStartDate = startDate.toLocaleString("en-us", {
      month: "short",
      weekday: "long",
      day: "numeric",
    });
    return formattedStartDate;
  };

  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          {/* main image */}

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              // alignItems: "center",
            }}
          >
            <Paper
              sx={{
                p: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                // padding: "0px 8px ",
                borderRadius: "20px",
                m: 1,
              }}
            >
              <img
                src={`${import.meta.env.VITE_API_URL}/${data.thumbnailUrl}`}
                alt=""
                style={{
                  width: "100%",
                  height: "430px",
                  borderRadius: "20px",
                }}
              />
            </Paper>
          </Grid>

          {/* main date and like & share */}

          <Grid item xs={12} sx={{ display: "flex" }}>
            <Typography
              variant="body2"
              color="initial"
              sx={{
                fontSize: "18px",
                fontWeight: "bold",
                flexGrow: "1",
                width: "50%",
                ml: 2,
              }}
            >
              {handelShortDate()}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "85px",
              }}
            >
              {isAtndee && (
                <IconButton>
                  <FavoriteBorderIcon />
                </IconButton>
              )}

              <IconButton
                onClick={async () => {
                  await navigator.clipboard.writeText(
                    `http://localhost:3000/event/${data.id}`
                  );
                  setcopied(true);
                  setTimeout(() => {
                    setcopied(false);
                  }, 1500);
                }}
              >
                <IosShareIcon />
              </IconButton>
              <Snackbar
                open={copied}
                autoHideDuration={1500}
                message="Link Is Copied To Clipboard"
              />
            </Box>
          </Grid>

          {/* main page */}

          <Grid item xs={12} md={8} sx={{}}>
            {/* event name */}

            <Paper elevation={0} sx={{ ml: 0, width: "95%", p: 2, mb: "30px" }}>
              <Typography
                variant="h1"
                sx={{
                  fontBold: "900",
                  textTransform: "capitalize",
                  fontSize: "60px",
                }}
              >
                {data.name}
              </Typography>
            </Paper>

            {/* Date and Time  */}

            <TitleAndSubtitleCard
              title={"Date and Time"}
              subtitle={`${handelMainDateTime()}`}
              forWhat={"date"}
            />

            {/* Location  */}

            <TitleAndSubtitleCard
              title={"Location"}
              subtitle={data.isOnline ? "Online" : data.street}
              forWhat={"location"}
              center={[data.lat, data.lon]}
              isOnline={data.isOnline}
            />

            {/* Restrictions */}
            {data.isManaged && (
              <TitleAndSubtitleCard
                title={"Restrictions"}
                subtitle={{
                  allowedGender: data.allowedGender,
                  minAge: data.minAge,
                  maxAge: data.maxAge,
                }}
                forWhat={"restriction"}
              />
            )}

            {/* About this event  */}

            <TitleAndSubtitleCard
              title={"About this event"}
              subtitle={data.description}
            />

            {/* Organized By  */}

            <OrganizedByCard
              organizer={data.organizer}
              followersCount={followersData}
            />

            {/* Report this event   */}

            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Button color="primary">
                <Flag />
                <Typography
                  variant="body1"
                  color="primary"
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                    ml: 1,
                    textTransform: "capitalize",
                  }}
                >
                  Report this event
                </Typography>
              </Button>
            </Box>
          </Grid>

          {/* get ticket */}

          <Grid
            item
            md={4}
            sx={{
              justifyContent: "center",
              alignItems: "flex-start",
              display: { xs: "none", md: "flex" },
            }}
          >
            {isAtndee && <GetTicketsCard ticketsData={data.tickets} />}
          </Grid>

          {/* other event you may like */}
          <Grid
            item
            xs={12}
            sx={{
              p: 2,
              mt: 2,
            }}
          >
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <Swiper
                // modules={[Navigation, Autoplay]}
                spaceBetween={50}
                slidesPerView={3}
                style={{ display: "flex", flexDirection: "column-reverse" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", flexGrow: "1" }}
                  >
                    Other events you may like
                  </Typography>

                  <SwiperButton />
                </Box>

                <Box>
                  <SwiperSlide>
                    <EventCard
                      name={"learn react"}
                      isOnline={true}
                      startDate={"Saturday,Mar 24"}
                      startTime={"18:00"}
                      organizerName={"ahmad anini"}
                      numberOfFollers={"3000"}
                      customStyle={{
                        minWidth: {
                          xs: "70vw",
                          sm: "44vw",
                          md: "24vw",
                        },
                      }}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <EventCard
                      name={"learn react"}
                      isOnline={true}
                      startDate={"Saturday,Mar 24"}
                      startTime={"18:00"}
                      organizerName={"ahmad anini"}
                      numberOfFollers={"3000"}
                      customStyle={{
                        minWidth: {
                          xs: "70vw",
                          sm: "44vw",
                          md: "24vw",
                        },
                      }}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <EventCard
                      name={"learn react"}
                      isOnline={true}
                      startDate={"Saturday,Mar 24"}
                      startTime={"18:00"}
                      organizerName={"ahmad anini"}
                      numberOfFollers={"3000"}
                      customStyle={{
                        minWidth: {
                          xs: "70vw",
                          sm: "44vw",
                          md: "24vw",
                        },
                      }}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <EventCard
                      name={"learn react"}
                      isOnline={true}
                      startDate={"Saturday,Mar 24"}
                      startTime={"18:00"}
                      organizerName={"ahmad anini"}
                      numberOfFollers={"3000"}
                      customStyle={{
                        minWidth: {
                          xs: "70vw",
                          sm: "44vw",
                          md: "24vw",
                        },
                      }}
                    />
                  </SwiperSlide>
                </Box>
              </Swiper>
            </Box>
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <Swiper
                // modules={[Navigation, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                style={{ display: "flex", flexDirection: "column-reverse" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 3,
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    Other events you may like
                  </Typography>
                  <Box>
                    <SwiperButton />
                  </Box>
                </Box>

                <Box>
                  <SwiperSlide>
                    <EventCard
                      name={"learn react"}
                      isOnline={true}
                      startDate={"Saturday,Mar 24"}
                      startTime={"18:00"}
                      organizerName={"ahmad anini"}
                      numberOfFollers={"3000"}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <EventCard
                      name={"learn react"}
                      isOnline={true}
                      startDate={"Saturday,Mar 24"}
                      startTime={"18:00"}
                      organizerName={"ahmad anini"}
                      numberOfFollers={"3000"}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <EventCard
                      name={"learn react"}
                      isOnline={true}
                      startDate={"Saturday,Mar 24"}
                      startTime={"18:00"}
                      organizerName={"ahmad anini"}
                      numberOfFollers={"3000"}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <EventCard
                      name={"learn react"}
                      isOnline={true}
                      startDate={"Saturday,Mar 24"}
                      startTime={"18:00"}
                      organizerName={"ahmad anini"}
                      numberOfFollers={"3000"}
                    />
                  </SwiperSlide>
                </Box>
              </Swiper>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* get ticket (small scren)  */}

      <Box
        sx={{
          justifyContent: "center",
          width: "98vw",
          display: { xs: "flex", md: "none" },
          position: "sticky",
          bottom: "0vh",
          zIndex: "1000",
        }}
      >
        <GetTicketsCard ticketsData={data.tickets} />
      </Box>
    </>
  );
}
