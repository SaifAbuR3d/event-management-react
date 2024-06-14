import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TicketWithQRCard from "../../cards/TicketWithQRCard";
import { IconButton, Typography, useMediaQuery } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useGetTickets } from "../../../API/AttendeeProfileApi";

export default function ShowTicketsDialog({
  open,
  handleClose,
  eventId,
  eventName,
}) {
  const isFullScreen = useMediaQuery("(max-width: 600px)");

  const { data: Tickets, isLoading } = useGetTickets(eventId);

  if (isLoading) {
    return <div>not found ...</div>;
  }

  const ticketsOnly = Tickets?.flatMap((t) => t.tickets);

  const renderTickets = ticketsOnly?.map((t, index) => {
    return (
      <TicketWithQRCard
        key={index}
        price={t.price}
        ticketTypeName={t.ticketTypeName}
        creationDate={t.creationDate}
        eventName={eventName}
        qrCodeImageUrl={t.qrCodeImageUrl}
      />
    );
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onClick={(event) => event.stopPropagation()}
      fullWidth
      fullScreen={isFullScreen}
    >
      <DialogTitle
        variant="h5"
        display="flex"
        justifyContent="center"
        position="relative"
        width="100%"
      >
        <Typography variant="h5">Your Tickets</Typography>
        <IconButton
          sx={{ position: "absolute", right: "5px", top: "5px" }}
          onClick={handleClose}
        >
          <Close fontSize="medium" />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}
      >
        {renderTickets}
      </DialogContent>
    </Dialog>
  );
}
