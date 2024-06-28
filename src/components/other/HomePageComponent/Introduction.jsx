import { Grid, Box, Typography } from "@mui/material";
import intro from "../../../assets/images/intro1.jpg";
import "swiper/css";
import "swiper/css/bundle";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

export default function Introduction() {
  const navigate = useNavigate();
  const { isOrganizer } = useContext(UserContext);

  const IsOrganizer = isOrganizer();

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    width: "100%",
    backgroundColor: "#ffffff",
    height: "100%",
    padding: "5px",
    display: "flex",
    alignItems: "center",
    borderRadius: "20px",
    cursor: "pointer",
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      cursor: "pointer",
      [theme.breakpoints.up("xs")]: {
        fontSize: "13px",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "20px",
      }
    },
  }));

  return (
    <Grid component="section" width="100%">
      <Box
        width="100%"
        maxHeight="620px"
        sx={{
          position: "relative",
          backgroundImage: `url(${intro})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          aspectRatio: "16/11",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            height: "70%",
            width: "45%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            position: "absolute",
            top: 4,
          }}
        >
          <Typography
            sx={{ textShadow: "5px 7px 9px rgba(0, 0, 0, 0.9)" }}
            color="white"
            fontSize={{ xs: "23px", sm: "35px", md: "55px", lg: "70px" }}
          >
            Event Connect
          </Typography>
          <Box
            height="30%"
            width="100%"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
          >
            {IsOrganizer ? (
              <Typography
                sx={{ textShadow: "20px 10px 9px rgba(0, 0, 0, 0.9)" }}
                color="white"
                fontSize={{ xs: "11px", sm: "15px", md: "19px", lg: "23px" }}
                align="center"
              >
                Start planning your dream event with Event Aura today!
              </Typography>
            ) : (
              <Typography
                sx={{ textShadow: "20px 10px 9px rgba(0, 0, 0, 0.9)" }}
                color="white"
                fontSize={{ xs: "11px", sm: "15px", md: "19px", lg: "23px" }}
                align="center"
              >
                Find Your Next Event!
              </Typography>
            )}

            <Search
              sx={{
                borderRadius: 5,
                bgcolor: "#f8f7fa",
                cursor: "pointer",
                height: "45%",
                border: "black solid 2px",
              }}
              onClick={() => navigate("/search")}
            >
              <SearchIconWrapper>
                <SearchIcon fontSize="medium" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>
        </Box>

        <svg
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            fill: "#ffffff",
            width: "100%",
            height: 50,
            transform: "rotate(180deg)",
            position: "absolute",
            bottom: -1,
          }}
        >
          <path d="M321.39 56.44c58-10.79 114.16-30.13 172-41.86 82.39-16.72 168.19-17.73 250.45-.39C823.78 31 906.67 72 985.66 92.83c70.05 18.48 146.53 26.09 214.34 3V0H0v27.35a600.21 600.21 0 00321.39 29.09z" />
        </svg>
      </Box>
    </Grid>
  );
}
