import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import { Avatar, Menu, MenuItem, TextField, styled } from "@mui/material";
import { useFormik } from "formik";
import { useChangeImageRequest } from "../../../API/organizerProfileApi";
import { CloudUpload } from "@mui/icons-material";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

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

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

function ChangeImage({ open, handleClose }) {
  const { mutateAsync } = useChangeImageRequest(handleClose);

  const formik = useFormik({
    initialValues: { newImageUrl: null },
    onSubmit: async (values) => {
      if (values.newImageUrl) {
        const formData = new FormData();
        formData.append("image", values.newImageUrl);
        await mutateAsync(formData);
      }
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
      <DialogTitle sx={{ m: "auto" }} color="blue">
        Change Profile Image
      </DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <DialogContentText mb={3}>Please choose a new image</DialogContentText>

        <Button
          sx={{ width: "40%" }}
          component="label"
          variant="contained"
          startIcon={<CloudUpload />}
        >
          Upload Image
          <VisuallyHiddenInput
            type="file"
            accept="image/*"
            onChange={(event) =>
              formik.setFieldValue("newImageUrl", event.currentTarget.files[0])
            }
          />
        </Button>
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
  anchorEl,
}) {
  const [openViewImage, setOpenViewImage] = React.useState(false);

  const {isCurrentOrganizer} = useContext(UserContext);

  const handleOpenViewImage = () => {
    handleClose();
    setOpenViewImage(true);
  };
  const handleCloseViewImage = () => setOpenViewImage(false);

  const [openChangeImage, setOpenChangeImage] = React.useState(false);

  const handleOpenChangeImage = () => {
    handleClose();
    setOpenChangeImage(true);
  };
  const handleCloseChangeImage = () => setOpenChangeImage(false);

  const currentOrganizer = isCurrentOrganizer(ownerData?.userName);

  return (
    <Box>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem sx={{ width: "200px" }} onClick={handleOpenViewImage}>
          <span>View Image</span>
        </MenuItem>
        {currentOrganizer && (
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
