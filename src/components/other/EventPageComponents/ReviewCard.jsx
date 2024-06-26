import { Report } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Paper,
  Rating,
  Typography,
  IconButton,
} from "@mui/material";
import { useContext, useState } from "react";
import ReportDialog from "./ReportDialog";
import { UserContext } from "../../../contexts/UserContext";

export default function ReviewCard({ data }) {
  const { id, attendeeName, comment, rating, attendeeImageUrl } = data;
  const [openReportDialog, setOpenReportDialog] = useState(false);
  const { isAttendee } = useContext(UserContext);

  const handleOpenReportDialog = () => setOpenReportDialog(true);
  const handleCloseReportDialog = () => setOpenReportDialog(false);

  const image = attendeeImageUrl
    ? `${import.meta.env.VITE_API_URL}/${attendeeImageUrl}`
    : "/static/images/avatar/1.jpg";

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
          <Avatar src={image} sx={{ mr: 2 }} />
          <Typography
            variant="body1"
            color="initial"
            sx={{ fontWeight: "bold", flexGrow: 1 }}
          >
            {attendeeName}
          </Typography>
          {isAttendee() && (
            <Box className="reportButton" sx={{ visibility: "hidden" }}>
              <IconButton onClick={handleOpenReportDialog}>
                <Report />
              </IconButton>
            </Box>
          )}
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