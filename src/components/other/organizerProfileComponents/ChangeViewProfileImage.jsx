import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import {
  Avatar,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { changeImageRequest } from "../../../API/organizerProfileApi";

function ViewImage({ open, handleClose, image }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      PaperProps={{
        component: "div",
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Avatar
          variant="square"
          alt="Profile Image"
          src={`${import.meta.env.VITE_API_URL}/${image}`}
          sx={{ width: "100%", height: "100%" }}
        />
      </DialogContent>
    </Dialog>
  );
}

function ChangeImage({ open, handleClose, ownerData }) {
  const initialValues = {
    newImageUrl: ownerData.imageUrl,
  };

  const { mutateAsync } = changeImageRequest(handleClose);

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("image", values.newImageUrl);
      await mutateAsync(formData);
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
      <DialogTitle color="blue">Change Profile Image</DialogTitle>
      <DialogContent>
        <DialogContentText mb={3}>Please choose new image</DialogContentText>

        <TextField
          onChange={(event) =>
            formik.setFieldValue("newImageUrl", event.target.files[0])
          }
          autoFocus
          id="newImageUrl"
          name="newImageUrl"
          type="file"
          fullWidth
          variant="outlined"
          inputProps={{ accept: "image/*" }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function ChangeViewProfileImage({
  open,
  handleClose,
  image,
  ownerData,
  isCurrentOrganizer,
  anchorEl,
}) {
  const [openViewImage, setOpenViewImage] = React.useState(false);

  const handleOpenViewImage = () => {
    handleClose();
    setOpenViewImage(true);
  };
  const handleCloseViewImage = () => {
    setOpenViewImage(false);
  };

  const [openChangeImage, setOpenChangeImage] = React.useState(false);

  const handleOpenChangeImage = () => {
    handleClose();
    setOpenChangeImage(true);
  };
  const handleCloseChangeImage = () => {
    setOpenChangeImage(false);
  };

  return (
    <Box>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem sx={{ width: "200px" }} onClick={handleOpenViewImage}>
          <span>View Image</span>
        </MenuItem>
        {isCurrentOrganizer && (
          <MenuItem sx={{ width: "200px" }} onClick={handleOpenChangeImage}>
            <span>Change Image</span>
          </MenuItem>
        )}
      </Menu>

      <ViewImage
        image={image}
        open={openViewImage}
        handleClose={handleCloseViewImage}
      />

      <ChangeImage
        ownerData={ownerData}
        open={openChangeImage}
        handleClose={handleCloseChangeImage}
      />
    </Box>
  );
}
