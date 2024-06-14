import { useContext, useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext.jsx";
import { Avatar, Stack } from "@mui/material";
import {
  Add,
  ConfirmationNumberOutlined,
  Dashboard,
  FavoriteBorder,
} from "@mui/icons-material";

//--------------------- Search styles --------------------

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  // "&:hover": {
  //   backgroundColor: alpha(theme.palette.common.white, 0.25),
  // },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",

  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "90%",
      "&:focus": {
        width: "90%",
      },
    },
    cursor: "pointer",
  },
}));

const auth = ["Login", "Register"];

export default function Navbar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const {
    isAuthenticated,
    removeCurrentUser,
    isOrganizer,
    isAttendee,
    isAdmin,
    user,
  } = useContext(UserContext);

  const settings = [
    {
      name: "Profile",
      OnClick: () => {
        navigate(
          isOrganizer()
            ? `organizer-profile/${user?.userName}`
            : `attendee-profile/${user?.userName}`
        );
        handleCloseUserMenu();
      },
    },
    {
      name: "Log out",
      OnClick: () => {
        logout();
        navigate("/login");
        handleCloseUserMenu();
      },
    },
  ];

  if (isAdmin()) {
    settings.shift();
  }

  const pages = [];

  if (isOrganizer()) {
    pages.push({
      name: "Create Event",
      path: "/events/create",
      icon: <Add fontSize="small" />,
    });
  }

  if (isAttendee()) {
    pages.push({
      name: "Likes",
      path: `attendee-profile/${user?.userName}`,
      icon: <FavoriteBorder fontSize="small" />,
    });
    pages.push({
      name: "Tickets",
      path: `attendee-profile/${user?.userName}`,
      icon: <ConfirmationNumberOutlined fontSize="small" />,
    });
  }

  if (isAdmin()) {
    pages.push({
      name: "Dashboard",
      path: "/admin-dashboard",
      icon: <Dashboard fontSize="small" />,
    });
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    removeCurrentUser();
  };

  return (
    <AppBar position="sticky" top="0" color="navBarColor">
      <Toolbar sx={{ height: "0px" }}>
        {/*----------AdbIcon-------------*/}
        <AdbIcon sx={{ display: { xs: "flex" }, mr: 1 }} />
        {/*----------website name-------------*/}
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="#"
          sx={{
            mr: 3,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "#f05537",
            textDecoration: "none",
          }}
        >
          Eventbrite
        </Typography>

        {/*---------search--------------*/}
        <Box
          sx={{
            flexGrow: 0,
            flexBasis: "70%",
            m: "auto",
          }}
        >
          <Search
            sx={{
              borderRadius: 5,
              bgcolor: "#f8f7fa",
              border: "3px solid #dbdae3",
              cursor: "pointer",
            }}
            onClick={() => navigate("/search")}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Box>

        {/*---------pages (md)--------------*/}
        <Box
          sx={{
            display: { xs: "none", md: "flex", gap: "10px" },
            // ml: 3
            ml: "auto",
            mr: "15px",
          }}
        >
          {pages.map((page) => (
            <Button
              key={page.name}
              onClick={() => navigate(page.path)}
              sx={{
                my: 2,
                color: "#39364f",
                display: "block",
                borderRadius: 5,
                p: 1,
                fontSize: "14px",
                fontWeight: "500",
                textTransform: "capitalize",
                textWrap: "nowrap",
                "&:hover": { bgcolor: "inherit", color: "#000000" },
              }}
            >
              <Stack
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {page.icon}
                <Typography variant="caption" fontWeight={"bold"}>
                  {page.name}
                </Typography>
              </Stack>
            </Button>
          ))}
        </Box>
        {(isOrganizer() || isAttendee() || isAdmin()) && (
          <Box sx={{ order: "2", flexGrow: 0, ml: 2 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt=""
                src={
                  user?.userImage
                    ? `${import.meta.env.VITE_API_URL}/${user?.userImage}`
                    : null
                }
              />
            </IconButton>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {pages.map((page, i) => (
                <MenuItem key={i} onClick={() => navigate(page.path)}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
              {settings.map((setting, index) => (
                <MenuItem key={index} onClick={setting.OnClick}>
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}

        {/*---------auth-- "Login", "Register"------------*/}
        {!isAuthenticated() && (
          <Box sx={{ display: { xs: "flex" } }}>
            {auth.map((authItem) => (
              <Button
                key={authItem}
                onClick={() =>
                  authItem == "Register"
                    ? navigate("/register")
                    : navigate("/login")
                }
                sx={{
                  my: 2,
                  color: "#39364f",
                  display: "block",
                  borderRadius: 5,
                  p: 1,
                  fontSize: "14px",
                  fontWeight: "500",
                  textTransform: "capitalize",
                  textWrap: "nowrap",
                }}
              >
                {authItem}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
