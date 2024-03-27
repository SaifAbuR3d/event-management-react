import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../../main";

export default function SocialMediaLinkDialog({ open, handleClose, profile }) {
  const initialValues = {
    LinkedIn: profile.linkedIn,
    Facebook: profile.facebook,
    Twitter: profile.twitter,
    Instagram: profile.instagram,
    Website: profile.website,
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(
        `https://localhost:8080/api/Organizers/my/profile`,
        {
          ...profile,
          linkedIn: formik.values.LinkedIn,
          facebook: formik.values.Facebook,
          twitter: formik.values.Twitter,
          instagram: formik.values.Instagram,
          website: formik.values.Website,
        },
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

  const { linkedIn, facebook, twitter, instagram, website } = profile;
  const renderSocialMedia = [
    { platform: "LinkedIn", link: linkedIn },
    { platform: "Facebook", link: facebook },
    { platform: "Twitter", link: twitter },
    { platform: "Instagram", link: instagram },
    { platform: "Website", link: website },
  ].map((item, index) => {
    return (
      <React.Fragment key={item.platform}>
        <DialogContentText pt={3}>
          Please update your {item.platform} Link here
        </DialogContentText>
        <TextField
          multiline
          value={formik.values[item.platform]}
          onChange={formik.handleChange}
          id={item.platform}
          name={item.platform}
          label={`New ${item.platform} Link`}
          type="text"
          fullWidth
          variant="standard"
        />
      </React.Fragment>
    );
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
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        },
      }}
    >
      <DialogTitle color="blue">Update Socail Media Links</DialogTitle>
      <DialogContent>{renderSocialMedia}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
