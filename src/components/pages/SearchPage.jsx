import {
  Box,
  Grid,
  Pagination,
  Paper,
  Typography,
  useMediaQuery,
  Button,
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
import BreadcrumbHome from "../other/SearchPageComponents/BreadcrumbHome";
import { useSearchParams } from "react-router-dom";
import { Clear } from "@mui/icons-material";
export default function SearchPage() {
  const [eventFilter, setEventFilter] = useState(null);
  const [mangedEvent, setMangedEvent] = useState(false);
  const [locationFilter, setLocationFilter] = useState(null);
  const [priceFilter, setPriceFilter] = useState([0, 0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [categoryId, setCategoryId] = useState(
    searchParams.get("categoryId") ?? null
  );

  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const searchTermDebounce = useDebounce(searchTerm, 700);
  const priceFilterDebounce = useDebounce(priceFilter, 700);

  const { data: categories, isLoading: categoriesLoading } = useGetCategories();

  const {
    data: searchResult,
    isLoading,
    isFetching,
  } = useSearch({
    pageIndex,
    categoryId,
    searchTermDebounce,
    eventFilter,
    mangedEvent,
    priceFilterDebounce,
    locationFilter,
  });

  if (categoriesLoading || isLoading) {
    return <MainLoding isLoading={categoriesLoading || isLoading} />;
  }

  const handleChange = (event, value) => {
    setPageIndex(value);
  };

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

  const removeCategoryIdFromParams = () => {
    searchParams.delete("categoryId");
    setSearchParams(searchParams);
  };

  const handelClearChoices = () => {
    setCategoryId(null);
    removeCategoryIdFromParams();
    setEventFilter("");
    setLocationFilter("");
    setMangedEvent(false);
    setPriceFilter([0, 0]);
  };

  const filterProps = {
    categories,
    setCategoryId,
    categoryId,
    setEventFilter,
    eventFilter,
    setMangedEvent,
    mangedEvent,
    setPriceFilter,
    priceFilter,
    setLocationFilter,
    locationFilter,
    setSearchParams,
  };

  return (
    <Box sx={{ bgcolor: "#f7f7fa" }}>
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
              padding: "40px",
              gap: "8%",
              p: 2,
              alignItems: "center",
            }}
          >
            <Box>
              <BreadcrumbHome />
            </Box>

            <Box
              sx={{
                width: `${matches ? "49%" : "100%"}`,
                flexGrow: `${matches ? "0" : "1"}`,
              }}
            >
              <SearchBar setSearchTerm={setSearchTerm} />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={2}>
          <Paper
            sx={{
              p: 2,
              width: "100%",
              borderRadius: "5px",
              minHeight: "100%",
              bgcolor: "#f7f7fa",
            }}
            elevation={0}
          >
            <Typography variant="h5" color="initial" mb={2} fontWeight={"bold"}>
              Filters
            </Typography>
            <FiltersComponents {...filterProps} />
            <Box
              sx={{
                display: "flex",
                justifyContent: { md: "flex-start", xs: "center" },
                mt: 4,
              }}
            >
              <Button
                variant="contained"
                sx={{ flexBasis: { md: "80%", xs: "30%" } }}
                endIcon={<Clear />}
                onClick={handelClearChoices}
              >
                Clear
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 1,
              minHeight: "100%",
              display: "flex",
              flexDirection: "column",
              bgcolor: "#f7f7fa",
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
              {searchResult?.TotalCount == 0 && (
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
              {searchResult?.TotalCount > 5 && (
                <Pagination
                  count={
                    searchTerm == ""
                      ? 2
                      : Math.ceil(searchResult?.TotalCount / 5)
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
              mt: 2,
              pt: 1,
              borderRadius: "15px",
              bgcolor: "#f7f7fa",
            }}
          >
            <SearchMap handleEventLocations={handleEventLocations} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
