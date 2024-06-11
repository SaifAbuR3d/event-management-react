import {
  Box,
  Grid,
  Pagination,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import SearchBar from "../other/SearchPageComponents/SearchBar";
import SearchMap from "../other/SearchPageComponents/SearchMap";
import SerchEventCard from "../other/SearchPageComponents/SerchEventCard";
import { useTheme } from "@emotion/react";
import { useGetCategories } from "../../API/createEventApi";
import MainLoding from "../looding/MainLoding";
import FiltersComponents from "../other/SearchPageComponents/FiltersComponents";
import { useSearch } from "../../API/eventPageApi";
import SkeletonLoadingCard from "../other/SearchPageComponents/SkeletonLoadingCard";
import { useDebounce } from "@uidotdev/usehooks";

export default function SearchPage() {
  const [categoryId, setCategoryId] = useState(null);
  const [eventFilter, setEventFilter] = useState(null);
  const [mangedEvent, setMangedEvent] = useState(false);
  const [priceFilter, setPriceFilter] = useState([0, 0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageIndex, setPageIndex] = useState(1);

  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const searchTermDebounce = useDebounce(searchTerm, 700);
  const priceFilterDebounce = useDebounce(priceFilter, 700);

  const { data: categories, isLoading: categoriesLoading } = useGetCategories();

  const {
    data: searchResult,
    isLoading,
    isError,
    error,
    isFetching,
    isPlaceholderData,
  } = useSearch({
    pageIndex,
    categoryId,
    searchTermDebounce,
    eventFilter,
    mangedEvent,
    priceFilterDebounce,
  });

  if (categoriesLoading || isLoading) {
    return <MainLoding isLoading={categoriesLoading || isLoading} />;
  }

  const handleChange = (event, value) => {
    setPageIndex(value);
  };

  //   console.log(categoryId);
  // console.log(eventFilter);
  //   console.log(mangedEvent);
  // console.log(priceFilter);

  console.log(searchResult);

  const handleEventLocations = () => {
    return searchResult.data.reduce((acc, item) => {
      if (item.lat) {
        acc.push({
          lat: item.lat,
          lon: item.lon,
          name: item.name,
          id: item.id,
        });
      }
      return acc;
    }, []);
  };

  return (
    <Box minHeight={"100vh"}>
      <Grid
        container
        pl={1}
        pt={1}
        columnSpacing={matches ? 3 : 1}
        rowSpacing={1}
      >
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "40px",
              gap: "25px",
              p: 2,
            }}
          >
            <Box
              sx={{
                width: `${matches ? "50%" : "90%"}`,
                ml: `${matches ? "16%" : "auto"}`,
                mr: `${matches ? "0" : "auto"}`,
              }}
            >
              <SearchBar setSearchTerm={setSearchTerm} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={2}>
          <Paper
            sx={{ p: 2, width: "100%", borderRadius: "5px", minHeight: "100%" }}
          >
            <Typography variant="h5" color="initial" mb={2} fontWeight={"bold"}>
              Filters
            </Typography>
            <FiltersComponents
              categories={categories}
              setCategoryId={setCategoryId}
              setEventFilter={setEventFilter}
              setMangedEvent={setMangedEvent}
              setPriceFilter={setPriceFilter}
              priceFilter={priceFilter}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 1,
              minHeight: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box>
              {isFetching
                ? Array.from({ length: 5 }, (_, index) => (
                    <SkeletonLoadingCard key={index} />
                  ))
                : searchResult?.data?.map((event) => (
                    <SerchEventCard key={event.id} eventData={event} />
                  ))}
              {searchResult.TotalCount == 0 && (
                <Typography variant="h6" color="initial">
                  No Result Found
                </Typography>
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {(!isFetching || searchResult.TotalCount > 5) && (
                <Pagination
                  count={
                    !searchTerm ? 0 : Math.floor(searchResult.TotalCount / 5)
                  }
                  page={pageIndex}
                  onChange={handleChange}
                  variant="outlined"
                  color="primary"
                  disabled={isFetching || searchResult.TotalCount < 6}
                />
              )}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={0} md={4}>
          <Box
            sx={{
              height: "100%",
              display: { xs: "none", md: "block" },
            }}
          >
            <SearchMap handleEventLocations={handleEventLocations} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
