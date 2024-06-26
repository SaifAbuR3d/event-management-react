import { useState, useEffect, useContext } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Paper,
  IconButton,
  InputAdornment,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useFormik } from "formik";
import * as yup from "yup";

import Sideimage from "../../assets/images/registerImges/Sideimage.jpg";
import Sideimage1 from "../../assets/images/registerImges/Sideimage1.jpg";
import Sideimage2 from "../../assets/images/registerImges/Sideimage2.jpg";
import Sideimage3 from "../../assets/images/registerImges/Sideimage3.jpg";
import Sideimage4 from "../../assets/images/registerImges/Sideimage4.jpg";

import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import { useSnackBar } from "../../contexts/SnackBarContext";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [randomSideImage, setRandomSideImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { saveCurrentUser } = useContext(UserContext);

  // Choose Random Side Image*/
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

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        values
      );
      saveCurrentUser(data.token);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid email or password. Please try again.");
      } else if (error.response) {
        setErrorMessage("An error occurred. Please try again later.");
      } else if (error.request) {
        setErrorMessage(
          "No response received from the server. Please try again later."
        );
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const fields = [
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

      {/*Left Side */}
      <Grid item xs={12} md={7} component={Paper} square>
        <Box
          sx={{
            my: 5,
            width: "60%",
            ml: "auto",
            mr: "auto",
          }}
        >
          {/*Form Title*/}
          <Typography
            sx={{ color: "#283593", fontWeight: "800" }}
            component="h1"
            variant="h4"
          >
            Login
          </Typography>

          {/*Form Body*/}
          <Box
            component="form"
            sx={{
              mt: 3,
              display: "flex",
              flexDirection: "column",
              gap: "1vh",
            }}
          >
            {renderFields}

            {/*Continue button*/}
            <LoadingButton
              type="submit"
              fullWidth
              loading={loading}
              variant="contained"
              color="secondary"
              sx={{ height: "7vh", mt: "2vh" }}
              onClick={formik.handleSubmit}
              disabled={!formik.isValid}
            >
              Continue
            </LoadingButton>
            <Typography color={"secondary"} mt={2} ml={"auto"} mr={"auto"}>
              Don&apos;t have an account? <Link to="/register">Sign up</Link>
            </Typography>
          </Box>
        </Box>

        {/* Display error message if it exists*/}
        {errorMessage && (
          <Snackbar
            open={errorMessage !== ""}
            autoHideDuration={5000}
            onClose={() => setErrorMessage("")}
          >
            <Alert severity="error" onClose={() => setErrorMessage("")}>
              {errorMessage}
            </Alert>
          </Snackbar>
        )}
      </Grid>

      {/*Right Side*/}
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
