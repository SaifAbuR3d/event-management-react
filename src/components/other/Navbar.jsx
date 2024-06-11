import { useContext, useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext.jsx";
import Tooltip from "@mui/material/Tooltip";
import { Avatar } from "@mui/material";

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
    // vertical padding + font size from searchIcon
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

//---------------------------------------------------------

const auth = ["Login", "Register"];

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const { isAuthenticated, removeCurrentUser, isOrganizer, isAttendee, user } =
    useContext(UserContext);

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

  const pages = [{ name: "Find Events", path: "/#" }];

  if (isOrganizer()) {
    pages.push({ name: "Create Event", path: "/events/create" });
  }

  if (isAttendee()) {
    pages.push({ name: "Likes", path: `organizer-profile/${user?.userName}` });
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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

        {/*---------Menu just dispaly on {xs} Breakpoint ------------*/}
        <Box sx={{ order: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {pages.map((page, i) => (
              <MenuItem key={i} onClick={() => navigate(page.path)}>
                <Typography textAlign="center">{page.name}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/*---------search--------------*/}
        <Box
          sx={{
            flexGrow: 1,
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

        {/*---------pages-- "Find Events", "Create Event"------------*/}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            ml: 3,
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
              }}
            >
              {page.name}
            </Button>
          ))}
        </Box>
        {(isOrganizer() || isAttendee()) && (
          <Box sx={{ flexGrow: 0, ml: 2 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              {settings.map((setting, index) => (
                <MenuItem key={index} onClick={setting.OnClick}>
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}
        {/*---------settings-------------*/}

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
