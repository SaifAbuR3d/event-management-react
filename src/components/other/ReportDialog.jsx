import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
      <DialogTitle variant="h5" m={"auto"}>
        Report Details
      </DialogTitle>
      <DialogContent>
        <Box>
          <Typography variant="h6" pb={1}>
            Content
          </Typography>
          <Paper
            elevation={0}
            sx={{
              border: "1px solid grey",
              p: "15px",
            }}
          >
            {report.content}
          </Paper>
        </Box>
        <Box
          pt={2}
          display="flex"
          justifyContent="space-between"
        >
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
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
