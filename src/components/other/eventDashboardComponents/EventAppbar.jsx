import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import { Notifications } from "@mui/icons-material";

export default function EventAppbar({ open, eventData }) {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#f8f7fa",
        width: open ? `calc(100% - 240px)` : `calc(100% - 65px)`,
        ml: open ? "240px" : "65px",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            display: { xs: "none", sm: "block", color: "black" },
          }}
        >
          {eventData?.name}
        </Typography>
        <IconButton>
          <Notifications />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
