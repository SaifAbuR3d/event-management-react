import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
  Container,
  Typography,
  Box,
  IconButton,
  Button,
  useMediaQuery,
} from "@mui/material";
import { Favorite, Flag } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IosShareIcon from "@mui/icons-material/IosShare";
import GetTicketsCard from "../other/EventPageComponents/GetTicketsCard.jsx";
import TitleAndSubtitleCard from "../other/EventPageComponents/TitleAndSubtitleCard.jsx";
import OrganizedByCard from "../other/EventPageComponents/OrganizedByCard.jsx";
import SwiperButton from "../other/EventPageComponents/SwiperButton.jsx";
import EventCard from "../cards/EventCard.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import { useNavigate, useParams } from "react-router-dom";
import { Fragment, useContext, useState } from "react";
import {
  GetOtherEventsMayLike,
  useAddLike,
  useGetEventData,
  useGetReviews,
  useRemoveLike,
} from "../../API/eventPageApi.js";
import MainLoding from "../looding/MainLoding.jsx";
import { UserContext } from "../../contexts/UserContext.jsx";
import ShareCard from "../cards/ShareCard.jsx";
import { useTheme } from "@emotion/react";
import ReportDialog from "../other/EventPageComponents/ReportDialog.jsx";
import ReviewCard from "../other/EventPageComponents/ReviewCard.jsx";
import { LoadingButton } from "@mui/lab";
import AddReviewDialog from "../other/EventPageComponents/AddReviewDialog.jsx";
import GetOrganizerDashboard from "../other/EventPageComponents/GetOrganizerDashboard.jsx";

