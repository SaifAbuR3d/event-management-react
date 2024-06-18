import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import { useChangeBio } from "../../../API/organizerProfileApi";
import { useSnackBar } from "../../../contexts/SnackBarContext";

export default function DescriptionDialog({ open, handleClose, profile }) {
  const initialValues = {
    newBio: profile.bio,
  };

  const { mutateAsync } = useChangeBio(handleClose);
  const { showSnackBar } = useSnackBar();

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const requestData = { ...profile, bio: values.newBio };
      mutateAsync(requestData).then(() => {
        showSnackBar("Bio updated successfully", "success");
      });
    },
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onSubmit={formik.handleSubmit}
      fullWidth
      PaperProps={{
        component: "form",
        style: {
          position: "absolute",
          top: "1%",
        },
      }}
    >
      <DialogTitle color="blue">Update Bio</DialogTitle>
      <DialogContent>
        <DialogContentText>Please update your Bio here</DialogContentText>
        <TextField
          autoFocus
          multiline
          value={formik.values.newBio}
          onChange={formik.handleChange}
          margin="dense"
          id="newBio"
          name="newBio"
          label="New Bio"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
