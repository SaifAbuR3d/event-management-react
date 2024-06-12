import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import {
  ChevronLeft,
  Dashboard,
  Groups,
  Logout,
  ManageAccounts,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { useGetProfileOwnerData } from "../../../API/organizerProfileApi";
import MainLoding from "../../looding/MainLoding";
import { useGetEventData } from "../../../API/eventPageApi";

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

export default function SideListWithContent({
  open,
  setOpen,
  setIsCurrentOrganizer,
  children,
}) {
  const navigate = useNavigate();

  const { user, removeCurrentUser } = useContext(UserContext);
  const logout = () => {
    removeCurrentUser();
    navigate("/");
  };

  const { eventId } = useParams();

  const { data: eventData, isLoading: isLoadingEventData } =
    useGetEventData(eventId);

  const {
    data: ProfileOwnerData,
    isLoading,
    isSuccess,
  } = useGetProfileOwnerData(eventData?.organizer?.userName);

  useEffect(() => {
    if (isSuccess) {
      setIsCurrentOrganizer(ProfileOwnerData?.userName == user?.userName);
    }
  }, [
    ProfileOwnerData?.userName,
    isSuccess,
    setIsCurrentOrganizer,
    user?.userName,
  ]);

  if (isLoading || isLoadingEventData) {
    return <MainLoding isLoading={isLoading || isLoadingEventData} />;
  }

  const links = [
    {
      title: "Main",
      icon: <Dashboard fontSize="medium" />,
      path: "",
    },
    {
      title: "Attedee List",
      icon: <Groups fontSize="medium" />,
      path: "attendee-list",
    },
  ];

  if (eventData?.isManaged) {
    links.push({
      title: "Registration Request",
      icon: <ManageAccounts fontSize="medium" />,
      path: "registration-request",
    });
  }
  return (
    <>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeft />
          </IconButton>
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
          <Tooltip title={ProfileOwnerData?.displayName}>
            <Avatar
              src={
                ProfileOwnerData?.imageUrl
                  ? `${import.meta.env.VITE_API_URL}/${
                      ProfileOwnerData?.imageUrl
                    }`
                  : ""
              }
              {...(open && { sx: { width: 100, height: 100 } })}
            />
          </Tooltip>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          {open && (
            <Typography variant="body1">
              {ProfileOwnerData?.displayName}
            </Typography>
          )}
          {open && (
            <Typography variant="body2">
              {ProfileOwnerData?.userName}
            </Typography>
          )}
          <Tooltip title="Logout" sx={{ mt: 1 }}>
            <IconButton onClick={logout}>
              <Logout />
            </IconButton>
          </Tooltip>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: "#f7fbff" }}>
        <DrawerHeader />
        {children}
      </Box>
    </>
  );
}
