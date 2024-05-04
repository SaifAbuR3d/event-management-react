import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Grid, Collapse } from "@mui/material";
import {
  FlagOutlined,
  NewReleasesOutlined,
  ExpandLess,
  ExpandMore,
  PersonOutlined,
  GroupOutlined,
} from "@mui/icons-material";
import { useDrawer } from "../../contexts/DrawerContext";
import { useState } from "react";

const drawerWidth = 260;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function AdminDrawer() {
  const { drawerOpen, handleDrawerOpen, handleDrawerClose } = useDrawer();
  const [openVerification, setOpenVerification] = useState(false);

  const handleVerificationClick = () => {
    setOpenVerification(!openVerification);
  };

  return (
    <Grid sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer variant="permanent" open={drawerOpen}>
        <DrawerHeader sx={{ display: "flex", justifyContent: "center", p: 0 }}>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={drawerOpen ? handleDrawerClose : handleDrawerOpen}
              sx={{
                minHeight: 48,
                justifyContent: drawerOpen ? "initial" : "center",
                px: 1.8,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: drawerOpen ? 2 : "auto",
                  justifyContent: "center",
                }}
              >
                <MenuIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText
                primary={"Admin Dashboard"}
                sx={{ opacity: drawerOpen ? 1 : 0 }}
                primaryTypographyProps={{ fontSize: "1.3rem", fontWeight: 500 }}
              />
            </ListItemButton>
          </ListItem>
        </DrawerHeader>
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: drawerOpen ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: drawerOpen ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <FlagOutlined />
              </ListItemIcon>
              <ListItemText
                primary={"Reports"}
                sx={{ opacity: drawerOpen ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: drawerOpen ? "initial" : "center",
                px: 2.5,
              }}
              onClick={handleVerificationClick}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: drawerOpen ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <NewReleasesOutlined />
              </ListItemIcon>

              <ListItemText
                primary={"Account verification"}
                sx={{ opacity: drawerOpen ? 1 : 0 }}
              />
            </ListItemButton>

            <Collapse in={openVerification} timeout="auto" unmountOnExit>
              <List
                component="div"
                disablePadding
                sx={{ opacity: drawerOpen ? 1 : 0 }}
              >
                <ListItemButton sx={{ pl: 8 }}>
                  <ListItemIcon>
                    <PersonOutlined />
                  </ListItemIcon>
                  <ListItemText primary="Attendee" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 8 }}>
                  <ListItemIcon>
                    <GroupOutlined />
                  </ListItemIcon>
                  <ListItemText primary="Organizer" />
                </ListItemButton>
              </List>
            </Collapse>
          </ListItem>
        </List>
      </Drawer>
    </Grid>
  );
}
