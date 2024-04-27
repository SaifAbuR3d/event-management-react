import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useState } from "react";
import { Grid } from "@mui/material";
import {
  Email,
  Flag,
  FlagOutlined,
  NewReleases,
  NewReleasesOutlined,
} from "@mui/icons-material";
import { useDrawer } from "../../contexts/DrawerContext";

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
  // necessary for content to be below app bar
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
  const {drawerOpen, handleDrawerOpen, handleDrawerClose } = useDrawer();

  return (
    <Grid sx={{ display: "flex"}}>
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
          {["Reports", "Account verification"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
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
                  {index === 0 && <FlagOutlined />}
                  {index === 1 && <NewReleasesOutlined />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: drawerOpen ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Grid>
  );
}
