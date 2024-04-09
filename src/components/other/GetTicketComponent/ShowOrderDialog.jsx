import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  useMediaQuery,
  TextField,
} from "@mui/material";

export default function ShowOrderDialog({ open, handleClose, order, total }) {
  const renderOrder = Array.from(order)?.map(([key, value]) => {
    const { name, price } = JSON.parse(key);
    return (
      <Box key={`${name}-${price}`}>
        <Box display="flex" justifyContent="space-between">
          <Typography>
            {value} x {name}
          </Typography>
          <Typography>${price * value}</Typography>
        </Box>
      </Box>
    );
  });

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogContent sx={{ m: 0, p: 4 }}>
        <Box display="flex" flexDirection="column" gap={3}>
          <Typography variant="h6">Order summary</Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            {renderOrder}
          </Box>
          <Divider />
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">${total}</Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