export default function EventPage() {
  const [open, setOpen] = useState(false);
  const [openReportDialog, setOpenReportDialog] = useState(false);
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const navigate = useNavigate();
  const { eventId } = useParams();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesLG = useMediaQuery(theme.breakpoints.up("lg"));
  const handelSlidesPerView = () => {
    if (matchesSM) {
      return 1;
    } else if (matchesLG) {
      return 3.6;
    } else {
      return 2.6;
    }
  };

  {
    /* get data api*/
  }
  const { data, isLoading } = useGetEventData(eventId);

  const { data: eventsMayLikeData, isLoading: eventsMayLikeLoading } =
    GetOtherEventsMayLike(eventId);

  const organizerId = data?.organizer.id;

  const { mutateAsync: mutateLike, isPending: isPendingLike } =
    useAddLike(eventId);

  const { mutateAsync: mutateDislike, isPending: isPendingDisLike } =
    useRemoveLike(eventId);

  const location = `${window.location.protocol}//${window.location.host}`;

  const {
    data: reviewsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useGetReviews(eventId);

  /* get data api*/

  const { isOrganizer, isAttendee, isAuthenticated, isCurrentOrganizer } =
    useContext(UserContext);

  if (isLoading || eventsMayLikeLoading || status === "loading") {
    return (
      <MainLoding
        isLoading={isLoading || eventsMayLikeLoading || status === "loading"}
      />
    );
  }

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

    if (
      startDate.getDay() === endDate.getDay() &&
      startDate.getMonth() === endDate.getMonth()
    ) {
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

  const handleOpenShareDialog = () => {
    setOpen(true);
  };
  const handleCloseShareDialog = () => {
    setOpen(false);
  };
  const handlOpenReportDialog = () => {
    setOpenReportDialog(true);
  };

  const handlCloseReportDialog = () => {
    setOpenReportDialog(false);
  };

  const handlOpenReviewDialog = () => {
    setOpenReviewDialog(true);
  };

  const handlCloseReviewDialog = () => {
    setOpenReviewDialog(false);
  };

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={1}>
          {/* main image */}

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Paper
              sx={{
                p: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
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
                  objectFit: "fit",
                  aspectRatio: "16/9",
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
                flexDirection: `${isOrganizer() ? "row-reverse" : "row"}`,
                width: "85px",
              }}
            >
              {!isOrganizer() && (
                <IconButton
                  disabled={isPendingLike || isPendingDisLike}
                  onClick={
                    isAuthenticated()
                      ? data.isLikedByCurrentUser
                        ? mutateDislike
                        : mutateLike
                      : () => navigate("/login")
                  }
                >
                  {data.isLikedByCurrentUser ? (
                    <Favorite />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
              )}

              <IconButton onClick={handleOpenShareDialog}>
                <IosShareIcon />
              </IconButton>
              <ShareCard
                open={open}
                handleClose={handleCloseShareDialog}
                url={`${location}/event/${eventId}`}
                label={"Event URL"}
              />
            </Box>
          </Grid>

          {/* main page */}

          <Grid item xs={12} md={8} sx={{}}>
            {/* event name */}

            <Paper elevation={0} sx={{ ml: 0, width: "95%", p: 2, mb: "30px" }}>
              <Typography
                variant="h3"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                {data.name}
              </Typography>
            </Paper>
            {data.hasEnded ? (
              <Box
                sx={{
                  width: "95%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  mb: 3,
                  ml: 1,
                }}
              >
                <Typography variant="h6" sx={{ mb: 1 }} color="initial">
                  Reviews
                </Typography>
                {reviewsData.pages.map((page) => (
                  <Fragment key={page.currentPage}>
                    {page.reviews.map((review) => (
                      <ReviewCard key={review.id} data={review} />
                    ))}
                    {reviewsData?.pages[0]?.reviews?.length == 0 && (
                      <Typography
                        variant="body2"
                        fontWeight={"bold"}
                        sx={{ mb: 1 }}
                        color="initial"
                      >
                        {"There's No Review Yet"}
                      </Typography>
                    )}
                  </Fragment>
                ))}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                    mt: 1,
                  }}
                >
                  <LoadingButton
                    variant="outlined"
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetchingNextPage}
                    loading={isFetchingNextPage}
                  >
                    Show More
                  </LoadingButton>
                  {isAttendee() && (
                    <Button variant="contained" onClick={handlOpenReviewDialog}>
                      Add Review
                    </Button>
                  )}
                  <AddReviewDialog
                    eventId={eventId}
                    open={openReviewDialog}
                    handleClose={handlCloseReviewDialog}
                  />
                </Box>
              </Box>
            ) : (
              <>
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
              </>
            )}

            {/* Organized By  */}

            <OrganizedByCard
              organizerId={organizerId}
              organizer={data.organizer}
            />

            {/* Report this event   */}
            {isAttendee() && (
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Button color="primary" onClick={handlOpenReportDialog}>
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
            )}
            <ReportDialog
              open={openReportDialog}
              handleClose={handlCloseReportDialog}
              eventId={eventId}
            />
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
            {!isOrganizer() && (
              <GetTicketsCard ticketsData={data.tickets} data={data} />
            )}
            {isCurrentOrganizer(data.organizer.userName) && (
              <GetOrganizerDashboard />
            )}
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
            <Box>
              <Swiper
                // modules={[Navigation, Autoplay]}
                spaceBetween={20}
                slidesPerView={handelSlidesPerView()}
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
                  {eventsMayLikeData.map((event) => (
                    <SwiperSlide key={event.id}>
                      <EventCard
                        name={event.name}
                        id={event.id}
                        isOnline={event.isOnline}
                        startDate={event.startDate}
                        startTime={event.startTime}
                        organizerName={event.organizer.displayName}
                        imageUrl={event.thumbnailUrl}
                        isLikedByCurrentUser={event.isLikedByCurrentUser}
                        customStyle={{
                          minWidth: {
                            xs: "70vw",
                            sm: "34vw",
                            md: "24vw",
                            lg: "14vw",
                          },
                        }}
                      />
                    </SwiperSlide>
                  ))}
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
        {!isOrganizer() && (
          <GetTicketsCard ticketsData={data.tickets} data={data} />
        )}
        {isCurrentOrganizer(data.organizer.userName) && (
          <GetOrganizerDashboard />
        )}
      </Box>
    </>
  );
}
