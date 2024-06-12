import { Report } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Paper,
  Rating,
  Typography,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import ReportDialog from "./ReportDialog";

export default function ReviewCard({ data }) {
  const { id, attendeeName, comment, rating } = data;
  const [openReportDialog, setOpenReportDialog] = useState(false);

  const handleOpenReportDialog = () => setOpenReportDialog(true);
  const handleCloseReportDialog = () => setOpenReportDialog(false);

  return (
    <>
      <Paper
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          p: 2,
          gap: 1,
          "&:hover": {
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            "& .reportButton": {
              visibility: "visible",
            },
          },
          borderRadius: "17px",
        }}
        elevation={0}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ mr: 2 }}>H</Avatar>
          <Typography
            variant="body1"
            color="initial"
            sx={{ fontWeight: "bold", flexGrow: 1 }}
          >
            {attendeeName}
          </Typography>
          <Box className="reportButton" sx={{ visibility: "hidden" }}>
            <IconButton onClick={handleOpenReportDialog}>
              <Report />
            </IconButton>
          </Box>
        </Box>
        <Rating name="read-only" value={rating} readOnly />
        <Typography variant="body1" color="initial">
          {comment}
        </Typography>
      </Paper>
      <ReportDialog
        open={openReportDialog}
        handleClose={handleCloseReportDialog}
        reviewId={id}
      />
    </>
  );
}
