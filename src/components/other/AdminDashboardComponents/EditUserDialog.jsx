import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Avatar, Box, IconButton, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";

export default function EditUserDialog({ open, handleClose, user }) {
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

  const fields = [
    { key: "Display name", value: "Mr. Sameeh Co." },
    { key: "Email", value: "sameehhussein02@gmail.com" },
    { key: "First name", value: "Sameeh" },
    { key: "Last name", value: "Hussein" },
    { key: "Gender", value: "Male" },
    { key: "Birth date", value: "10 Jan 2024" },
  ];

  const renderFields = fields.map((it, index) => {
    return (
      <Box
        key={index}
        component={Paper}
        height="70px"
        width="100%"
        border="black solid 1px"
        display="flex"
        variant="outlined"
        alignItems="center"
      >
        <Box
          height="100%"
          width="110px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRight="black solid 1px"
          mr={1}
          bgcolor="#f5fffa"
          borderRadius="5%"
        >
          {it.key}
        </Box>
        {it.value}
      </Box>
    );
  });

  function stringAvatar(name) {
    return {
      sx: {
        height: "120px",
        width: "120px",
        backgroundImage: "linear-gradient(to bottom, #c5cae9 , #f5fffa)",
        color: "black",
        border: "black solid 1px",
        fontSize:40
      },
      children: `${name.split(" ")[0][0]}`,
    };
  }

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
        {user.imageUrl ? (
          <Avatar
            sx={{ height: "120px", width: "120px" }}
            src={`${import.meta.env.VITE_API_URL}/${user.imageUrl}`}
          />
        ) : (
          <Avatar {...stringAvatar("Sameeh Hussein")} />
        )}
        {renderFields}
      </DialogContent>
      <DialogActions sx={{ pr: 3 }}>
        <Button variant="outlined">Reset</Button>
        <Button variant="outlined" type="submit">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
