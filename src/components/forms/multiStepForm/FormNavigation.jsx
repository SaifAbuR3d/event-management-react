import { LoadingButton } from "@mui/lab";
import { Box, Button } from "@mui/material";
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
      <LoadingButton
        loading={props.isPending}
        variant="contained"
        type="submit"
        sx={{ flexBasis: "15%" }}
      >
        {props.isLastStep ? "Submit" : "Next"}
      </LoadingButton>
    </Box>
  );
}
