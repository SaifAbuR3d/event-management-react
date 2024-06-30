import {
  Avatar,
  Box,
  Button,
  Paper,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { useContext, useState } from "react";
import {
  Instagram,
  LinkedIn,
  Facebook,
  Language,
  Twitter,
} from "@mui/icons-material";
import {
  useAddFollow,
  useCheckIsFollowingOrganizer,
  useGetOrganizerFollowers,
  useRemoveFollow,
} from "../../../API/eventPageApi";
import { UserContext } from "../../../contexts/UserContext";
import GuestDialog from "./GuestDialog";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MainLoding from "../../looding/MainLoding";
import LoadingButton from "@mui/lab/LoadingButton";

const StyledLink = styled(Link)(({ theme }) => ({
  color: "black",
  textDecoration: "none",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
  "&:hover": {
    textDecoration: "underline",
    color: "violet",
  },
}));

export default function OrganizedByCard({
  organizer,
  followersData,
  checkFlag,
}) {
  const [open, setOpen] = useState(false);
  const { isOrganizer, isAdmin, isAuthenticated } = useContext(UserContext);
  const { displayName, id, profile, imageUrl, userName } = organizer;

  const { mutateAsync: mutateFollow, isPending: isPendingFollow } =
    useAddFollow(id);
  const { mutateAsync: mutateUnFollow, isPending: isPendingUnFollow } =
    useRemoveFollow(id);

  const { totalCount } = followersData;

  const handleOpenGuestDialog = () => {
    setOpen(true);
  };
  const handleCloseGuestDialog = () => {
    setOpen(false);
  };

  const { website, twitter, facebook, linkedIn, instagram } = profile;

  const socialMedia = [
    { icon: <LinkedIn />, link: linkedIn },
    { icon: <Facebook />, link: facebook },
    { icon: <Twitter />, link: twitter },
    { icon: <Instagram />, link: instagram },
    { icon: <Language />, link: website },
  ];

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: "95%",
          minHeight: "100px",
          mt: 1,
          mb: "20px",
          ml: 1,
          p: 2,
          bgcolor: "#f8f7fa",
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          Organized By
        </Typography>
        <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"space-between"}
          sx={{
            flexDirection: { md: "row", xs: "column" },
            gap: { xs: "25px", md: "0" },
          }}
        >
          <Box
            flexGrow={"1"}
            display={"flex"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            gap={"15px"}
          >
            <Avatar
              sx={{ width: "47px", height: "47px" }}
              alt={displayName}
              src={
                imageUrl ? `${import.meta.env.VITE_API_URL}/${imageUrl}` : null
              }
            />
            <Box>
              <StyledLink to={`/organizer-profile/${userName}`}>
                {displayName}
              </StyledLink>
              <Typography
                variant="body1"
                color="initial"
                sx={{ textWrap: "no-wrap" }}
              >
                <b>{totalCount}</b> following this creator
              </Typography>
            </Box>
          </Box>

          <Box
            alignSelf={"flex-end"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{
              gap: { xs: "25px", sm: "75px", md: "15px" },
              alignSelf: { xs: "center", md: "flex-end" },
            }}
          >
            <Button
              variant="Text"
              color="primary"
              sx={{ height: "42px" }}
              disabled={isAdmin() || isOrganizer()}
            >
              Contact
            </Button>
            <LoadingButton
              variant="contained"
              color="primary"
              sx={{ height: "42px" }}
              loading={isPendingFollow || isPendingUnFollow}
              onClick={
                isAuthenticated()
                  ? !checkFlag
                    ? mutateFollow
                    : mutateUnFollow
                  : handleOpenGuestDialog
              }
              disabled={isAdmin() || isOrganizer()}
            >
              {!checkFlag ? "Follow" : "Unfollow"}
            </LoadingButton>
          </Box>
        </Box>

        {/* socil media links */}

        <Box
          display={"flex"}
          justifyContent={"center"}
          gap={"20px"}
          mt={"35px"}
        >
          {socialMedia.map(
            (item) =>
              item.link && (
                <MuiLink key={item.link} href={item.link} target="_blank">
                  {item.icon}
                </MuiLink>
              )
          )}
        </Box>
        <GuestDialog open={open} handleClose={handleCloseGuestDialog} />
      </Paper>
    </>
  );
}
