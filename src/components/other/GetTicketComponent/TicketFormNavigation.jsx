import { Box, Button, Typography, IconButton } from "@mui/material";
import { KeyboardArrowDownOutlined } from "@mui/icons-material";
import { useState } from "react";
import ShowOrderDialog from "./ShowOrderDialog";
import ExistDialog from "./ExistDialog";
export default function FormNavigation(props) {
  const [open, setOpen] = useState(false);
  const [openBack, setOpenBack] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenBack = () => {
    setOpenBack(true);
  };

  const handleCloseBack = () => {
    setOpenBack(false);
  };
  return (
    <Box mr={{ xs: 2, sm: 10 }} ml={{ xs: 2, sm: 10 }}>
      <Box display={{ xs: "flex", md: "none" }} justifyContent="end">
        {props.totalAmount !== 0 && !open && (
          <IconButton sx={{ p: 0 }} onClick={handleOpen}>
            <KeyboardArrowDownOutlined />
          </IconButton>
        )}
        <ShowOrderDialog
          open={open}
          handleClose={handleClose}
          total={props.totalAmount}
          order={props.order}
        />
        <Typography variant="h6" pr={5}>
          ${props.totalAmount}
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent={
          props.isLastStep || props.isPenultimateStep ? "space-between" : "end"
        }
      >
        {props.hasPrevious && (
          <Button
            variant="outlined"
            type="button"
            onClick={handleOpenBack}
            sx={{ p: 1, width: "150px" }}
          >
            Back
          </Button>
        )}
        <ExistDialog
          open={openBack}
          handleClose={handleCloseBack}
          handleClickBack={props.onBackClick}
          clearOrder={props.clearOrder}
        />
        <Button
          variant="contained"
          disabled={
            (props.isPenultimateStep && props.order.size === 0) ||
            props.submitPending
          }
          type="submit"
          sx={{ p: 1, width: "150px" }}
        >
          {props.isLastStep ? "Palce order" : "Next"}
        </Button>
      </Box>
    </Box>
  );
}
