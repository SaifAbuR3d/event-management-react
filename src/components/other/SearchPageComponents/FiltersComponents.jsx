import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Slider from "@mui/material/Slider";

export default function FiltersComponents({
  categories,
  setCategoryId,
  categoryId,
  setEventFilter,
  eventFilter,
  setLocationFilter,
  locationFilter,
  setMangedEvent,
  mangedEvent,
  setPriceFilter,
  priceFilter,
}) {
  const eventFilters = [
    { name: "Previous Events", value: "PreviousEvents" },
    { name: "Upcoming Events", value: "UpcomingEvents" },
    { name: "Running Events", value: "RunningEvents" },
  ];

  const locationFilters = [
    { name: "Online", value: "OnlyOnlineEvents" },
    { name: "Offline", value: "OnlyOfflineEvents" },
  ];
  const handleCategoryIdChange = (event) => {
    setCategoryId(event.target.value);
  };

  const handleEventFilterChange = (event) => {
    setEventFilter(event.target.value);
  };

  const handleLocationFiltersChange = (event) => {
    setLocationFilter(event.target.value);
  };

  const handleMangedEventrChange = (event) => {
    setMangedEvent(event.target.checked);
  };

  const handlePriceFilterChange = (event, newValue) => {
    setPriceFilter(newValue);
  };

  function valuetext(value) {
    return `${value}`;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "row", md: "column" },
        rowGap: "60px",
        justifyContent: { xs: "space-around", md: "flex-start" },
      }}
    >
      <Box>
        <Typography variant="body1" color="initial" fontWeight={"bold"}>
          Category
        </Typography>
        <FormControl>
          <RadioGroup
            name="categoryId"
            onChange={handleCategoryIdChange}
            value={categoryId}
          >
            {categories.map((category) => (
              <FormControlLabel
                value={category.id}
                control={<Radio />}
                label={category.name}
                key={category.id}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="body1" color="initial" fontWeight={"bold"}>
          Event
        </Typography>
        <FormControl sx={{ mb: 2 }}>
          <RadioGroup
            name="eventFilter"
            onChange={handleEventFilterChange}
            value={eventFilter}
          >
            {eventFilters.map((filter, index) => (
              <FormControlLabel
                value={filter.value}
                control={<Radio />}
                label={filter.name}
                key={index}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <FormControl sx={{ mb: 2 }}>
          <RadioGroup
            name="LocationFilter"
            onChange={handleLocationFiltersChange}
            value={locationFilter}
          >
            {locationFilters.map((filter, index) => (
              <FormControlLabel
                value={filter.value}
                control={<Radio />}
                label={filter.name}
                key={index}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <FormControlLabel
          label="Manged Event"
          control={
            <Checkbox
              onChange={handleMangedEventrChange}
              checked={mangedEvent}
            />
          }
        />
      </Box>
      <Box>
        <Typography variant="body1" color="initial" fontWeight={"bold"}>
          Price
        </Typography>
        <Box sx={{ width: { xs: "100px", md: "85%" } }}>
          <Slider
            value={priceFilter || [0, 0]}
            onChange={handlePriceFilterChange}
            getAriaValueText={valuetext}
            max={2000}
            step={50}
            // marks
            valueLabelDisplay={"auto"}
            sx={{
              "& .MuiSlider-thumb": {
                height: 17,
                width: 17,
                backgroundColor: "#fff",
                border: "2px solid currentColor",
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
