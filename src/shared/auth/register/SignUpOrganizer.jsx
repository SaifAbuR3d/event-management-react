import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as yup from "yup";
import { useFormik } from "formik";
import { useContext } from "react";
import { RegisterContext } from "../context/Register";
import axios from "axios";
import { useState } from "react";

const validationSchema = yup.object().shape({
  companyName: yup.string().required("First Name is required"),
});

export default function SignUpOrganizer() {
  const [error, setError] = useState("");

  const { basicData, setBasicData } = useContext(RegisterContext);

  const initialValues = {
    companyName: "",
  };

  const onSubmit = async (values) => {
    const mergedData = { ...basicData, ...values };
    try {
      setError("");
      const data = await axios.post(
        "https://localhost:8080/api/auth/register-organizer",
        mergedData
      );
      console.log(data);
    } catch (err) {
      alert(err.response.data.detail);
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
      id: "companyName",
      label: "Display Name",
      name: "companyName",
      value: formik.values.companyName,
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
            Complete Your Information
          </Typography>

          {/*Form Body*/}
          <Box
            component="form"
            noValidate
            sx={{
              mt: 9,
              display: "flex",
              flexDirection: "column",
              gap: "2vh",
            }}
          >
            {/*Display Name Subtitle*/}
            <Typography
              sx={{ color: "#283593" }}
              component="h1"
              variant="subtitle2"
            >
              If you are a company, please enter your company name to display in
              your profile. <br /> Otherwise, enter your profile name.
            </Typography>

            {renderFields}

            {/*Get started button*/}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ height: "7vh", mt: "5vh" }}
              onClick={formik.handleSubmit}
            >
              Get Started
            </Button>
          </Box>
        </Box>
      </Grid>

      {/*Side Image */}
      <Grid
        item
        xs={false}
        md={5}
        sx={{
          backgroundImage: "url(/Sideimage2.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Grid>
  );
}
