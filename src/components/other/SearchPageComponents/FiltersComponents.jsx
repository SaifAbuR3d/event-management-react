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
  setEventFilter,
  setMangedEvent,
  setPriceFilter,
  priceFilter,
}) {
  const eventFilters = [
    { name: "Previous Events", value: "PreviousEvents" },
    { name: "Upcoming Events", value: "UpcomingEvents" },
    { name: "Running Events", value: "RunningEvents" },
  ];
  const handleCategoryIdChange = (event) => {
    setCategoryId(event.target.value);
  };

  const handleEventFilterChange = (event) => {
    setEventFilter(event.target.value);
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
        rowGap: "80px",
        justifyContent: { xs: "space-around", md: "flex-start" },
      }}
    >
      <Box>
        <Typography variant="body1" color="initial" fontWeight={"bold"}>
          Category
        </Typography>
        <FormControl>
          <RadioGroup name="categoryId" onChange={handleCategoryIdChange}>
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
        <FormControl>
          <RadioGroup name="eventFilter" onChange={handleEventFilterChange}>
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
        <FormControlLabel
          label="Manged Event Only"
          control={<Checkbox onChange={handleMangedEventrChange} />}
        />
      </Box>
      <Box>
        <Typography variant="body1" color="initial" fontWeight={"bold"}>
          Price
        </Typography>
        <Box sx={{ width: { xs: "90px", md: "70%" }, m: "auto" }}>
          <Slider
            value={priceFilter}
            onChange={handlePriceFilterChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            max={1000}
          />
        </Box>
      </Box>
    </Box>
  );
}
