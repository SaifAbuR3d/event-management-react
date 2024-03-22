import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import TwitterIcon from "@mui/icons-material/Twitter";

import React from "react";

export default function OrganizedByCard() {
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: "95%",
          minHeight: "100px",
          mt: 1,
          mb: "20px",
          ml: 2,
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
              alt="Ahmad Anini"
              src="/static/images/avatar/1.jpg"
            />
            <Box>
              <Typography variant="h6" color="initial">
                Ahmad Anini
              </Typography>
              <Typography
                variant="body1"
                color="initial"
                sx={{ textWrap: "no-wrap" }}
              >
                <b>1.4k</b> following this creator
              </Typography>
            </Box>
          </Box>
          <Box
            alignSelf={"flex-end"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{
              gap: { xs: "150px", md: "15px" },
              alignSelf: { xs: "center", md: "flex-end" },
            }}
          >
            <Button variant="Text" color="primary" sx={{ height: "42px" }}>
              Contact
            </Button>
            <Button variant="contained" color="primary" sx={{ height: "42px" }}>
              Follow
            </Button>
          </Box>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          gap={"20px"}
          mt={"35px"}
        >
          <FacebookRoundedIcon color="primary" sx={{ fontSize: "33px" }} />
          <LanguageRoundedIcon color="primary" sx={{ fontSize: "33px" }} />
          <TwitterIcon color="primary" sx={{ fontSize: "33px" }} />
        </Box>
      </Paper>
    </>
  );
}
