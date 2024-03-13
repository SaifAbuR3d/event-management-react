import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { format } from "date-fns";
import { useContext } from "react";
import { RegisterContext } from "../context/Register";
import axios from "axios";
import { useState } from "react";

const validationSchema = yup.object().shape({
  gender: yup.string().required("Gender is required"),
  dateOfBirth: yup.date().required("Birth date is required"),
});

export default function SignUpAttendee() {
  const [error, setError] = useState("");

  const { basicData, setBasicData } = useContext(RegisterContext);

  const initialValues = {
    gender: "",
    dateOfBirth: null,
  };

  const onSubmit = async (values) => {
    const mergedData = { ...basicData, ...values };
    try {
      setError("");
      const data = await axios.post(
        "https://localhost:8080/api/auth/register-attendee",
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
            sx={{
              mt: 9,
              display: "flex",
              flexDirection: "column",
              gap: "10vh",
            }}
          >
            {/*Gender Field*/}
            <FormControl
              variant="standard"
              error={formik.touched.gender && Boolean(formik.errors.gender)}
            >
              <InputLabel>Gender</InputLabel>
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

            {/*Birth Date Field*/}
            <TextField
              variant="standard"
              margin="normal"
              fullWidth
              id="dateOfBirth"
              label="Birth Date"
              name="dateOfBirth"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={
                formik.values.dateOfBirth
                  ? format(formik.values.dateOfBirth, "yyyy-MM-dd")
                  : ""
              }
              onChange={(e) =>
                formik.setFieldValue("dateOfBirth", new Date(e.target.value))
              }
              error={
                formik.touched["dateOfBirth"] &&
                Boolean(formik.errors["dateOfBirth"])
              }
              helperText={
                formik.touched["dateOfBirth"] && formik.errors["dateOfBirth"]
              }
            />

            {/*Get started button*/}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ height: "7vh" }}
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
          backgroundImage: "url(/Sideimage1.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Grid>
  );
}
