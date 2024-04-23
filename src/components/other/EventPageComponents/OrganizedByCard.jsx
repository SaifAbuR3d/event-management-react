import { Avatar, Box, Button, Paper, Typography, Link } from "@mui/material";
import FacebookIcon from "@mui/icons-material/FacebookRounded";
import LanguageIcon from "@mui/icons-material/LanguageRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useContext, useEffect, useState } from "react";
import { Instagram, LinkedIn } from "@mui/icons-material";
import { useAddFollow, useRemoveFollow } from "../../../API/eventPageApi";
import { UserContext } from "../../../contexts/UserContext";
import GuestDialog from "./GuestDialog";

export default function OrganizedByCard({ organizer, followersData }) {
  const [following, setFollowing] = useState(false);
  const [open, setOpen] = useState(false);
  const { isOrganizer, isAuthenticated, user } = useContext(UserContext);
  const { displayName, id, profile, imageUrl } = organizer;
  const { totalCount, data } = followersData;
  const { mutateAsync: mutateFollow } = useAddFollow(id, setFollowing);
  const { mutateAsync: mutateUnFollow } = useRemoveFollow(id, setFollowing);

  const isFollowingg = () =>
    !!data?.find((follower) => follower?.userName == user?.userName);

  useEffect(() => {
    setFollowing(isFollowingg());
  }, [isAuthenticated()]);

  const handleOpenGuestDialog = () => {
    setOpen(true);
  };
  const handleCloseGuestDialog = () => {
    setOpen(false);
  };

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
              src={`${import.meta.env.VITE_API_URL}/${imageUrl}`}
            />
            <Box>
              <Typography variant="h6" color="initial">
                {displayName}
              </Typography>
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
              disabled={isOrganizer()}
            >
              Contact
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ height: "42px" }}
              onClick={
                isAuthenticated()
                  ? !following
                    ? mutateFollow
                    : mutateUnFollow
                  : handleOpenGuestDialog
              }
              disabled={isOrganizer()}
            >
              {!following ? "Follow" : "Unfollow"}
            </Button>
          </Box>
        </Box>

        {/* socil media links */}

        <Box
          display={"flex"}
          justifyContent={"center"}
          gap={"20px"}
          mt={"35px"}
        >
          {profile?.website && (
            <SocialLink href={profile.website} icon={<LanguageIcon />} />
          )}
          {profile?.facebook && (
            <SocialLink href={profile.facebook} icon={<FacebookIcon />} />
          )}
          {profile?.instagram && (
            <SocialLink href={profile.instagram} icon={<Instagram />} />
          )}
          {profile?.twitter && (
            <SocialLink href={profile.twitter} icon={<TwitterIcon />} />
          )}
          {profile?.linkedIn && (
            <SocialLink href={profile.linkedIn} icon={<LinkedIn />} />
          )}
        </Box>
        <GuestDialog open={open} handleClose={handleCloseGuestDialog} />
      </Paper>
    </>
  );
}

const SocialLink = ({ href, icon }) => (
  <Link href={href} target="_blank">
    {icon}
  </Link>
);
