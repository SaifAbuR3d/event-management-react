import { Paper, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";

export default function GetOrganizerDashboard() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  return (
    <Paper
      elevation={1}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        height: "140px",
        mt: 3,
        position: "sticky",
        top: "14vh",
      }}
    >
      <Typography
        variant="body1"
        color="initial"
        sx={{ fontWeight: "700", fontSize: "20px" }}
      >
        Manage The Event
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ width: "90%", textTransform: "capitalize" }}
        onClick={() => navigate(`/event-dashboard/${eventId}`)}
      >
        Organizer Dashboard
      </Button>
    </Paper>
  );
}
