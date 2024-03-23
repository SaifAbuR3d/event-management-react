import { Facebook, Instagram, LanguageOutlined, LinkedIn, Twitter } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function SocialMediaLinkButton({ index, path, title }) {
  let Icon;
  switch (title) {
    case "LinkedIn":
      Icon = LinkedIn;
      break;
    case "Facebook":
      Icon = Facebook;
      break;
    case "Twitter":
      Icon = Twitter;
      break;
    case "Instagram":
      Icon = Instagram;
      break;
    case "Web Site":
      Icon = LanguageOutlined;
      break;
    default:
      Icon = null;
  }

  return (
    <Box
      key={index}
      component={Link}
      to={path}
      target="_blank"
      display="flex"
      justifyContent="space-around"
      alignContent="center"
      color="#283593"
      sx={{
        textDecoration: "none",
      }}
    >
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Icon fontSize="large" />
      </Box>

      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          display={{
            xs: "none",
            md: "flex",
          }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
}
