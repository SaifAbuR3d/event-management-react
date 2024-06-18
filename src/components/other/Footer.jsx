import React from "react";
import { Box, Typography, IconButton, Avatar } from "@mui/material";
import logo from "../../assets/images/logo1.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: "#c5cae9",
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar
          src={logo}
          variant="square"
          sx={{ width: "130px", height: "130px" }}
        />

        <Typography mb={3} mt={3} variant="body1" color="text.secondary">
          <Link to={"/"} style={{ textDecoration: "none" }}>
            Home
          </Link>
           {" | "} 
          <Link to={"/search"} style={{ textDecoration: "none" }}>
            Search
          </Link>
        </Typography>

        <Box>
          <IconButton
            component="a"
            href="https://www.facebook.com"
            color="inherit"
            aria-label="facebook"
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.twitter.com"
            color="inherit"
            aria-label="twitter"
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.instagram.com"
            color="inherit"
            aria-label="instagram"
          >
            <InstagramIcon />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.linkedin.com"
            color="inherit"
            aria-label="linkedin"
          >
            <LinkedInIcon />
          </IconButton>
        </Box>

        <Typography mt={3} variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Event Aura. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
