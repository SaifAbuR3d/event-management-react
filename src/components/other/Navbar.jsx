import * as React from "react";
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
  },
}));

//---------------------------------------------------------

const pages = ["Find Events", "Create Event", "Help Center"];
const auth = ["Login", "Register"];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  // ----------------------------------------
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

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
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/*---------search--------------*/}
        <Box sx={{ flexGrow: 1 }}>
          <Search
            sx={{
              borderRadius: 5,
              bgcolor: "#f8f7fa",
              border: "3px solid #dbdae3",
            }}
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
        {/*---------pages-- "Find Events", "Create Event", "Help Center"------------*/}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            ml: 3,
          }}
        >
          {pages.map((page) => (
            <Button
              key={page}
              onClick={handleCloseNavMenu}
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
              {page}
            </Button>
          ))}
        </Box>
        {/*---------auth-- "Login", "Register"------------*/}
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
      </Toolbar>
    </AppBar>
  );
}
