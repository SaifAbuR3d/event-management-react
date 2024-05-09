import { Add, Remove } from "@mui/icons-material";
import { Box, Divider, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";

export default function TicketCard({
  id,
  name,
  price,
  quantity,
  index,
  endSale,
  startSale,
  addToOrder,
  removeFromOrder,
  isManaged,
}) {
  const [count, setCount] = useState(isManaged ? 1 : 0);

  const addTicket = (name, price, id) => {
    addToOrder(name, price, id);
    setCount(count + 1);
  };

  const removeTicket = (name, price, id) => {
    removeFromOrder(name, price, id);
    setCount(count - 1);
  };

  const handelEndSaleDate = () => {
    const date = new Date(endSale);
    const monthAbbreviation = date.toLocaleString("default", {
      month: "short",
    });
    const day = date.getDate();
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    if (hours > 12) {
      hours -= 12;
    }
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedDate = `${day} ${monthAbbreviation} ${year} at ${hours}:${formattedMinutes} ${amOrPm}`;

    return formattedDate;
  };

  const handelStartSaleDate = () => {
    const date = new Date(startSale);
    const monthAbbreviation = date.toLocaleString("default", {
      month: "short",
    });
    const day = date.getDate();
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    if (hours > 12) {
      hours -= 12;
    }
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedDate = `${day} ${monthAbbreviation} ${year} at ${hours}:${formattedMinutes} ${amOrPm}`;

    return formattedDate;
  };

  const isStarted = () => {
    const date = new Date(startSale);
    const currentDate = new Date();
    return date < currentDate;
  };

  const isEnded = () => {
    const date = new Date(endSale);
    const currentDate = new Date();

    return date < currentDate;
  };
  return (
    <Paper
      elevation={0}
      key={index}
      sx={{
        display: "flex",
        flexDirection: "column",
        border: "#e0e0e0 solid 1.5px",
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5" p={{ xs: 2, sm: 3 }}>
          {name}
        </Typography>
        <Box display="flex" justifyContent="center" gap={1}>
          <IconButton
            sx={{ visibility: isManaged ? "hidden" : "" }}
            color="primary"
            onClick={() => removeTicket(name, price, id)}
            disabled={count == 0}
          >
            <Remove
              fontSize="large"
              sx={{ border: "gray solid 1.5px", borderRadius: "20%" }}
            />
          </IconButton>
          <Typography variant="h6" display="flex" alignItems="center">
            {count}
          </Typography>
          <IconButton
            sx={{ visibility: isManaged ? "hidden" : "" }}
            color="primary"
            onClick={() => addTicket(name, price, id)}
            disabled={quantity - count <= 0 || isEnded() || !isStarted()}
          >
            <Add
              fontSize="large"
              sx={{ border: "gray solid 1.5px", borderRadius: "20%" }}
            />
          </IconButton>
        </Box>
      </Box>

      <Divider />

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="end"
        pb={isEnded() && 1}
      >
        <Typography variant="h6" fontWeight={500} pl={{ xs: 2, sm: 3 }} pt={2}>
          ${price}
        </Typography>
        {!isEnded() ? (
          <Paper
            sx={{ mr: 1, bgcolor: "#f5f5f5", width: "114px" }}
            elevation={0}
          >
            <Typography
              p={0.6}
              align="center"
              color={quantity - count > 0 ? "inherit" : "red"}
            >
              {quantity - count > 0
                ? `${quantity - count} remaining`
                : "Soled Out"}
            </Typography>
          </Paper>
        ) : (
          <Paper
            sx={{ mr: 1, bgcolor: "#f5f5f5", width: "114px" }}
            elevation={0}
          >
            <Typography p={0.6} align="center" color="red">
              Sales Ended
            </Typography>
          </Paper>
        )}
      </Box>
      {isStarted() ? (
        !isEnded() && (
          <Typography
            variant="body1"
            fontWeight={400}
            pl={{ xs: 2, sm: 3 }}
            pt={1}
            pb={2}
          >
            Sales end on {handelEndSaleDate()}
          </Typography>
        )
      ) : (
        <Typography
          variant="body1"
          fontWeight={400}
          pl={{ xs: 2, sm: 3 }}
          pt={1}
          pb={2}
        >
          Sales start in {handelStartSaleDate()}
        </Typography>
      )}
    </Paper>
  );
}
