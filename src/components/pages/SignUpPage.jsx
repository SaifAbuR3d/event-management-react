import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Sideimage from "../../assets/images/registerImges/Sideimage.jpg";
import Sideimage1 from "../../assets/images/registerImges/Sideimage1.jpg";
import Sideimage2 from "../../assets/images/registerImges/Sideimage2.jpg";
import Sideimage3 from "../../assets/images/registerImges/Sideimage3.jpg";
import Sideimage4 from "../../assets/images/registerImges/Sideimage4.jpg";
import { useEffect } from "react";
import { useRegister } from "../../API/SharedApi";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LoadingButton } from "@mui/lab";

export default function SignUpPage() {
  const [isAttendee, setIsAttendee] = useState(true);
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [randomSideImage, setRandomSideImage] = useState("");
  const navigate = useNavigate();

  /*Choose Random Side Image*/

  const sideImages = [
    Sideimage,
    Sideimage1,
    Sideimage2,
    Sideimage3,
    Sideimage4,
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * sideImages.length);
    const randomImage = sideImages[randomIndex];

    setRandomSideImage(`url(${randomImage})`);
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleAttendeeClick = () => {
    setIsAttendee(true);
    setIsOrganizer(false);
  };

  const handleOrganizerClick = () => {
    setIsAttendee(false);
    setIsOrganizer(true);
  };

  {
    /*Handle Form Using Formik*/
  }
  const initialValues = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    gender: "",
    dateOfBirth: null,
    displayName: "",
  };

  const { mutateAsync, isPending, isSuccess, isError, error } =
    useRegister(isAttendee);

  const onSubmit = (values, actions) => {
    if (isAttendee) {
      values.displayName = "";
    } else {
      values.dateOfBirth = "";
      values.gender = "";
    }
    mutateAsync(values).then(() => {
      actions.resetForm();
      navigate("/login");
    });
  };

  const validationSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    userName: yup.string().required("User Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    gender: isAttendee
      ? yup.string().required("Gender is required")
      : yup.string(),
    dateOfBirth: isAttendee
      ? yup
          .date()
          .typeError("Invalid Date")
          .required("Date of Birth is required")
          .max(dayjs("2006-6-17"), "Date of Birth must before 2006-6-17 ")
      : yup.date().optional().nullable(),
    displayName: isOrganizer
      ? yup.string().required("Display Name is required")
      : yup.string(),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  {
    /*Fields Rendering*/
  }

  const NameFields = [
    {
      variant: "standard",
      margin: "normal",
      required: true,
      fullWidth: true,
      id: "firstName",
      label: "First Name",
      name: "firstName",
      type: "text",
      value: formik.values.firstName,
    },
    {
      variant: "standard",
      margin: "normal",
      required: true,
      fullWidth: true,
      id: "lastName",
      label: "Last Name",
      name: "lastName",
      type: "text",
      value: formik.values.lastName,
    },
  ];

  const renderNameFields = NameFields.map((field, index) => {
    return (
      <TextField
        key={index}
        {...field}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
        helperText={formik.touched[field.name] && formik.errors[field.name]}
      />
    );
  });

  const fields = [
    {
      variant: "standard",
      margin: "normal",
      required: true,
      fullWidth: true,
      id: "userName",
      label: "User Name",
      name: "userName",
      value: formik.values.userName,
    },
    {
      variant: "standard",
      margin: "normal",
      required: true,
      fullWidth: true,
      type: "email",
      id: "email",
      label: "Email Address",
      name: "email",
      value: formik.values.email,
    },
    {
      variant: "standard",
      margin: "normal",
      required: true,
      fullWidth: true,
      id: "password",
      label: "Password",
      name: "password",
      value: formik.values.password,
      type: showPassword ? "text" : "password",
      InputProps: {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      },
    },
  ];

  if (isOrganizer) {
    fields.push({
      variant: "standard",
      margin: "normal",
      required: true,
      fullWidth: true,
      id: "displayName",
      label: "Display Name",
      name: "displayName",
      value: formik.values.displayName,
    });
  }

  const renderFields = fields.map((field, index) => {
    return (
      <TextField
        key={index}
        {...field}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
        helperText={formik.touched[field.name] && formik.errors[field.name]}
      />
    );
  });

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />

      {/*Side form */}
      <Grid item xs={12} md={7} component={Paper} square>
        <Box
          sx={{
            my: 5,
            width: "60%",
            ml: "auto",
            mr: "auto",
          }}
        >
          {/*Create Account Title*/}
          <Typography
            sx={{ color: "#283593", fontWeight: "800" }}
            component="h1"
            variant="h4"
          >
            Create an account
          </Typography>

          {isError && (
            <Alert variant="standard" severity="error" sx={{ mb: 2, mt: 2 }}>
              {Object.values(error?.response?.data?.errors)?.map((item) => (
                <Typography variant="body1" color="initial" key={item}>
                  {item}
                </Typography>
              ))}
            </Alert>
          )}

          {/*Radio for Account Type*/}
          <Box
            mt={3}
            sx={{
              display: "flex",
              gap: "3vw",
              height: "6vh",
            }}
          >
            {/*Attendee Button*/}
            <Button
              type="button"
              fullWidth
              variant={isAttendee ? "contained" : "outlined"}
              color="primary"
              onClick={handleAttendeeClick}
            >
              Attendee
            </Button>

            {/*Event Organizer Buttin*/}
            <Button
              type="button"
              fullWidth
              variant={isOrganizer ? "contained" : "outlined"}
              color="primary"
              onClick={handleOrganizerClick}
            >
              Event Organizer
            </Button>
          </Box>

          {/*Form Body*/}
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1vh",
            }}
          >
            {/*First name and last name Box*/}
            <Box sx={{ display: "flex", gap: "5vw" }}>{renderNameFields}</Box>

            {/*Other fields*/}
            {renderFields}

            {/*Attende fields*/}

            {isAttendee && (
              <Box>
                <FormControl
                  variant="standard"
                  error={formik.touched.gender && Boolean(formik.errors.gender)}
                  fullWidth={true}
                  margin="normal"
                >
                  <InputLabel>Gender *</InputLabel>
                  <Select
                    variant="standard"
                    id="gender"
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                  {formik.touched.gender && formik.errors.gender && (
                    <FormHelperText>{formik.errors.gender}</FormHelperText>
                  )}
                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label={"Birth Date *"}
                    name={"dateOfBirth"}
                    value={formik.values.dateOfBirth || null}
                    onChange={(newValue) => {
                      formik.setFieldValue("dateOfBirth", newValue);
                    }}
                    slotProps={{
                      textField: {
                        helperText:
                          !!formik.values.dateOfBirth &&
                          Boolean(formik.errors["dateOfBirth"]) &&
                          formik.errors["dateOfBirth"],
                        fullWidth: true,
                        error:
                          !!formik.values.dateOfBirth &&
                          Boolean(formik.errors["dateOfBirth"]),
                        variant: "standard",
                        margin: "normal",
                      },
                    }}
                    maxDate={dayjs("17-06-2006")}
                  />
                </LocalizationProvider>
              </Box>
            )}

            {/*Save and continue button*/}
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ height: "7vh", mt: "2vh" }}
              onClick={formik.handleSubmit}
              loading={isPending}
            >
              Sign Up
            </LoadingButton>

            <Typography color={"secondary"} mt={2} ml={"auto"} mr={"auto"}>
              Already have an account? <Link to="/login">Login</Link>
            </Typography>
          </Box>
        </Box>
      </Grid>

      {/*Side Image */}
      <Grid
        item
        xs={false}
        md={5}
        sx={{
          backgroundImage: randomSideImage,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Grid>
  );
}
