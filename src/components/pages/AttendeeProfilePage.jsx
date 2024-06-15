import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Avatar,
  Box,
  Grid,
  Tab,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import FavorietesList from "../other/AttendeeProfileComponent/FavorietesList";
import FollowingList from "../other/AttendeeProfileComponent/FollowingList";
import { Favorite, LocalActivity, People } from "@mui/icons-material";
import UpcomingBookingsList from "../other/AttendeeProfileComponent/UpcomingBookingsList";
import PreviousBookingsList from "../other/AttendeeProfileComponent/PreviousBookingsList";
import { useGetAttendeeData } from "../../API/AttendeeProfileApi";
import { useParams, useSearchParams } from "react-router-dom";
import MainLoding from "../looding/MainLoding";
import ChangeViewAttendeeImage from "../other/AttendeeProfileComponent/CahngeViewAteendeeImage";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function AttendeeProfilePage() {
  const [alignment, setAlignment] = useState("upcoming");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { isCurrentAttendee } = useContext(UserContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const value = useMemo(() => searchParams.get("tabId") ?? "1", [searchParams]);

  const handleChange = (event, newValue) => {
    setSearchParams({ tabId: newValue }, { replace: true });
  };

  const handleClickListItem = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleEvent = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const { userName } = useParams();

  const { data, isLoading } = useGetAttendeeData(userName);

  if (isLoading) {
    return <MainLoding isLoading={isLoading} />;
  }

  const { fullName, imageUrl, id } = data;

  const currentAttendee = isCurrentAttendee(userName);

  const image = imageUrl
    ? `${import.meta.env.VITE_API_URL}/${imageUrl}`
    : "/static/images/avatar/1.jpg";

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        height={"260px"}
        bgcolor="#c5cae9"
        display="flex"
        justifyContent="center"
        alignItems="end"
        position="relative"
      >
        <Avatar
          src={image}
          onClick={handleClickListItem}
          sx={{
            width: {
              xs: "185px",
              md: "12rem",
              lg: "13rem",
            },
            height: {
              xs: "185px",
              md: "12rem",
              lg: "13rem",
            },
            cursor: "pointer",
            position: "absolute",
            bottom: "-32%",
          }}
        />
        <ChangeViewAttendeeImage
          open={open}
          handleClose={handleClose}
          anchorEl={anchorEl}
          image={imageUrl}
          ownerData={data}
        />
        <Typography position="absolute" bottom="-52%" variant="h4">
          {fullName}
        </Typography>
      </Grid>

      <Grid
        item
        ml={"auto"}
        mr={"auto"}
        width={{ xs: "95%", sm: "85%" }}
        height={"fit-content"}
        justifyContent={"space-between"}
        mt={19}
      >
        <TabContext value={value} variant="scrollable" scrollButtons={true}>
          <Box
            sx={{
              width: "100%",
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TabList onChange={handleChange}>
              <Tab icon={<Favorite />} label="Favorietes" value="1" />
              {currentAttendee && (
                <Tab icon={<LocalActivity />} label="Bookings" value="2" />
              )}
              <Tab icon={<People />} label="Following" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ padding: 0 }}>
            <FavorietesList id={id} />
          </TabPanel>
          <TabPanel
            value="2"
            sx={{
              padding: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ToggleButtonGroup
              sx={{ p: 2 }}
              color="primary"
              value={alignment}
              exclusive
              onChange={handleEvent}
            >
              <ToggleButton value="upcoming">Up Coming</ToggleButton>
              <ToggleButton value="previous">Previous</ToggleButton>
            </ToggleButtonGroup>

            {alignment === "upcoming" ? (
              <UpcomingBookingsList />
            ) : (
              <PreviousBookingsList />
            )}
          </TabPanel>
          <TabPanel value="3" sx={{ padding: 0 }}>
            <FollowingList id={id} />
          </TabPanel>
        </TabContext>
      </Grid>
    </Grid>
  );
}
