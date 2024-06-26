import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SideListWithContent from "../other/eventDashboardComponents/SideListWithContent";
import { Home } from "@mui/icons-material";
import { Button } from "@mui/material";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function EventDashboardLayout() {
  const [open, setOpen] = useState(false);
  const [isCurrentOrganizer, setIsCurrentOrganizer] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isCurrentOrganizer) {
      navigate("/");
    }
  }, [isCurrentOrganizer, navigate]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "#f5f5f5", minHeight: "99.5vh" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ bgcolor: "#283593" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton sx={{ mr: 1 }} onClick={() => navigate("/")}>
            <Home />
          </IconButton>
          <Typography variant="h6" noWrap component="div" flexGrow={1}>
            Event Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <SideListWithContent
        open={open}
        setOpen={setOpen}
        setIsCurrentOrganizer={setIsCurrentOrganizer}
      >
        <Outlet />
      </SideListWithContent>
    </Box>
  );
}
