import { Paper, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import GetTicketDialog from "../GetTicketComponent/GetTicketDialog";
import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import GuestDialog from "./GuestDialog";

export default function GetTicketsCard({ ticketsData, data }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useContext(UserContext);
  const handleOpenGuestDialog = () => {
    setOpen(true);
  };
  const handleCloseGuestDialog = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };

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
      {data.ticketsSalesEnded ? (
        <Typography
          variant="body1"
          color="initial"
          sx={{ fontWeight: "700", fontSize: "20px" }}
        >
          Sales Ended
        </Typography>
      ) : (
        handelTicketPrice()
      )}
      <Button
        variant="contained"
        color="primary"
        sx={{ width: "90%", textTransform: "capitalize" }}
        onClick={isAuthenticated() ? handleClickOpen : handleOpenGuestDialog}
        disabled={data.ticketsSalesEnded}
      >
        Buy Ticket
      </Button>

      <GetTicketDialog
        open={openDialog}
        handleClose={handleClose}
        data={data}
      />
      <GuestDialog open={open} handleClose={handleCloseGuestDialog} />
    </Paper>
  );
}
