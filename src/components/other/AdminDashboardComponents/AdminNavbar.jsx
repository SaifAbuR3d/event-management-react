import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useContext } from "react";
import { useTheme } from "@emotion/react";
import { UserContext } from "../../../contexts/UserContext";

const Search = styled("div")(({ theme }) => ({
  border: "black solid 1px",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
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
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function AdminNavbar() {
  const { user } = useContext(UserContext);

  const theme = useTheme();
  return (
    <Box
      display="flex"
      justifyContent="center"
      bgcolor="#f7fbff"
      color="black"
      sx={{
        width: { xs: `calc(100% - 55px)` },
        ml: { xs: `55px` },
      }}
    >
      <Box
        width={1200}
        ml={5}
        mr={5}
        elevation={0}
        color="black"
        bgcolor="#f7fbff"
        position="sticky"
      >
        <Toolbar
          sx={{
            [theme.breakpoints.up("sm")]: {
              paddingLeft: "0px",
              paddingRight: "0px",
            },
          }}
        >
          <Typography
            variant="h5"
            fontWeight={500}
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Hello {user?.userName}
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Toolbar>
      </Box>
    </Box>
  );
}
