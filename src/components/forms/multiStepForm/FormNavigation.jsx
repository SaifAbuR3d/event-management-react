import { Box, Button } from "@mui/material";
import PropTypes from "prop-types";
export default function FormNavigation(props) {
  return (
    <Box
      sx={{
        display: "flex",
        mt: "15px",
        width: "100%",
        justifyContent: "center",
        gap: "60%",
      }}
    >
      {props.hasPrevious && (
        <Button
          variant="outlined"
          type="button"
          onClick={props.onBackClick}
          sx={{ flexBasis: "15%" }}
        >
          Back
        </Button>
      )}
      <Button variant="contained" type="submit" sx={{ flexBasis: "15%" }}>
        {props.isLastStep ? "Submit" : "Next"}
      </Button>
    </Box>
  );
}

// FormNavigation.propTypes = {
//   hasPrevious: PropTypes.bool.isRequired,
//   onBackClick: PropTypes.func.isRequired,
//   isLastStep: PropTypes.bool.isRequired,
// };
