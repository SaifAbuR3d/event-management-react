import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Box, Typography, useMediaQuery, Button } from "@mui/material";

export default function ExistDialog({
  open,
  handleClose,
  handleClickBack,
  clearOrder,
}) {
  const isFullScreen = useMediaQuery("(max-width: 600px)");

  const handleLeave = () => {
    clearOrder();
    handleClickBack();
    handleClose();
  };
  return (
    <Dialog open={open} fullWidth maxWidth={"lg"} fullScreen={isFullScreen}>
      <DialogContent
        sx={{
          m: 0,
          p: 4,
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h4" align="center">
            Leave Checkout?
          </Typography>
          <Typography
            variant="body1"
            align="center"
            width="400px"
            pb={2}
            pt={1}
          >
            Are you sure you want to leave checkout? The items you've selected
            may not be available later.
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            gap={3}
            sx={{ width: "100%" }}
          >
            <Button
              sx={{ width: "100%" }}
              variant="outlined"
              onClick={handleClose}
            >
              Stay
            </Button>

            <Button
              sx={{ width: "100%" }}
              variant="contained"
              onClick={handleLeave}
            >
              Leave
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
