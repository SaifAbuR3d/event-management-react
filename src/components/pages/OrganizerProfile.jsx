import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Box,
  Button,
  IconButton,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Snackbar,
} from "@mui/material";
import {
  Edit,
  PersonAddAltOutlined,
  TableRows,
  ViewCarousel,
  Verified,
  IosShareOutlined,
  PersonRemoveOutlined,
} from "@mui/icons-material";
import "swiper/css";
import "swiper/css/pagination";
import { useState } from "react";
import CustomeSwiper from "../other/organizerProfileComponents/CustomeSwiper";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import DescriptionDialog from "../other/organizerProfileComponents/DescriptionDialog";
import SocialMediaLinkDialog from "../other/organizerProfileComponents/SocialMediaLinkDialog";
import ChangeViewProfileImage from "../other/organizerProfileComponents/ChangeViewProfileImage";
import { useParams, Link } from "react-router-dom";
import SocialMediaLinkButton from "../other/organizerProfileComponents/SocialMediaLinkButton";
import EventCard from "../cards/EventCard";

const getProfileOwnerData = async (userName) => {
  const { data: ownerData } = await axios.get(
    `https://localhost:8080/api/Organizers/${userName}`
  );
  const { data: followers } = await axios.get(
    `https://localhost:8080/api/Organizers/${ownerData.id}/followers`
  );
  const { data: previousEvents } = await axios.get(
    `https://localhost:8080/api/events?OrganizerId=${ownerData.id}&PreviousEvents=true`
  );
  const { data: upcomingEvents } = await axios.get(
    `https://localhost:8080/api/events?OrganizerId=${ownerData.id}&UpcomingEvents=true`
  );
  const data = { ...ownerData, followers, previousEvents, upcomingEvents };
  return data;
};

