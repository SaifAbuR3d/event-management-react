import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import { useReportEvent } from "../../../API/eventPageApi";
import { LoadingButton } from "@mui/lab";
import { Alert, Snackbar } from "@mui/material";

export default function ReportDialog({ eventId, open, handleClose }) {
  const initialValues = {
    content: "",
  };

  const { mutateAsync, isSuccess, isPending } = useReportEvent(handleClose);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const requestData = {
        eventId: parseInt(eventId),
        content: values.content,
      };
      mutateAsync(requestData);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setSnackbarOpen(true);
      setTimeout(() => {
        setSnackbarOpen(false);
      }, 3000);
    }
  }, [isSuccess]);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        onSubmit={formik.handleSubmit}
        PaperProps={{
          component: "form",
        }}
      >
        <DialogTitle>Report This Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {
              "Please help us investigate this event by providing information about why you're reporting it."
            }
          </DialogContentText>
          <TextField
            autoFocus
            required
            value={formik.values.content}
            onChange={formik.handleChange}
            margin="dense"
            id="content"
            name="content"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton loading={isPending} type="submit">
            Submit Report
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={3000}>
        <Alert severity="success" variant="standard" sx={{ width: "100%" }}>
          The report has been sent successfully
        </Alert>
      </Snackbar>
    </>
  );
}
