import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  AccountCircleOutlined,
  BeenhereOutlined,
  Close,
  FileDownloadOutlined,
  GppBadOutlined,
} from "@mui/icons-material";
import { useSetApprove, useSetReject } from "../../../API/AdminApi";

export default function VerificationDialog({ open, handleClose, request }) {
  const [adminMessage, setAdminMessage] = useState("");

  const navigate = useNavigate();

  const { mutateAsync: Approve } = useSetApprove(handleClose);
  const { mutateAsync: Reject } = useSetReject(handleClose);

  const handleApprove = async () => {
    await Approve(request.id, adminMessage);
    setAdminMessage("");
  };

  const handleReject = async () => {
    await Reject(request.id, adminMessage);
    setAdminMessage("");
  };

  const customStyle = {
    width: "49%",
    height: "60px",
    border: "1px solid grey",
    color: "grey",
    "&:hover": {
      border: "1px solid grey",
      bgcolor: "rgba(158, 158, 158, 0.04)",
    },
  };

  const customTextField = {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "grey",
      },
      "&:hover fieldset": {
        borderColor: "grey",
      },
      "&.Mui-focused fieldset": {
        borderColor: "grey",
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "grey !important",
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
        <Typography fontSize="28px">Request Details</Typography>
        <IconButton
          sx={{ position: "absolute", right: "5px", top: "5px" }}
          onClick={handleClose}
        >
          <Close fontSize="medium" />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box pt={2} display="flex" justifyContent="space-between">
          <Button
            variant="outlined"
            sx={{ ...customStyle }}
            startIcon={<FileDownloadOutlined fontSize="large" />}
            onClick={() =>
              window.open(
                `${import.meta.env.VITE_API_URL}/${request.documentUrl}`,
                "_blank"
              )
            }
          >
            Document
          </Button>

          <Button
            variant="outlined"
            startIcon={<AccountCircleOutlined />}
            sx={{ ...customStyle }}
            onClick={() => navigate(`/profile/${request.userName}`)}
          >
            View Profile
          </Button>
        </Box>

        {request.status === "Pending" && (
          <>
            <Box mt={2}>
              <Typography variant="h6" pb={1}>
                Admin Message
              </Typography>

              <TextField
                multiline
                minRows={6}
                value={adminMessage}
                onChange={(e) => setAdminMessage(e.target.value)} // Update state
                sx={{ ...customTextField }}
              />
            </Box>

            <Box pt={2} display="flex" justifyContent="space-between">
              <Button
                variant="outlined"
                sx={{ width: "49%", height: "60px" }}
                startIcon={<BeenhereOutlined />}
                color="success"
                onClick={handleApprove}
              >
                Approve
              </Button>

              <Button
                variant="outlined"
                color="error"
                sx={{ width: "49%", height: "60px" }}
                startIcon={<GppBadOutlined />}
                onClick={handleReject}
              >
                Reject
              </Button>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
