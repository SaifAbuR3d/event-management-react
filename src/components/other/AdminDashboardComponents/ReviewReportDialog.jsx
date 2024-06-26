import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Close, Height } from "@mui/icons-material";
import { useDeleteReview, useUserRole } from "../../../API/AdminApi";
import { useSnackBar } from "../../../contexts/SnackBarContext";
import { useEffect } from "react";
import { useState } from "react";

export default function ReportDialog({ open, handleClose, report }) {
  const navigate = useNavigate();
  const [link, setLink] = useState("");

  const { mutateAsync, isPending } = useDeleteReview();

  const { data, error, isLoading } = useUserRole(report?.reportWriterUserName);

  const { showSnackBar } = useSnackBar();

  const cuctomStyle = {
    width: "170px",
    border: "1px solid grey",
    color: "grey",
    "&:hover": {
      border: "1px solid grey",
      bgcolor: "rgba(158, 158, 158, 0.04)",
    },
  };

  const rejected = {
    width: "170px",
    height: "45px",
    border: "red solid 1.5px",
    bgcolor: "#ffebee",
    color: "red",
    boxShadow: "none",
    "&:hover": {
      bgcolor: "#ffebee",
      boxShadow: "none",
      border: "red solid 1.5px",
    },
  };

  useEffect(() => {
    if (!isLoading) {
      if (error && error.message === "Not Found") {
        setLink(`/attendee-profile/${report?.reportWriterUserName}`);
      } else if (data) {
        setLink(`/organizer-profile/${report?.reportWriterUserName}`);
      }
    }
  }, [data, error, isLoading, report]);

  const { eventId, reviewId } = report || {};

  const handleDeleteReview = async () => {
    await mutateAsync({eventId, reviewId}).then(() => {
      showSnackBar("Review Deleted successfully", "success", "filled");
    });
    handleClose();
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
        <Typography fontSize="28px">Report Details</Typography>
        <IconButton
          sx={{ position: "absolute", right: "5px", top: "5px" }}
          onClick={handleClose}
        >
          <Close fontSize="medium" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
            mt={2}
          >
            <Typography variant="h6" pb={1}>
              Report Content
            </Typography>

            <Button
              variant="outlined"
              sx={{ ...cuctomStyle }}
              onClick={() => navigate(link)}
            >
              Reporter Profile
            </Button>
          </Box>

          <Paper
            elevation={0}
            sx={{
              minHeight: "130px",
              border: "1px solid grey",
              p: "15px",
            }}
          >
            {report.reportContent}
          </Paper>
        </Box>

        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
            mt={4}
          >
            <Typography variant="h6" pb={1}>
              Review Content
            </Typography>

            <Button
              variant="outlined"
              sx={{ ...cuctomStyle }}
              onClick={() =>
                navigate(`/attendee-profile/${report.reviewWriterUserName}`)
              }
            >
              Attendee Profile
            </Button>
          </Box>

          <Paper
            elevation={0}
            sx={{
              minHeight: "130px",
              border: "1px solid grey",
              p: "15px",
            }}
          >
            {report.reviewContent}
          </Paper>
        </Box>

        <Box mt={4}>
          <Typography variant="h6" pb={3}>
            Do you want to delete this review?
          </Typography>
          <Box display="flex" justifyContent="center">
            <Button
              disabled={isPending}
              variant="outlined"
              sx={{ ...rejected }}
              onClick={handleDeleteReview}
            >
              Delete Review
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
