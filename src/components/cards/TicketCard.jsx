import { Add, Remove } from "@mui/icons-material";
import { Box, Divider, IconButton, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
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
  orders,
}) {
  const [count, setCount] = useState(0);

  const addTicket = (name, price, id) => {
    addToOrder(name, price, id);
    setCount(count + 1);
  };

  const removeTicket = (name, price, id) => {
    removeFromOrder(name, price, id);
    setCount(count - 1);
  };

  const handelEndSaleDate = () => {
    const endDate = new Date(`${endSale}z`);
    const date = dayjs(endDate);
    const formattedDate = date.format("D MMM YYYY [at] h:mm A");
    return formattedDate;
  };

  const handelStartSaleDate = () => {
    const startDate = new Date(`${startSale}z`);
    const date = dayjs(startDate);
    const formattedDate = date.format("D MMM YYYY [at] h:mm A");
    return formattedDate;
  };

  const isStarted = () => {
    const startDate = dayjs(new Date(`${startSale}z`));
    const date = dayjs();

    return date.isAfter(startDate);
  };

  const isEnded = () => {
    const endDate = dayjs(new Date(`${endSale}z`));
    const date = dayjs();

    return date.isAfter(endDate);
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
            color="primary"
            onClick={() => addTicket(name, price, id)}
            disabled={
              (isManaged && orders?.size >= 1) ||
              quantity - count <= 0 ||
              isEnded() ||
              !isStarted()
            }
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

        {isStarted() ? (
          !isEnded() ? (
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
          )
        ) : (
          <Paper
            sx={{ mr: 1, bgcolor: "#f5f5f5", width: "114px" }}
            elevation={0}
          >
            <Typography p={0.6} align="center" color="red">
              Not Started
            </Typography>
          </Paper>
        )}
      </Box>
      {isStarted() ? (
        !isEnded() ? (
          <Typography
            variant="body1"
            fontWeight={400}
            pl={{ xs: 2, sm: 3 }}
            pt={1}
            pb={2}
          >
            Sales end on {handelEndSaleDate()}
          </Typography>
        ) : (
          <Typography
            variant="body1"
            fontWeight={400}
            pl={{ xs: 2, sm: 3 }}
            pt={1}
            pb={2}
          >
            Sales ended on {handelEndSaleDate()}
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
