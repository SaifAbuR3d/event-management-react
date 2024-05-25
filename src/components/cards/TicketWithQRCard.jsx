import { Avatar, Box, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import dayjs from "dayjs";

export default function TicketWithQRCard({
  price,
  ticketTypeName,
  eventName,
  creationDate,
  qrCodeImageUrl,
}) {
  const cusomFont = {
    fontFamily: '"Dancing Script", cursive',
    fontOpticalSizing: "auto",
    fontWeight: 600,
    fontStyle: "normal",
  };

  const formattedDate = dayjs(creationDate).format("DD MMM YYYY, h:mm A");
  return (
    <Box
      component={Paper}
      elevation={0}
      border={1}
      borderColor={"#9e9e9e"}
      display="flex"
      alignItems="center"
      sx={{ backgroundImage: "linear-gradient(to right, #9fa8da , #f5fffa)" }}
    >
      <Box
        height="180px"
        width="180px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar
          src={`${import.meta.env.VITE_API_URL}/${qrCodeImageUrl}`}
          variant="square"
          sx={{ width: "90%", height: "90%" }}
        />
      </Box>
      <Box borderLeft="grey dashed 2px" height="150px" />
      <Box
        component={Paper}
        elevation={0}
        height="180px"
        width="calc(100% - 180px)"
        sx={{ backgroundImage: "linear-gradient(to right, #c5cae9 , #f5f6fa)" }}
      >
        <Typography
          variant="h5"
          mb={1}
          mt={1}
          align="center"
          sx={{ ...cusomFont }}
        >
          {eventName}
        </Typography>
        <Divider variant="middle" flexItem sx={{ ml: "10%", mr: "10%" }} />

        <Box
          display="flex"
          flexDirection="column"
          height="calc(100% - 100px)"
          justifyContent="space-around"
          pl={4}
          pr={4}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <Typography sx={{ ...cusomFont }} variant="h6">
              Type : {ticketTypeName}
            </Typography>
            <Typography sx={{ ...cusomFont }} variant="h6">
              Price : {price}$
            </Typography>
          </Box>
        </Box>
        <Typography
          pl={1}
          pr={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection={{ xs: "column", sm: "row", ...cusomFont }}
          fontSize={19}
        >
          <span>Date of Buy : </span> <span>{formattedDate}</span>
        </Typography>
      </Box>
    </Box>
  );
}
