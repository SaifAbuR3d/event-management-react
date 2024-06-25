import { LoadingButton } from "@mui/lab";
import { Box, Button } from "@mui/material";
export default function FormNavigation(props) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleClick = () => {
    if (Object.keys(props?.errors).length > 0) {
      scrollToTop();
    }
  };

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
        onClick={handleClick}
        sx={{ flexBasis: "15%" }}
      >
        {props.isLastStep ? "Submit" : "Next"}
      </LoadingButton>
    </Box>
  );
}
