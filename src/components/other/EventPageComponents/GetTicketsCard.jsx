import { Paper, Typography } from "@mui/material";
import Button from "@mui/material/Button";

export default function GetTicketsCard({ ticketsData }) {
  const handelTicketPrice = () => {
    const TicketPrice = ticketsData.map((ticket) => ticket.price);
    const minPrice = Math.min(...TicketPrice);
    const maxPrice = Math.max(...TicketPrice);
    if (minPrice == 0 && maxPrice == 0) {
      return (
        <Typography
          variant="body1"
          color="initial"
          sx={{ fontWeight: "700", fontSize: "20px" }}
        >
          Free
        </Typography>
      );
    }
    return (
      <Typography
        variant="body1"
        color="initial"
        sx={{ fontWeight: "700", fontSize: "20px" }}
      >
        From ${minPrice}
      </Typography>
    );
  };

  return (
    <Paper
      elevation={1}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        height: "140px",
        mt: 3,
        position: "sticky",
        top: "14vh",
      }}
    >
      {handelTicketPrice()}
      <Button variant="contained" color="primary" sx={{ width: "90%" }}>
        Buy Ticket
      </Button>
    </Paper>
  );
}
