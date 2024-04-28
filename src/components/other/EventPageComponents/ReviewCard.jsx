import { Avatar, Box, Paper, Rating, Typography } from "@mui/material";
import React from "react";

export default function ReviewCard({ data }) {
  const { attendeeName, comment, rating } = data;
  return (
    <Paper
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        p: 2,
        gap: 1,
      }}
      elevation={3}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ mr: 2 }}>H</Avatar>
        <Typography variant="body1" color="initial" sx={{ fontWeight: "bold" }}>
          {attendeeName}
        </Typography>
      </Box>
      <Rating name="read-only" value={rating} readOnly />
      <Typography variant="body1" color="initial">
        {comment}
      </Typography>
    </Paper>
  );
}
