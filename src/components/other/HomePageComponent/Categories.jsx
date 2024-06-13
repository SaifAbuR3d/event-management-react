import React from "react";
import { useGetAllCategories } from "../../../API/HomePageApi";
import CategoriesCard from "../../cards/CategoriesCard";
import { Box, Grid } from "@mui/material";

export default function Categories() {
  const { data: Categories, isLoading: CategoryLoading } =
    useGetAllCategories();

  const renderCategories = Categories?.map((c, index) => {
    return <CategoriesCard key={index} name={c.name} />;
  });

  const scrollbarStyles = {
    "&::-webkit-scrollbar": {
      height: "7px",
    },
    "&::-webkit-scrollbar-track": {
      borderRadius: "8px",
      backgroundColor: "#e7e7e7",
      border: "1px solid #cacaca",
      boxShadow: "inset 0 0 6px rgba(0, 0, 0, .3)",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "8px",
      backgroundColor: "#363636",
    },
  };

  return (
    <Grid
      component="section"
      width="100%"
      height="250px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderBottom="#bdbdbd solid 1px"
    >
      <Box
        width="100%"
        maxWidth="85%"
        display="flex"
        sx={{ overflowX: "auto", whiteSpace: "nowrap", ...scrollbarStyles }}
      >
        {renderCategories}
      </Box>
    </Grid>
  );
}
