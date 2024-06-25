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
import DescriptionDialog from "../other/organizerProfileComponents/DescriptionDialog";
import SocialMediaLinkDialog from "../other/organizerProfileComponents/SocialMediaLinkDialog";
import ChangeViewProfileImage from "../other/organizerProfileComponents/ChangeViewProfileImage";
import { useParams } from "react-router-dom";
import SocialMediaLinkButton from "../other/organizerProfileComponents/SocialMediaLinkButton";
import EventCard from "../cards/EventCard";
import ProfileTitleCard from "../cards/ProfileTitleCard";
import {
  useGetProfileOwnerData,
  useGetOwnerEvents,
  useIsFollowing,
} from "../../API/organizerProfileApi";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import MainLoding from "../looding/MainLoding";
import EventCardLoading from "../looding/EventCardLoading";
import { queryClient } from "../../main";

export default function OrganizerProfile() {
  const [alignment, setAlignment] = useState("upcoming");
  const [openBioDialog, setOpenBioDialog] = useState(false);
  const [openSMLDialog, setOpenSMLDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [page, setPage] = useState(1);

  const { isAttendee, isCurrentOrganizer } = useContext(UserContext);

  const handleClickListItem = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleSMLClickOpen = () => setOpenSMLDialog(true);

  const handleSMLClose = () => setOpenSMLDialog(false);

  const handleBioClickOpen = () => setOpenBioDialog(true);

  const handleBioClose = () => setOpenBioDialog(false);

  const handleEvent = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  /*--------------------------------------------Get Profile Owner Data -----------------------------------------------*/

  const { userName } = useParams();

  const { data: profileOwnerData, isLoading: getOwnerDataLoading } =
    useGetProfileOwnerData(userName);

  const initialData1 = queryClient.getQueryData([
    "OnwerEvents",
    "upcoming",
    1,
    profileOwnerData?.id,
  ]);

  const initialData2 = queryClient.getQueryData([
    "OnwerEvents",
    "previous",
    1,
    profileOwnerData?.id,
  ]);

  const [upcomingList, setUpcomingList] = useState(
    () => initialData1?.Events1 || []
  );

  const [previousList, setPreviousList] = useState(
    () => initialData2?.Events1 || []
  );

  const { data: ownerEvents, isLoading: eventsLoading } = useGetOwnerEvents(
    alignment,
    page,
    profileOwnerData?.id,
    previousList,
    setPreviousList,
    upcomingList,
    setUpcomingList
  );

  const isFollowing = !!useIsFollowing(profileOwnerData?.id).data;
  const currentOrganizer = isCurrentOrganizer(userName);
  const attendee = isAttendee();

  /*----------------------------------------------------- Get Data ---------------------------------------------------*/

  if (getOwnerDataLoading) {
    return <MainLoding isLoading={getOwnerDataLoading} />;
  }

  const {
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
    color: "gray",
    padding: "10%",
  };

  const cardStyle = {
    width: {
      xs: "78vw",
      sm: "40vw",
      md: "31vw",
      lg: "21vw",
      xl: "21.5vw",
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
          isLikedByCurrentUser={event.isLikedByCurrentUser}
        />
      );
    });
  };

  return (
    <Grid container position="relative">
      <CssBaseline />

      <Grid item xs={12} height={"260px"}>
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
              isAttendee={attendee}
              isFollowing={isFollowing}
              isVerified={isVerified}
              organizerId={profileOwnerData?.id}
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
            src={`${import.meta.env.VITE_API_URL}/${imageUrl}`}
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
              isAttendee={attendee}
              isFollowing={isFollowing}
              isVerified={isVerified}
              organizerId={profileOwnerData?.id}
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
            {(socialMedia.length !== 0 || currentOrganizer) && (
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
                  {currentOrganizer && (
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
          mt={3}
          lg={9.3}
          display="flex"
          flexDirection="column"
          height={"fit-content"}
          gap={3}
        >
          {/*About Section*/}
          {(currentOrganizer || bio !== "") && (
            <Grid
              item
              component={Paper}
              elevation={1}
              position="relative"
              width="100%"
              height={"fit-content"}
            >
              {/*Title (About)*/}
              <Typography color="#283593" component="h1" variant="h4" p={2}>
                About
              </Typography>

              {/*About Section Content*/}
              <Typography component="pre" pl={2} pb={2} whiteSpace="pre-wrap">
                {bio}
              </Typography>

              {/*Edit Icon Button*/}
              {currentOrganizer && (
                <IconButton
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
            </Grid>
          )}

          {/*Events Section*/}
          <Grid item component={Paper} elevation={1}>
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

            {/*Ub coming || Previous Events Toggle*/}
            <ToggleButtonGroup
              sx={{ p: 2, pb: 3 }}
              color="primary"
              value={alignment}
              exclusive
              onChange={handleEvent}
            >
              <ToggleButton value="upcoming">Up Coming</ToggleButton>
              <ToggleButton value="previous">Previous</ToggleButton>
            </ToggleButtonGroup>

            {(alignment === "upcoming" ? upcomingList : previousList)
              ?.length === 0 ? (
              <Typography variant="h6" sx={{ ...noEventsStyle }}>
                No events available at the moment.
              </Typography>
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

                {eventsLoading ? (
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
                    {Array.from(new Array(6)).map((_, index) => (
                      <EventCardLoading key={index} customStyle={cardStyle} />
                    ))}
                  </Box>
                ) : (
                  6 * page < currentEventCount && (
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
                  )
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
