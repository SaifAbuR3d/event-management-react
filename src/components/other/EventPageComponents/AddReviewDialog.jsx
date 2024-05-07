import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import { useAddReview } from "../../../API/eventPageApi";
import { LoadingButton } from "@mui/lab";
import { Alert, Rating } from "@mui/material";
import { useEffect, useState } from "react";

export default function AddReviewDialog({ eventId, open, handleClose }) {
  const [error, setError] = useState("");
  const initialValues = {
    rating: 0,
    comment: "",
  };

  const { mutateAsync: mutateReviewe, isPending: isPendingReview } =
    useAddReview(eventId);

  const handelMutateReviewe = (values) =>
    mutateReviewe(values)
      .then(() => handleClose())
      .catch((error) => setError(error?.response?.data?.detail));

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      handelMutateReviewe(values);
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
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Review This Event</DialogTitle>
        <DialogContent>
          {!!error && (
            <Alert severity="error" sx={{ mb: 1 }}>
              {error}.
            </Alert>
          )}
          <Rating
            name="rating"
            value={parseInt(formik.values.rating)}
            onChange={(event, newValue) => {
              formik.setFieldValue("rating", newValue); // Correct method to set field value
            }}
          />

          <TextField
            required
            value={formik.values.comment}
            onChange={formik.handleChange}
            margin="dense"
            id="comment"
            name="comment"
            label="Comment"
            type="text"
            fullWidth
            variant="standard"
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton loading={isPendingReview} type="submit">
            Submit Review
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
