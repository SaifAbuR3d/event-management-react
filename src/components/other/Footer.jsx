import React from "react";
import { Box, Typography, Link, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </Typography>
        <Box>
          <Link
            href="/privacy"
            variant="body2"
            color="text.secondary"
            sx={{ mr: 2 }}
          >
            Privacy Policy
          </Link>
          <Link href="/terms" variant="body2" color="text.secondary">
            Terms of Service
          </Link>
        </Box>
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
      </Box>
    </Box>
  );
}
