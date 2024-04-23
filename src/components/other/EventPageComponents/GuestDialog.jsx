import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

export default function GuestDialog({ open, handleClose }) {
  const navigate = useNavigate();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: { padding: 4 },
      }}
    >
      <DialogTitle id="alert-dialog-title" sx={{ m: "auto" }}>
        {"Please Log In First"}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ m: "auto" }}>
        <DialogContentText id="alert-dialog-description">
          Stay up on the latest from your favorite event organizers
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => navigate("/login")}
          autoFocus
          variant="contained"
          sx={{ m: "auto", p: 1, width: "30%" }}
        >
          Get Started
        </Button>
      </DialogActions>
    </Dialog>
  );
}
