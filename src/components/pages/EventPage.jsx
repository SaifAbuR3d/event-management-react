import React from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Container, Typography, Button, Box, IconButton } from "@mui/material";
import GetTicketsCard from "../cards/GetTicketsCard.jsx";
import TitleAndSubtitleCard from "../cards/TitleAndSubtitleCard.jsx";
import OrganizedByCard from "../cards/OrganizedByCard.jsx";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IosShareIcon from "@mui/icons-material/IosShare";
import { Flag } from "@mui/icons-material";
//style={{ border: "5px solid red" }}
export default function EventPage() {
  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          {/* main image */}

          <Grid
            item
            xs={12}
            sx={{
              border: "1px solid black",
              display: "flex",
              justifyContent: "center",
              // alignItems: "center",
            }}
          >
            <Paper
              sx={{
                p: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                padding: "0px 8px ",
                borderRadius: "20px",
                m: 1,
              }}
            >
              <img
                src="../../../public/Event_Main_Image.png"
                alt=""
                style={{
                  width: "85%",
                  height: "430px",
                }}
              />
            </Paper>
          </Grid>

          {/* main date and like & share */}

          <Grid
            item
            xs={12}
            sx={{ border: "1px solid black", display: "flex" }}
          >
            <Typography
              variant="body2"
              color="initial"
              sx={{
                mb: 1,
                fontSize: "18px",
                fontWeight: "bold",
                flexGrow: "1",
                width: "50%",
                ml: 2,
              }}
            >
              Saturday,Mar 24
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "85px",
              }}
            >
              <IconButton>
                <FavoriteBorderIcon />
              </IconButton>
              <IconButton>
                <IosShareIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* main page */}

          <Grid item xs={12} md={8} sx={{ border: "1px solid black" }}>
            <Paper sx={{ ml: 2, width: "95%", p: 2, mb: "30px", mt: 2 }}>
              <Typography
                variant="h3"
                sx={{ fontBold: "800", fontSize: "37px" }}
              >
                Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
              </Typography>
            </Paper>
            <TitleAndSubtitleCard
              title={"Date and Time"}
              subtitle={"Monday 10th August 2021"}
              forWhat={"date"}
            />
            <TitleAndSubtitleCard
              title={"Location"}
              subtitle={"Lorem ipsum dolor sit amet, consectetur "}
              forWhat={"location"}
            />
            <TitleAndSubtitleCard
              title={"About this event"}
              subtitle={`Lorem ipsum dolor sit amet, adipiscing elit.Phasellus accumsan, 
              consectetur tortor eget ullamcorper accumsan, justo nuncullamcorper augue  
               augue, ac accumsan nunc augue ac .consectetur tortor eget ullamcorper accumsan,
               justo nuncullamcorper augue Lorem ipsum dolor sit amet, adipiscing elit.Phasellus accumsan, 
               consectetur tortor eget ullamcorper accumsan, justo nuncullamcorper augue  
                augue, ac accumsan nunc augue ac .consectetur tortor eget ullamcorper accumsan,
                justo nuncullamcorper augue Lorem ipsum dolor sit amet, adipiscing elit.Phasellus accumsan, 
              consectetur tortor eget ullamcorper accumsan, justo nuncullamcorper augue  
               augue, ac accumsan nunc augue ac .consectetur tortor eget ullamcorper accumsan,
               justo nuncullamcorper augue  
              `}
            />
            <OrganizedByCard />

            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <IconButton color="primary">
                <Flag />
                <Typography
                  variant="body1"
                  color="primary"
                  sx={{ fontSize: "15px", fontWeight: "500", ml: 1 }}
                >
                  Report this event
                </Typography>
              </IconButton>
            </Box>
          </Grid>

          {/* get ticket */}

          <Grid
            item
            md={4}
            sx={{
              border: "1px solid black",
              justifyContent: "center",
              alignItems: "flex-start",
              display: { xs: "none", md: "flex" },
            }}
          >
            <GetTicketsCard />
          </Grid>

          {/* other event you may like */}
          <Grid item xs={12} sx={{ border: "1px solid black" }}></Grid>
        </Grid>
      </Container>

      <Box
        sx={{
          justifyContent: "center",
          width: "98vw",
          display: { xs: "flex", md: "none" },
          position: "sticky",
          bottom: "0vh",
          zIndex: "1000",
        }}
      >
        <GetTicketsCard />
      </Box>
    </>
  );
}
