import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../main";

export default function DescriptionDialog({ open, handleClose, profile }) {
  const initialValues = {
    newBio: profile.bio,
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(
        `https://localhost:8080/api/Organizers/my/profile`,
        { ...profile, bio: formik.values.newBio },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjkiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiU2FtZWVoLUh1c3NlaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJzYW1lZWhodXNzZWluQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6Ik9yZ2FuaXplciIsImV4cCI6MTcxMTI0NjcyNCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwIn0.W2I4dieGI87mB4q0Ep2VRrVWStiGGJU6iNybBNhavMQ`,
          },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["profileOwnerData"]);
      handleClose();
    },
  });

  const formik = useFormik({
    initialValues,
    onSubmit: mutateAsync,
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
          top: "17%",
          left: "50%",
          transform: "translate(-50%, -50%)",
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
