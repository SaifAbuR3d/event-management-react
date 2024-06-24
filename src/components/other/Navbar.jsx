import { useContext, useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext.jsx";
import { Avatar, ButtonBase, Stack } from "@mui/material";
import {
  Add,
  ConfirmationNumberOutlined,
  Dashboard,
  FavoriteBorder,
  VerifiedOutlined,
} from "@mui/icons-material";
import logo from "../../assets/images/logo/logo.svg";

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
    isVerified,
  } = useContext(UserContext);

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
      path: `attendee-profile/${user?.userName}?tabId=1`,
      icon: <FavoriteBorder fontSize="small" />,
    });
    pages.push({
      name: "Tickets",
      path: `attendee-profile/${user?.userName}?tabId=2`,
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

  if ((isAttendee() || isOrganizer()) && !isVerified()) {
    pages.push({
      name: "Verification",
      path: "/verification",
      icon: <VerifiedOutlined fontSize="small" />,
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

  const { pathname } = useLocation();

  return (
    <AppBar
      position={pathname != "/search" ? "sticky" : "static"}
      top="0"
      color={pathname != "/search" ? "navBarColor" : "navBarColorSecondary"}
    >
      <Toolbar sx={{ height: "0px" }}>
        {/*----------AdbIcon-------------*/}

        <ButtonBase
          sx={{
            display: { xs: "flex" },
            mr: 4,
            width: "100px",
            height: "100px",
            overflow: "hidden",
            position: "relative",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="logo"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              transform: "scale(1.5)",
            }}
          />
        </ButtonBase>

        {/*---------search--------------*/}
        <Box
          sx={{
            flexGrow: 1,
            // flexBasis: "75%",
            m: "auto",
          }}
        >
          {pathname != "/" && pathname != "/search" && (
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
          )}
        </Box>

        {/*---------pages (md)--------------*/}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            ml: 2,
            gap: "5px",
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
        {isAuthenticated() && (
          <Box sx={{ order: "2", flexGrow: 0, ml: 3 }}>
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
              <MenuItem
                key={"profile"}
                onClick={() => {
                  navigate(
                    isOrganizer()
                      ? `organizer-profile/${user?.userName}`
                      : `attendee-profile/${user?.userName}`
                  );
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              {pages.map((page, i) => (
                <MenuItem
                  key={i}
                  onClick={() => {
                    navigate(page.path);
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
              <MenuItem
                key={"logout"}
                onClick={() => {
                  logout();
                  navigate("/login");
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center">Log out</Typography>
              </MenuItem>
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
                  fontSize: "15px",
                  fontWeight: "bold",
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
