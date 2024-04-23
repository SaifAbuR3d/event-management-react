import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import {
  ContentCopy,
  FacebookOutlined,
  LinkedIn,
  MailRounded,
  Twitter,
} from "@mui/icons-material";

const Icons = [FacebookOutlined, LinkedIn, Twitter, MailRounded];

export default function ShareCard({ open, handleClose, url, label }) {
  const [copied, setcopied] = useState(false);

  const handleCopy = (event) => {
    event.stopPropagation();
    navigator.clipboard.writeText(`${url}`);
    setcopied(true);
    setTimeout(() => {
      setcopied(false);
    }, 1500);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: { p: "0px 30px 50px" },
      }}
    >
      <DialogTitle id="alert-dialog-title" sx={{ m: "auto" }}>
        {"Share with friends"}
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
      <DialogContent sx={{ m: "auto", width: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {Icons?.map((Icon, index) => (
            <IconButton key={index} size="large">
              <Icon />
            </IconButton>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <FormControl sx={{ width: "70%", m: "auto" }} variant="outlined">
          <InputLabel htmlFor={`${label}-url`}>{label}</InputLabel>
          <OutlinedInput
            id={`${label}-url`}
            type="text"
            value={url}
            readOnly
            autoFocus
            endAdornment={
              <InputAdornment position="end">
                <Tooltip
                  title={
                    <Typography fontSize={"13px"}>
                      {copied ? "Copied" : "Copy"}
                    </Typography>
                  }
                  arrow
                >
                  <IconButton onClick={handleCopy} edge="end">
                    <ContentCopy />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            }
            label={label}
          />
        </FormControl>
      </DialogActions>
    </Dialog>
  );
}
