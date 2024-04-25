import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import { useChangeLinks } from "../../../API/organizerProfileApi";

export default function SocialMediaLinkDialog({ open, handleClose, profile }) {
  const initialValues = {
    LinkedIn: profile.linkedIn,
    Facebook: profile.facebook,
    Twitter: profile.twitter,
    Instagram: profile.instagram,
    Website: profile.website,
  };

  const { mutateAsync } = useChangeLinks(handleClose);

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const requestData = {
        ...profile,
        linkedIn: formik.values.LinkedIn,
        facebook: formik.values.Facebook,
        twitter: formik.values.Twitter,
        instagram: formik.values.Instagram,
        website: formik.values.Website,
      };
      await mutateAsync(requestData);
    },
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
          top: "1%",
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
