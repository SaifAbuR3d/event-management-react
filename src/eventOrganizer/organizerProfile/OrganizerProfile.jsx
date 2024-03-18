import React from "react";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Box,
  Button,
  IconButton,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Delete,
  Edit,
  Facebook,
  LanguageOutlined,
  LanguageTwoTone,
  Link,
  PersonAddAltOutlined,
  TableRows,
  Twitter,
  ViewCarousel,
} from "@mui/icons-material";
import EventCard from "./EventCard";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import Sideimage4 from "../../../public/profilePhoto.jpg";
import { useState } from "react";

export default function OrganizerProfile() {
  const [alignment, setAlignment] = useState("web");
  const [layout, setLayout] = useState("slide");

  const handleEvent = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const handleLayout = (event, newLayout) => {
    setLayout(newLayout);
  };

  return (
    <Grid container>
      <CssBaseline />

      <Grid item xs={12} height={"35vh"}>
        <Box bgcolor="#c5cae9" height="100%" position="relative">
          <Box
            position="absolute"
            display="flex"
            flexDirection="column"
            alignItems="start"
            sx={{
              top: "60px",
              left: "27.5%",
            }}
            gap={2}
          >
            <Typography component="h1" variant="h4">
              Anini اخوان Company
            </Typography>
            <Typography component="h1" variant="body1">
              Anini اخوان Company
            </Typography>

            <Button
              variant="contained"
              sx={{ width: "60%" }}
              startIcon={<PersonAddAltOutlined />}
            >
              Follow
            </Button>
          </Box>
        </Box>
      </Grid>

      <Grid
        container
        ml={"auto"}
        mr={"auto"}
        width={"90%"}
        justifyContent={"space-between"}
      >
        {/*Left Side*/}
        <Grid
          container
          xs={12}
          md={2.6}
          display="flex"
          justifyContent="center"
          sx={{
            height: {
              sm: "22vh",
              md: "90vh",
            },
          }}
          height="30vh"
          position="relative"
        >
          {/*Profile Image*/}
          <Paper
            elevation={7}
            sx={{
              backgroundImage: `url(${Sideimage4})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: {
                sx: "100px",
                sm: "150px",
                md: "180px",
                lg: "220px",
                xl: "240px",
              },
              height: {
                sx: "100px",
                sm: "150px",
                md: "180px",
                lg: "220px",
                xl: "240px",
              },
              borderRadius: "50%",
              position: "absolute",
              top: { sm: "-110px", md: "-130px", lg: "-160px" },
              left: { sm: "41%", md: "auto" },
            }}
          />

          <Paper
            elevation={7}
            sx={{
              width: {
                sx: "100px",
                sm: "30%",
                md: "180px",
                lg: "220px",
                xl: "240px",
              },
              position: "absolute",
              top: {
                sx: "100px",
                sm: "80px",
                md: "110px",
              },
              left: { sm: "0", md: "auto" },
              display: "flex",
            }}
          >
            <Paper
              elevation={0}
              sx={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" color="#283593">
                254
              </Typography>
              <Typography variant="body1" color="#283593">
                followers
              </Typography>
            </Paper>
            <Paper
              elevation={0}
              sx={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" color="#283593">
                120
              </Typography>
              <Typography variant="body1" color="#283593">
                posts
              </Typography>
            </Paper>
          </Paper>

          <Paper
            elevation={7}
            sx={{
              width: {
                sx: "100px",
                sm: "69%",
                md: "180px",
                lg: "220px",
                xl: "240px",
              },
              position: "absolute",
              top: {
                sx: "300px",
                sm: "80px",
                md: "220px",
              },
              left: { sm: "31%", md: "auto" },
            }}
          >
            <Box
              display="flex"
              sx={{
                flexDirection: {
                  sm: "row",
                  md: "column",
                },
                gap: {
                  sm: 0,
                  md: 6,
                },
                pb: {
                  sm: 0,
                  md: 2,
                },
              }}
              alignItems="center"
              gap={2}
              width="100%"
              position="relative"
            >
              <IconButton
                sx={{
                  position: "absolute",
                  top: { sm: "1px", md: "3px" },
                  right: { sm: "1px", md: "10px" },
                }}
              >
                <Edit fontSize="small" color="secondary" />
              </IconButton>

              {/*Facebook section*/}
              <Paper
                elevation={0}
                sx={{
                  mt: {
                    sm: 0,
                    md: 4.5,
                  },
                  width: "100%",
                  display: "flex",
                  flexDirection: {
                    sm: "column",
                    md: "row",
                  },
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <Box
                  width="70%"
                  display="flex"
                  justifyContent="center"
                  variant="h6"
                  color="#283593"
                >
                  <Facebook fontSize="medium" />
                </Box>
                <Typography
                  display="flex"
                  justifyContent="center"
                  sx={{
                    width: {
                      sm: "100%",
                      md: "90%",
                    },
                  }}
                  variant="body1"
                  color="#283593"
                >
                  Facebook
                </Typography>
              </Paper>

              {/*Twitter section*/}
              <Paper
                elevation={0}
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: {
                    sm: "column",
                    md: "row",
                  },
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <Box
                  width="70%"
                  display="flex"
                  justifyContent="center"
                  variant="h6"
                  color="#283593"
                >
                  <Twitter fontSize="medium" />
                </Box>
                <Typography
                  display="flex"
                  justifyContent="center"
                  sx={{
                    width: {
                      sm: "100%",
                      md: "90%",
                    },
                  }}
                  variant="body1"
                  color="#283593"
                >
                  Twitter
                </Typography>
              </Paper>

              {/*Site section*/}
              <Paper
                elevation={0}
                sx={{
                  width: "100%",
                  display: "flex",
                  gap: 1,
                  flexDirection: {
                    sm: "column",
                    md: "row",
                  },
                }}
              >
                <Box
                  sx={{
                    width: {
                      sm: "100%",
                      md: "70%",
                    },
                  }}
                  display="flex"
                  justifyContent="center"
                  variant="h6"
                  color="#283593"
                >
                  <LanguageOutlined fontSize="medium" />
                </Box>
                <Typography
                  display="flex"
                  justifyContent="center"
                  sx={{
                    width: {
                      sm: "100%",
                      md: "90%",
                    },
                  }}
                  variant="body1"
                  color="#283593"
                >
                  Site
                </Typography>
              </Paper>

              {/*Copy Link section*/}
              <Paper
                elevation={0}
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: {
                    sm: "column",
                    md: "row",
                  },
                  gap: 1,
                  alignItems: "center",
                  mr: {
                    sm: "30px",
                    md: "auto",
                  },
                }}
              >
                <Box
                  width="70%"
                  display="flex"
                  justifyContent="center"
                  variant="h6"
                  color="#283593"
                >
                  <Link fontSize="medium" />
                </Box>
                <Typography
                  display="flex"
                  justifyContent="center"
                  sx={{
                    width: {
                      sm: "100%",
                      md: "90%",
                    },
                  }}
                  variant="body1"
                  color="#283593"
                >
                  Copy Link
                </Typography>
              </Paper>
            </Box>
          </Paper>
        </Grid>

        {/*Right Side*/}
        <Grid
          container
          xs={12}
          md={9}
          display="flex"
          flexDirection="row"
          gap="3vh"
        >
          {/*About Section*/}
          <Grid container xs={12} mt={2}>
            <Paper elevation={5} sx={{ position: "relative", width: "100%" }}>
              <Typography component="h1" variant="h5" p={2}>
                About
              </Typography>

              {/*Good until 65 words*/}
              <Typography p={1}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi pariatur labore in doloribus.
              </Typography>

              <IconButton
                aria-label="edit"
                color="secondary"
                sx={{ position: "absolute", top: "0", right: "0", p: "1rem" }}
              >
                <Edit />
              </IconButton>
            </Paper>
          </Grid>

          <Grid container component={Paper} xs={12} elevation={5}>
            {/*Ub coming || Previous Events Toggle*/}
            <ToggleButtonGroup
              sx={{ p: "20px" }}
              color="primary"
              value={alignment}
              exclusive
              onChange={handleEvent}
              aria-label="Platform"
            >
              <ToggleButton value="upcoming">Up Coming</ToggleButton>
              <ToggleButton value="previous">Previous</ToggleButton>
            </ToggleButtonGroup>

            {/*Slider or Grid View Toggle*/}
            <ToggleButtonGroup
              sx={{ p: "20px" }}
              color="primary"
              value={layout}
              exclusive
              onChange={handleLayout}
              aria-label="Platform"
            >
              <ToggleButton value="slide">
                <ViewCarousel />
              </ToggleButton>
              <ToggleButton value="grid">
                <TableRows />
              </ToggleButton>
            </ToggleButtonGroup>

            {layout === "slide" ? (
              <Swiper
                effect="coverflow"
                grabCursor
                centeredSlides
                loop
                slidesPerView={"auto"}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2,
                }}
                pagination={{ dynamicBullets: true }}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                style={{ position: "relative" }}
              >
                <SwiperSlide style={{ width: "auto", height: "auto" }}>
                  <EventCard />
                </SwiperSlide>
                <SwiperSlide style={{ width: "auto", height: "auto" }}>
                  <EventCard />
                </SwiperSlide>
                <SwiperSlide style={{ width: "auto", height: "auto" }}>
                  <EventCard />
                </SwiperSlide>
                <SwiperSlide style={{ width: "auto", height: "auto" }}>
                  <EventCard />
                </SwiperSlide>
                <SwiperSlide style={{ width: "auto", height: "auto" }}>
                  <EventCard />
                </SwiperSlide>
                <SwiperSlide style={{ width: "auto", height: "auto" }}>
                  <EventCard />
                </SwiperSlide>
                <IconButton
                  className="swiper-button-next"
                  aria-label="edit"
                  color="secondary"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    right: "0",
                    zIndex: "1",
                  }}
                >
                  <ArrowForwardIos fontSize="large" />
                </IconButton>
                <IconButton
                  className="swiper-button-prev"
                  aria-label="edit"
                  color="secondary"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "0",
                    zIndex: "1",
                  }}
                >
                  <ArrowBackIos fontSize="large" />
                </IconButton>
              </Swiper>
            ) : (
              <Box
                component="div"
                display="flex"
                justifyContent="center"
                flexDirection="row"
                flexWrap="wrap"
                sx={{
                  gap: 2,
                }}
              >
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
              </Box>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
