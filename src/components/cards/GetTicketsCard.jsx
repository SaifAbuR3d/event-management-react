import { Paper, Typography } from "@mui/material";
import Button from "@mui/material/Button";

export default function GetTicketsCard() {
  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        height: "110px",
        mt: 3,
        position: "sticky",
        top: "60vh",
      }}
    >
      <Typography variant="body1" color="initial" sx={{ fontWeight: "700" }}>
        From 10$ - 20$
      </Typography>
      <Button variant="contained" color="primary" sx={{ width: "90%" }}>
        Buy Ticket
      </Button>
    </Paper>
  );
}
