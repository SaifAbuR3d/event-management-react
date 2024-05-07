import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";

export default function ReportDialog({ open, handleClose, report }) {
  const navigate = useNavigate();

  const cuctomStyle = {
    width: "32%",
    border: "1px solid grey",
    color: "grey",
    "&:hover": {
      border: "1px solid grey",
      bgcolor: "rgba(158, 158, 158, 0.04)",
    },
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"sm"}>
      <DialogTitle
        variant="h5"
        display="flex"
        justifyContent="center"
        position="relative"
        width="100%"
      >
        <Typography variant="h5">Report Details</Typography>
        <IconButton
          sx={{ position: "absolute", right: "5px", top: "5px" }}
          onClick={handleClose}
        >
          <Close fontSize="medium" />
        </IconButton>{" "}
      </DialogTitle>
      <DialogContent>
        <Box>
          <Typography variant="h6" pb={1}>
            Content
          </Typography>
          <Paper
            elevation={0}
            sx={{
              minHeight: "150px",
              border: "1px solid grey",
              p: "15px",
            }}
          >
            {report.content}
          </Paper>
        </Box>
        <Box pt={2} display="flex" justifyContent="space-between">
          <Button
            variant="outlined"
            sx={{ ...cuctomStyle }}
            onClick={() => navigate(`/event/${report.eventId}`)}
          >
            View Event
          </Button>

          <Button
            variant="outlined"
            sx={{ ...cuctomStyle }}
            onClick={() => navigate(`/profile/${report.organizerUserName}`)}
          >
            View Organizer
          </Button>

          <Button
            variant="outlined"
            sx={{ ...cuctomStyle }}
            onClick={() => navigate(`/profile/${report.attendeeUserName}`)}
          >
            View Attendee
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
