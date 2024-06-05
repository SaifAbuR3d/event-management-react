import {
  Grid,
  Box,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import intro from "../../assets/images/intro5.jpg";
import { useGetAllCategories } from "../../API/HomePageApi";
import CategoriesCard from "../cards/CategoriesCard";

export default function Home() {
  const isFullScreen = useMediaQuery("(max-width: 700px)");

  const { data: Categories, isLoading } = useGetAllCategories();

  const renderCategories = Categories?.map((c, index) => {
    return <CategoriesCard key={index} name={c.name} />;
  });

  return (
    <Grid container>
      <Grid component="section" width="100%">
        <Box
          width="100%"
          maxHeight="550px"
          sx={{
            position: "relative",
            backgroundImage: `url(${intro})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            aspectRatio: "16/9",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              display: "flex",
              justifyContent: "start",
            }}
          >
            <Box
              p={isFullScreen ? 2 : 5}
              width={isFullScreen ? "45vw" : { sm: "40%", md: "30%" }}
              height="100%"
              sx={{ backgroundColor: "rgba(255, 255, 255, 0.50)" }}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                align="center"
                variant={isFullScreen ? "h6" : "h3"}
                component="h1"
              >
                Event Aura
              </Typography>
              <Typography
                variant={isFullScreen ? "body1" : "h6"}
                align="center"
              >
                Start planning your dream event with Event Aura today!
              </Typography>

              <Button
                variant="contained"
                sx={{
                  fontSize: isFullScreen ? "8px" : "13px",
                  height: isFullScreen ? "30px" : "45px",
                }}
              >
                Find Your Next Event
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>

      <Grid
        component="section"
        width="100%"
        height="250px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        m="auto"
        sx={{ overflowX: "auto" }}
        whiteSpace="nowrap"
        borderBottom="#bdbdbd solid 1px"
      >
        {renderCategories}
      </Grid>
    </Grid>
  );
}
