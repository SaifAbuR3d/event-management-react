import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";

export default function DeleteUserDialog({ open, handleClose }) {
  const rejected = {
    width: "160px",
    border: "red solid 1.5px",
    bgcolor: "#ffebee",
    color: "red",
    boxShadow: "none",
    "&:hover": {
      bgcolor: "#ffebee",
      boxShadow: "none",
    },
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"xs"}>
      <DialogTitle
        variant="h5"
        display="flex"
        justifyContent="center"
        position="relative"
        width="100%"
      >
        <IconButton
          sx={{ position: "absolute", right: "5px", top: "5px" }}
          onClick={handleClose}
        >
          <Close fontSize="medium" />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          mt: 1,
        }}
      >
        <Typography variant="h6" align="center">
          Are you sure you want to ban this user?
        </Typography>

        <Button sx={{ ...rejected }}>ban Anyway</Button>
      </DialogContent>
    </Dialog>
  );
}
