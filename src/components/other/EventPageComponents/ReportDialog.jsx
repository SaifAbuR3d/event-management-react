import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import { useReportEvent, useReportReview } from "../../../API/eventPageApi";
import { LoadingButton } from "@mui/lab";
import { Alert, Snackbar } from "@mui/material";
import { useSnackBar } from "../../../contexts/SnackBarContext";

export default function ReportDialog({ eventId, reviewId, open, handleClose }) {
  const [error, setError] = useState("");
  const { showSnackBar } = useSnackBar();

  const initialValues = {
    content: "",
  };

  const { mutateAsync: mutateReportEvent, isPending: pendingEvent } =
    useReportEvent();

  const { mutateAsync: mutateReportReview, isPending: pendingReview } =
    useReportReview();

  const handelEventMutateAsync = (MutateFun, requestData) => {
    MutateFun(requestData)
      .then(() => {
        handleClose();
        showSnackBar("The report has been sent successfully", "success");
      })
      .catch((error) => setError(error?.response?.data?.detail));
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const requestData = {
        eventId: parseInt(eventId),
        ...(eventId && { eventId: parseInt(eventId) }),
        ...(reviewId && { reviewId: parseInt(reviewId) }),
        content: values.content,
      };

      eventId
        ? handelEventMutateAsync(mutateReportEvent, requestData)
        : handelEventMutateAsync(mutateReportReview, requestData);
    },
  });

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
        <DialogTitle>Report This {eventId ? "Event" : "Review"}</DialogTitle>
        <DialogContent>
          {!!error && (
            <Alert severity="error" sx={{ mb: 1 }}>
              {error}.
            </Alert>
          )}
          <DialogContentText>
            {`Please help us investigate this ${
              eventId ? "Event" : "Review"
            } by providing information about why you're reporting it.`}
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
          <LoadingButton loading={pendingEvent || pendingReview} type="submit">
            Submit Report
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
