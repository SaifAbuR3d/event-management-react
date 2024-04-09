import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import { Paper, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../../../main";

function ViewImage({ open, handleClose, image }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "div",
      }}
    >
      <DialogContent>
        <Box
          component={Paper}
          elevation={1}
          sx={{
            backgroundImage: `url(https://localhost:8080/${image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: {
              xs: "330px",
              sm: "550px",
              md: "550px",
              lg: "550px",
            },
            height: {
              xs: "330px",
              sm: "550px",
              md: "550px",
              lg: "550px",
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>close</Button>
      </DialogActions>
    </Dialog>
  );
}

function ChangeImage({ open, handleClose, ownerData }) {
  const initialValues = {
    newImageUrl: ownerData.imageUrl,
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (formData) => {
      const { data } = await axios.post(
        `https://localhost:8080/api/Organizers/my/profile-picture`,
        formData,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYW5pbmk4NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFobWFkYW5pbmk4NkBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJPcmdhbml6ZXIiLCJleHAiOjE3MTE2MTQzNTQsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MCJ9.aTkq0A3S9X-aEziWYmNLY1TZX-MmBGbXTxSWmTeED1w`,
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
          top: "17%",
          left: "50%",
          transform: "translate(-50%, -50%)",
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
}) {
  const [openViewImage, setOpenViewImage] = React.useState(false);

  const handleOpenViewImage = () => {
    setOpenViewImage(true);
  };
  const handleCloseViewImage = () => {
    setOpenViewImage(false);
  };

  const [openChangeImage, setOpenChangeImage] = React.useState(false);

  const handleOpenChangeImage = () => {
    setOpenChangeImage(true);
  };
  const handleCloseChangeImage = () => {
    setOpenChangeImage(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "div",
        style: {
          position: "absolute",
          top: "59%",
          left: "12.5%",
          transform: "translate(-50%, -50%)",
        },
      }}
    >
      <DialogTitle display="flex" justifyContent="center" color="blue">
        Profile Image
      </DialogTitle>

      <DialogContent>
        <Button fullWidth onClick={handleOpenViewImage}>
          View Image
        </Button>
        {isCurrentOrganizer && (
          <Button fullWidth onClick={handleOpenChangeImage}>
            Chaneg Image
          </Button>
        )}
      </DialogContent>

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
    </Dialog>
  );
}
