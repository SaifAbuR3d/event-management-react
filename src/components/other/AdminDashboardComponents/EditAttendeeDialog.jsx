import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Avatar,
  Box,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import {
  useChangeAttendeeData,
  useGetSpecificAttendee,
  useSetNewPassword,
} from "../../../API/AdminApi";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useSnackBar } from "../../../contexts/SnackBarContext";

export default function EditAttendeeDialog({ open, handleClose, user }) {
  const { data, isLoading } = useGetSpecificAttendee(user?.userName);
  const { mutateAsync } = useChangeAttendeeData(user?.userName);
  const { mutateAsync: setPassword } = useSetNewPassword(user?.userName);
  const { showSnackBar } = useSnackBar();

  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
  });
  const [password, setPasswordValue] = useState("");
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      if (values.firstName !== initialValues.firstName) {
        await mutateAsync({ firstName: values.firstName }).then(() => {
          showSnackBar("Data updated successfully", "success", "filled");
        });
        setInitialValues((prev) => ({ ...prev, firstName: values.firstName }));
      }
      if (values.lastName !== initialValues.lastName) {
        await mutateAsync({ lastName: values.lastName }).then(() => {
          showSnackBar("Data updated successfully", "success", "filled");
        });
        setInitialValues((prev) => ({ ...prev, lastName: values.lastName }));
      }
      setSubmitting(false);
    },
  });

  useEffect(() => {
    if (user && user.fullName) {
      const [firstName, lastName] = user.fullName.split(" ");
      setInitialValues({ firstName, lastName });
      formik.setValues({ firstName, lastName });
    }
  }, [user]);

  const isFirstNameChanged =
    formik.values.firstName !== initialValues.firstName;
  const isLastNameChanged = formik.values.lastName !== initialValues.lastName;

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPasswordValue(newPassword);
    setIsPasswordChanged(newPassword !== "");
  };

  const handlePasswordSubmit = async () => {
    if (isPasswordChanged) {
      await setPassword(password).then(() => {
        showSnackBar("Password updated successfully", "success", "filled");
      });
      setIsPasswordChanged(false);
      setPasswordValue("");
    }
  };

  const fields = [
    { key: "Email", value: data?.email },
    { key: "Gender", value: data?.gender },
    {
      key: "Birth date",
      value: dayjs(data?.dateOfBirth).format("DD MMM YYYY"),
    },
  ];

  const renderFields = fields.map((it, index) => (
    <Box
      key={index}
      component={Paper}
      height="50px"
      width="100%"
      border="black solid 1px"
      display="flex"
      variant="outlined"
      alignItems="center"
    >
      <Box
        height="100%"
        width="110px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRight="black solid 1px"
        mr={1}
        bgcolor="#f5fffa"
        borderRadius="5%"
      >
        {it.key}
      </Box>
      {it.value}
    </Box>
  ));

  function stringAvatar(name) {
    return {
      sx: {
        height: "140px",
        width: "140px",
        backgroundImage: "linear-gradient(to bottom, #c5cae9 , #f5fffa)",
        color: "black",
        border: "black solid 1px",
        fontSize: 50,
      },
      children: `${name.split(" ")[0][0]}`,
    };
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth={"xs"}
      PaperProps={{ component: "form", onSubmit: formik.handleSubmit }}
    >
      <DialogTitle position="relative" width="100%">
        <IconButton
          sx={{ position: "absolute", right: "5px", top: "5px" }}
          onClick={handleClose}
        >
          <Close fontSize="medium" />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          mt: 1,
        }}
      >
        {user.imageUrl ? (
          <Avatar
            sx={{ height: "140px", width: "140px" }}
            src={`${import.meta.env.VITE_API_URL}/${user.imageUrl}`}
          />
        ) : (
          <Avatar {...stringAvatar(user.fullName || "")} />
        )}
        <Box
          component={Paper}
          height="50px"
          width="100%"
          border="black solid 1px"
          display="flex"
          variant="outlined"
          alignItems="center"
          position="relative"
        >
          <Box
            height="100%"
            width="110px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRight="black solid 1px"
            mr={1}
            bgcolor="#f5fffa"
            borderRadius="5%"
          >
            First name
          </Box>
          <TextField
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            variant="standard"
            margin="dense"
            sx={{ width: "50%" }}
            InputProps={{
              disableUnderline: true,
              sx: {
                "&:before": {
                  borderBottom: "none",
                },
                "&:after": {
                  borderBottom: "none",
                },
                "&:hover:not(.Mui-disabled):before": {
                  borderBottom: "none",
                },
              },
            }}
          />
          <Button
            variant="outlined"
            sx={{ position: "absolute", right: 5 }}
            onClick={formik.submitForm}
            disabled={!isFirstNameChanged}
          >
            Save
          </Button>
        </Box>

        <Box
          component={Paper}
          height="50px"
          width="100%"
          border="black solid 1px"
          display="flex"
          variant="outlined"
          alignItems="center"
          position="relative"
        >
          <Box
            height="100%"
            width="110px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRight="black solid 1px"
            mr={1}
            bgcolor="#f5fffa"
            borderRadius="5%"
          >
            Last name
          </Box>
          <TextField
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            variant="standard"
            margin="dense"
            sx={{ width: "65%" }}
            InputProps={{
              disableUnderline: true,
              sx: {
                "&:before": {
                  borderBottom: "none",
                },
                "&:after": {
                  borderBottom: "none",
                },
                "&:hover:not(.Mui-disabled):before": {
                  borderBottom: "none",
                },
              },
            }}
          />
          <Button
            variant="outlined"
            sx={{ position: "absolute", right: 5 }}
            onClick={formik.submitForm}
            disabled={!isLastNameChanged}
          >
            Save
          </Button>
        </Box>

        {renderFields}

        <Typography mt={2}>Want To Set A New Password?</Typography>
        <Box
          component={Paper}
          height="50px"
          width="100%"
          border="black solid 1px"
          display="flex"
          variant="outlined"
          alignItems="center"
          position="relative"
        >
          <TextField
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            variant="standard"
            margin="dense"
            sx={{ width: "65%", ml: 2 }}
            InputProps={{
              disableUnderline: true,
              sx: {
                "&:before": {
                  borderBottom: "none",
                },
                "&:after": {
                  borderBottom: "none",
                },
                "&:hover:not(.Mui-disabled):before": {
                  borderBottom: "none",
                },
              },
            }}
          />
          <Button
            variant="outlined"
            sx={{ position: "absolute", right: 5 }}
            onClick={handlePasswordSubmit}
            disabled={!isPasswordChanged || password === ""}
          >
            Save
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
