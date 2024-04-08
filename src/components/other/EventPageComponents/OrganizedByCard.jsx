import { Avatar, Box, Button, Paper, Typography, Link } from "@mui/material";
import FacebookIcon from "@mui/icons-material/FacebookRounded";
import LanguageIcon from "@mui/icons-material/LanguageRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useState } from "react";
import { Instagram, LinkedIn } from "@mui/icons-material";
import { useAddFollow } from "../../../API/eventPageApi";

export default function OrganizedByCard({ organizer, followersCount }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isAtndee, setIsAtndee] = useState(true);

  const { displayName, id, profile, imageUrl } = organizer;

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWhtYWQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhaG1hZEBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBdHRlbmRlZSIsImV4cCI6MTcxMTU5MDk5NCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwIn0.HnCOwN1trD005EZYRzOB6Ebg3Y9R-vP6gDhYaOeqlco";

  const { mutateAsync } = useAddFollow(id, token, setIsFollowing);

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
                <b>{followersCount}</b> following this creator
              </Typography>
            </Box>
          </Box>
          {isAtndee && (
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
              <Button variant="Text" color="primary" sx={{ height: "42px" }}>
                Contact
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ height: "42px" }}
                onClick={mutateAsync}
              >
                {!isFollowing ? "Follow" : "Unfollow"}
              </Button>
            </Box>
          )}
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
      </Paper>
    </>
  );
}

const SocialLink = ({ href, icon }) => (
  <Link href={href} target="_blank">
    {icon}
  </Link>
);
