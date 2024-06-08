import { Avatar, Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import Bus from "../../assets/images/CategoriesImage/Bus.jpeg";
import Art from "../../assets/images/CategoriesImage/Art.jpeg";
import Edu from "../../assets/images/CategoriesImage/Edu.jpeg";
import Enter from "../../assets/images/CategoriesImage/Enter.jpeg";
import Helth from "../../assets/images/CategoriesImage/Helth.jpeg";
import sport from "../../assets/images/CategoriesImage/sport.jpeg";
import Tech from "../../assets/images/CategoriesImage/Tech.jpeg";

export default function CategoriesCard({ name }) {
  const isFullScreen = useMediaQuery("(max-width: 700px)");

  const selectImage = (name) => {
    switch (name) {
      case "Business":
        return Bus;
      case "Art":
        return Art;
      case "Educational":
        return Edu;
      case "Entertainment":
        return Enter;
      case "Helth":
        return Helth;
      case "Sport":
        return sport;
      case "Technology":
        return Tech;
      default:
        return Bus;
    }
  };

  return (
    <Box
      width="180px"
      height="180px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      m={1}
    >
      <Avatar
        src={selectImage(name)}
        sx={{
          width: isFullScreen ? "90px" : "130px",
          height: isFullScreen ? "90px" : "130px",
          border: "#bdbdbd solid 1px",
          mb: 2,
          p: 4,
        }}
      />
      <Typography>{name}</Typography>
    </Box>
  );
}
