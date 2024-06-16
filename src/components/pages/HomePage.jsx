import { Grid, Box } from "@mui/material";
import intro from "../../assets/images/intro5.jpg";
import AttendeeFeed from "../other/HomePageComponent/AttendeeFeed";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import TopRatedEvent from "../other/HomePageComponent/TopRatedEvent";
import "swiper/css";
import "swiper/css/bundle";
import EventNearYou from "../other/HomePageComponent/EventNearYou";
import EventYouMayLike from "../other/HomePageComponent/EventYouMayLike";
import Categories from "../other/HomePageComponent/Categories";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

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
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
    cursor: "pointer",
  },
  fontSize: "25px",
  cursor: "pointer",
}));

export default function Home() {
  const { isAttendee } = useContext(UserContext);
  const navigate = useNavigate();
  const attendee = isAttendee();

  return (
    <Grid container>
      <Grid component="section" width="100%">
        <Box
          width="100%"
          maxHeight="550px"
          sx={{
            position: "relative",
            backgroundImage: `url(${intro})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            aspectRatio: "16/9",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: "70%",
              width: "40%",
              display: "flex",
              alignItems: "center",
              // border: "1px solid red",
            }}
          >
            <Search
              sx={{
                borderRadius: 5,
                bgcolor: "#f8f7fa",
                cursor: "pointer",
                height: "15%",
              }}
              onClick={() => navigate("/search")}
            >
              <SearchIconWrapper>
                <SearchIcon fontSize="large" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>
        </Box>
      </Grid>

      <Categories />

      <TopRatedEvent />

      <EventNearYou />

      {attendee && <EventYouMayLike />}

      {attendee && <AttendeeFeed />}
    </Grid>
  );
}
