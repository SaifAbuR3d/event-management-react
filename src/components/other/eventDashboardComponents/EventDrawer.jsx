import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GroupsIcon from "@mui/icons-material/Groups";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Tooltip } from "@mui/material";
import { Dashboard, Logout } from "@mui/icons-material";
import { UserContext } from "../../../contexts/UserContext";
import { useGetProfileOwnerData } from "../../../API/organizerProfileApi";
import MainLoding from "../../looding/MainLoding";

const drawerWidth = 240;

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

export default function EventDrawer({ open, setOpen, eventData }) {
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { user, removeCurrentUser } = React.useContext(UserContext);
  const logout = () => {
    removeCurrentUser();
    navigate("/");
  };

  const { data, isLoading } = useGetProfileOwnerData(user?.userName);

  if (isLoading) {
    return <MainLoding isLoading={isLoading} />;
  }

  const links = [
    {
      title: "Main",
      icon: <Dashboard />,
      path: "",
    },
    {
      title: "Attedee List",
      icon: <GroupsIcon />,
      path: "AttendeeList",
    },
  ];

  if (eventData?.isManaged) {
    links.push({
      title: "Registration Request",
      icon: <ManageAccountsIcon />,
      path: "RegistrationRequest",
    });
  }

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
          <MenuIcon sx={{ fontSize: 35 }} />
        </IconButton>
        {open && (
          <Typography variant="h6" color="initial">
            Event Dashboard
          </Typography>
        )}
      </DrawerHeader>
      <Divider />
      <List>
        {links.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ mx: "auto", mt: 3, mb: 1 }}>
        <Tooltip title={data?.displayName}>
          <Avatar
            src={
              data?.imageUrl
                ? `${import.meta.env.VITE_API_URL}/${data?.imageUrl}`
                : ""
            }
            {...(open && { sx: { width: 100, height: 100 } })}
          />
        </Tooltip>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        {open && <Typography variant="body1">{data?.displayName}</Typography>}
        {open && <Typography variant="body2">{data?.userName}</Typography>}
        <Tooltip title="Logout" sx={{ mt: 1 }}>
          <IconButton onClick={logout}>
            <Logout />
          </IconButton>
        </Tooltip>
      </Box>
    </Drawer>
  );
}
