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
  Avatar,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import "swiper/css";
import "swiper/css/pagination";
import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import DescriptionDialog from "../other/organizerProfileComponents/DescriptionDialog";
import SocialMediaLinkDialog from "../other/organizerProfileComponents/SocialMediaLinkDialog";
import ChangeViewProfileImage from "../other/organizerProfileComponents/ChangeViewProfileImage";
import { useParams } from "react-router-dom";
import SocialMediaLinkButton from "../other/organizerProfileComponents/SocialMediaLinkButton";
import EventCard from "../cards/EventCard";
import ProfileTitleCard from "../cards/ProfileTitleCard";
import {
  getOwnerEvents,
  getProfileOwnerData,
} from "../../API/organizerProfileApi";

export default function OrganizerProfile() {
  const [alignment, setAlignment] = useState("upcoming");
  const [openBioDialog, setOpenBioDialog] = useState(false);
  const [openSMLDialog, setOpenSMLDialog] = useState(false);
  const [isAttendee, setIsAttendee] = useState(false);
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [isCurrentOrganizer, setIsCurrentOrganizer] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [page, setPage] = useState(1);
  const [upcomingList, setUpcomingList] = useState([]);
  const [previousList, setPreviousList] = useState([]);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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

  /*--------------------------------------------Get Profile Owner Data -----------------------------------------------*/

  const { userName } = useParams();

  const { data: profileOwnerData, isLoading: getOwnerDataLoading } =
    getProfileOwnerData(userName);

  const { data: ownerEvents, isLoading: eventsLoading } = getOwnerEvents(
    alignment,
    page,
    profileOwnerData?.id,
    previousList,
    setPreviousList,
    upcomingList,
    setUpcomingList
  );

  /*----------------------------------------------------- Get Data ---------------------------------------------------*/

  if (getOwnerDataLoading) {
    return <div>Loading...</div>;
  }

  const {
    id,
    displayName,
    isVerified,
    profile,
    imageUrl,
    followers,
    totalFollowersCount,
  } = profileOwnerData;

  const totalEventCount = ownerEvents?.totalEventCount;

  const currentEventCount = ownerEvents?.currentEventCount;

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

  const cardStyle = {
    width: {
      xs: "78vw",
      sm: "40vw",
      md: "29vw",
      lg: "36vh",
      xl: "44vh",
    },
  };

  const renderEvents = (events) => {
    return events.map((event, index) => {
      return (
        <EventCard
          key={index}
          id={event.id}
          imageUrl={event.thumbnailUrl}
          name={event.name}
          isOnline={event.isOnline}
          startDate={event.startDate}
          startTime={event.startTime}
          customStyle={cardStyle}
          isAttendee={isAttendee}
        />
      );
    });
  };

  return (
    <Grid container position="relative">
      <CssBaseline />

      <Grid item xs={12} height={"35vh"}>
        <Box position="relative" width="100%" bgcolor="#c5cae9" height="100%">
          <Box
            position="absolute"
            left={{ xs: "27.3%", lg: "25.2%" }}
            bottom={15}
            width="60%"
            display={{ xs: "none", md: "block" }}
          >
            <ProfileTitleCard
              userName={userName}
              displayName={displayName}
              isAttendee={isAttendee}
              isFollowing={isFollowing}
              isVerified={isVerified}
              setIsFollowing={setIsFollowing}
              attendeeId={profileOwnerData?.id}
            />
          </Box>
        </Box>
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
          lg={2.2}
          display="flex"
          flexDirection="column"
          alignItems={{ xs: "center", md: "start" }}
          gap={1}
          position="relative"
          height="fit-content"
        >
          {/*Profile Image*/}
          <Avatar
            component={Paper}
            elevation={1}
            onClick={handleClickListItem}
            alt="Profile Image"
            src={`https://localhost:8080/${imageUrl}`}
            sx={{
              width: {
                xs: "185px",
                md: "12rem",
                lg: "13rem",
                xl: "15rem",
              },
              height: {
                xs: "185px",
                md: "12rem",
                lg: "13rem",
                xl: "15rem",
              },
              cursor: "pointer",
              position: "absolute",
              top: { xs: "-8rem", xl: "-10rem" },
            }}
          />

          <ChangeViewProfileImage
            isCurrentOrganizer={isCurrentOrganizer}
            ownerData={profileOwnerData}
            anchorEl={anchorEl}
            image={imageUrl}
            open={open}
            handleClose={handleClose}
          />

          <Box
            mt={7}
            width="100%"
            display={{
              xs: "flex",
              md: "none",
            }}
            justifyContent="center"
          >
            <ProfileTitleCard
              userName={userName}
              displayName={displayName}
              isAttendee={isAttendee}
              isFollowing={isFollowing}
              isVerified={isVerified}
              setIsFollowing={setIsFollowing}
              attendeeId={profileOwnerData?.id}
            />
          </Box>

          <Box
            mt={{ xs: 1, md: 13 }}
            display="flex"
            width="100%"
            gap={2}
            flexDirection={{ xs: "column", sm: "row", md: "column" }}
            justifyContent="space-between"
          >
            {/*# of Followers and posts*/}
            <Paper
              elevation={1}
              sx={{
                width: {
                  xs: "100%",
                  sm: "30%",
                  md: "12rem",
                  lg: "13rem",
                  xl: "15rem",
                },
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
                  {totalFollowersCount}
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
                  {totalEventCount}
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
                    sm: "70%",
                    md: "12rem",
                    lg: "13rem",
                    xl: "15rem",
                  },
                  height: {
                    xs: "56px",
                    md: "auto",
                  },
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
          </Box>
        </Grid>

        {/*Right Side*/}
        <Grid
          item
          xs={12}
          md={9}
          lg={9.3}
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
              >
                <ToggleButton value="upcoming">Up Coming</ToggleButton>
                <ToggleButton value="previous">Previous</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {(alignment === "upcoming" ? upcomingList : previousList)
              ?.length === 0 ? (
              <Typography sx={{ ...noEventsStyle }}>No Events</Typography>
            ) : (
              <>
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
                  {renderEvents(
                    alignment === "upcoming" ? upcomingList : previousList
                  )}
                </Box>

                {6 * page < currentEventCount && (
                  <Box
                    width="100%"
                    display="flex"
                    justifyContent="center"
                    mb={2}
                  >
                    <Button
                      sx={{ ml: "auto", mr: "auto" }}
                      variant="outlined"
                      onClick={(event) => {
                        event.preventDefault();
                        setPage(page + 1);
                      }}
                    >
                      Show More
                    </Button>
                  </Box>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