export default function OrganizerProfile() {
  const [alignment, setAlignment] = useState("upcoming");
  const [layout, setLayout] = useState("slide");
  const [openBioDialog, setOpenBioDialog] = useState(false);
  const [openSMLDialog, setOpenSMLDialog] = useState(false);
  const [openProfileImage, setOpenProfileImage] = useState(false);
  const [isAttendee, setIsAttendee] = useState(false);
  const [isOrganizer, setIsOrganizer] = useState(true);
  const [isCurrentOrganizer, setIsCurrentOrganizer] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleProfileImageOpen = () => {
    setOpenProfileImage(true);
  };
  const handleProfileImageClose = () => {
    setOpenProfileImage(false);
  };

  const handleSMLClickOpen = () => {
    setOpenSMLDialog(true);
  };
  const handleSMLClose = () => {
    setOpenSMLDialog(false);
  };

  const handleBioClickOpen = () => {
    setOpenBioDialog(true);
  };
  const handleBioClose = () => {
    setOpenBioDialog(false);
  };

  const handleEvent = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const handleLayout = (event, newLayout) => {
    setLayout(newLayout);
  };

  /*--------------------------------------------Get Profile Owner Data -----------------------------------------------*/

  const { userName } = useParams();
  const { data: profileOwnerData, isLoading: getOwnerDataLoading } = useQuery({
    queryKey: ["profileOwnerData"],
    queryFn: () => getProfileOwnerData(userName),
  });

  /*--------------------------------------------Get Profile Owner Events ---------------------------------------------*/

  const renderEvents = (events) => {
    return events.map((event, index) => {
      return (
        <EventCard
          key={index}
          name={event.name}
          isOnline={event.isOnline}
          startDate={event.startDate}
          startTime={event.startTime}
        />
      );
    });
  };

  /*--------------------------------------------  Follow Organizer Request ------------------------------------------*/
  const fakeAttendee = {
    organizerId: profileOwnerData?.id,
  };

  const { mutateAsync, isPending: followOrganizerPending } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(
        `https://localhost:8080/api/Attendees/my/follows`,
        fakeAttendee,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InlhemVlZCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InlhemVlZEBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBdHRlbmRlZSIsImV4cCI6MTcxMTQ0MTEwMCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwIn0.nK_MZlfOTw4Fyic7K414WBg02Pk5sJh4BSwzqbUl4OE`,
          },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      //queryClient.invalidateQueries(["profileOwnerData"]);
      setIsFollowing(true);
    },
  });

  if (getOwnerDataLoading || followOrganizerPending) {
    return <div>Loading...</div>;
  }

  /*------------------------------------------------ Render Functions -----------------------------------------------*/

  const {
    id,
    displayName,
    isVerified,
    profile,
    imageUrl,
    followers,
    previousEvents,
    upcomingEvents,
  } = profileOwnerData;

  const { bio, website, twitter, facebook, linkedIn, instagram } = profile;

  const socialMedia = [
    { platform: "LinkedIn", link: linkedIn },
    { platform: "Facebook", link: facebook },
    { platform: "Twitter", link: twitter },
    { platform: "Instagram", link: instagram },
    { platform: "Web Site", link: website },
  ].filter((item) => item.link.trim() !== "");

  const renderSocialMedia = socialMedia.map((item) => {
    return (
      <SocialMediaLinkButton
        key={item.platform}
        path={item.link}
        title={item.platform}
      />
    );
  });

  const noEventsStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    color: "red",
    padding: "10%",
  };

  /*--------------------- handle share link button -------------------*/
  const handleShareClick = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
        //console.log("URL copied to clipboard:", currentUrl);
      })
      .catch((error) => {
        //console.error("Failed to copy URL:", error);
      });
  };

  return (
    <Grid container position="relative">
      <CssBaseline />
      <Box
        position="absolute"
        display="flex"
        alignItems="center"
        flexDirection="column"
        sx={{
          top: { xs: "28%", sm: "30%", md: "13%" },
          width: {
            xs: "100%",
            md: "50%",
          },
          left: { md: "27.4%" },
          alignItems: {
            xs: "center",
            md: "start",
          },
          gap: {
            xs: 1,
            md: 6,
          },
        }}
      >
        <Box display="flex">
          <Typography
            component="h1"
            variant="h4"
            mr={1}
            sx={{ fontSize: "2.3rem" }}
          >
            {displayName}
          </Typography>

          {isVerified && <Verified color="secondary" />}
        </Box>
        {isAttendee ? (
          <Box display="flex" gap={1} alignItems="center">
            {isFollowing ? (
              <Button
                variant="contained"
                sx={{ width: { xs: "90%", sm: "110%" } }}
                startIcon={<PersonRemoveOutlined />}
              >
                Unfollow
              </Button>
            ) : (
              <Button
                onClick={mutateAsync}
                variant="contained"
                sx={{ width: { xs: "90%", sm: "110%" } }}
                startIcon={<PersonAddAltOutlined />}
              >
                Follow
              </Button>
            )}

            <Button
              variant="contained"
              sx={{ width: { xs: "60%", sm: "70%", lg: "70%" } }}
              startIcon={<IosShareOutlined />}
              onClick={handleShareClick}
            >
              Share
            </Button>
            <Snackbar
              open={copied}
              message="Copied!"
              autoHideDuration={2000} // Automatically hide after 2 seconds
              onClose={() => setCopied(false)}
            />
          </Box>
        ) : (
          <>
            <Button
              variant="contained"
              sx={{ width: { xs: "30%", sm: "25%", lg: "25%" } }}
              startIcon={<IosShareOutlined />}
              onClick={handleShareClick}
            >
              Share
            </Button>
            <Snackbar
              open={copied}
              message="Copied!"
              autoHideDuration={2000} // Automatically hide after 2 seconds
              onClose={() => setCopied(false)}
            />
          </>
        )}
      </Box>

      <Grid item xs={12} height={"35vh"}>
        <Box bgcolor="#c5cae9" height="100%"></Box>
      </Grid>

      <Grid
        container
        ml={"auto"}
        mr={"auto"}
        width={"90%"}
        height={"fit-content"}
        justifyContent={"space-between"}
      >
        {/*Left Side*/}
        <Grid
          item
          xs={12}
          md={2.6}
          display="flex"
          justifyContent="center"
          sx={{
            height: {
              xs: "37vh",
              sm: "30vh",
              md: "90vh",
            },
          }}
          position="relative"
        >
          {/*Profile Image*/}
          <Box
            component={Paper}
            onClick={handleProfileImageOpen}
            elevation={1}
            sx={{
              backgroundImage: `url(https://localhost:8080/${imageUrl})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: {
                xs: "150px",
                sm: "180px",
                md: "200px",
                lg: "220px",
                xl: "240px",
              },
              height: {
                xs: "150px",
                sm: "180px",
                md: "200px",
                lg: "220px",
                xl: "240px",
              },
              borderRadius: "50%",
              cursor: "pointer",
              position: "absolute",
              top: { xs: "-90px", sm: "-110px", md: "-130px", lg: "-160px" },
              left: { md: "auto" },
            }}
          />
          <ChangeViewProfileImage
            isCurrentOrganizer={isCurrentOrganizer}
            ownerData={profileOwnerData}
            image={imageUrl}
            open={openProfileImage}
            handleClose={handleProfileImageClose}
          />
          {/*# of Followers and posts*/}
          <Paper
            elevation={1}
            sx={{
              width: {
                xs: "100%",
                sm: "30%",
                md: "200px",
                lg: "220px",
                xl: "240px",
              },
              position: "absolute",
              top: {
                xs: "175px",
                sm: "185px",
                md: "110px",
              },
              left: { sm: "0", md: "auto" },
              display: "flex",
            }}
          >
            <Paper
              elevation={0}
              sx={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" color="#283593">
                {followers.length}
              </Typography>
              <Typography variant="body1" color="#283593">
                followers
              </Typography>
            </Paper>
            <Paper
              elevation={0}
              sx={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" color="#283593">
                {upcomingEvents.length + previousEvents.length}
              </Typography>
              <Typography variant="body1" color="#283593">
                events
              </Typography>
            </Paper>
          </Paper>

          {/*Social Media Link*/}
          {(socialMedia.length !== 0 || isCurrentOrganizer) && (
            <Paper
              elevation={1}
              sx={{
                width: {
                  xs: "100%",
                  sm: "69%",
                  md: "200px",
                  lg: "220px",
                  xl: "240px",
                },
                height: {
                  xs: "56px",
                  md: "auto",
                },
                position: "absolute",
                top: {
                  xs: "245px",
                  sm: "185px",
                  md: "200px",
                },
                left: { sm: "31%", md: "auto" },
              }}
            >
              <Box
                display="flex"
                sx={{
                  flexDirection: {
                    xs: "row",
                    md: "column",
                  },
                  gap: {
                    sm: 0,
                    md: 6,
                  },
                  pb: {
                    sm: 0,
                    md: 2,
                  },
                }}
                width="100%"
                height="100%"
                justifyContent="space-around"
                position="relative"
                pt={{
                  xs: 0,
                  md: 5,
                }}
                pr={{
                  xs: 1,
                  md: 0,
                }}
              >
                {/*Edit Icon*/}
                {isCurrentOrganizer && (
                  <IconButton
                    onClick={handleSMLClickOpen}
                    sx={{
                      position: "absolute",
                      top: { xs: 0, md: "3px" },
                      right: { xs: 0, md: "10px" },
                    }}
                  >
                    <Edit fontSize="small" color="secondary" />
                  </IconButton>
                )}
                <SocialMediaLinkDialog
                  profile={profile}
                  open={openSMLDialog}
                  handleClose={handleSMLClose}
                />

                {renderSocialMedia}
              </Box>
            </Paper>
          )}
        </Grid>

        {/*Right Side*/}
        <Grid
          item
          xs={12}
          md={9}
          display="flex"
          flexDirection="column"
          height={"fit-content"}
          gap="3vh"
        >
          {/*About Section*/}
          <Grid item xs={12} mt={2} height={"fit-content"}>
            <Paper
              elevation={1}
              sx={{ position: "relative", width: "100%", p: 1 }}
            >
              {/*Title (About)*/}
              <Typography color="#283593" component="h1" variant="h4" p={2}>
                About
              </Typography>

              {/*About Section Content*/}
              <Typography p={1}>{bio}</Typography>

              {/*Edit Icon Button*/}
              {isCurrentOrganizer && (
                <IconButton
                  aria-label="edit"
                  color="secondary"
                  onClick={handleBioClickOpen}
                  sx={{ position: "absolute", top: "0", right: "0", p: "1rem" }}
                >
                  <Edit />
                </IconButton>
              )}

              {/*Description Dialog Component*/}
              <DescriptionDialog
                profile={profile}
                open={openBioDialog}
                handleClose={handleBioClose}
              />
            </Paper>
          </Grid>

          {/*Events Section*/}
          <Grid item component={Paper} xs={12} elevation={1}>
            {/*Events Section Title */}
            <Typography
              pl={2}
              pt={2}
              width={"100%"}
              component="h1"
              variant="h4"
              color="#283593"
            >
              Events
            </Typography>

            <Box p={2} sx={{ width: "100%" }} display={"flex"}>
              {/*Ub coming || Previous Events Toggle*/}
              <ToggleButtonGroup
                sx={{ p: "2%" }}
                color="primary"
                value={alignment}
                exclusive
                onChange={handleEvent}
                aria-label="Platform"
              >
                <ToggleButton value="upcoming">Up Coming</ToggleButton>
                <ToggleButton value="previous">Previous</ToggleButton>
              </ToggleButtonGroup>
              {/*Slider or Grid View Toggle*/}
              <ToggleButtonGroup
                sx={{ p: "2%" }}
                color="primary"
                value={layout}
                exclusive
                onChange={handleLayout}
                aria-label="Platform"
              >
                <ToggleButton value="slide">
                  <ViewCarousel />
                </ToggleButton>
                <ToggleButton value="grid">
                  <TableRows />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {layout === "slide" ? (
              alignment === "upcoming" ? (
                upcomingEvents.length === 0 ? (
                  <Typography sx={{ ...noEventsStyle }}>No Events</Typography>
                ) : (
                  <CustomeSwiper slides={upcomingEvents} />
                )
              ) : previousEvents.length === 0 ? (
                <Typography sx={{ ...noEventsStyle }}>No Events</Typography>
              ) : (
                <CustomeSwiper slides={previousEvents} />
              )
            ) : alignment === "upcoming" ? (
              upcomingEvents.length === 0 ? (
                <Typography sx={{ ...noEventsStyle }}>No Events</Typography>
              ) : (
                <Box
                  component="div"
                  display="flex"
                  justifyContent="center"
                  flexDirection="row"
                  flexWrap="wrap"
                  mb={3}
                  sx={{
                    gap: 2,
                  }}
                >
                  {renderEvents(upcomingEvents)}
                </Box>
              )
            ) : previousEvents.length === 0 ? (
              <Typography sx={{ ...noEventsStyle }}>No Events</Typography>
            ) : (
              <Box
                component="div"
                display="flex"
                justifyContent="center"
                flexDirection="row"
                flexWrap="wrap"
                mb={4}
                sx={{
                  gap: 2,
                }}
              >
                {renderEvents(previousEvents)}
              </Box>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
