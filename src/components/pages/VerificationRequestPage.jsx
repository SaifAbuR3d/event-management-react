import { CloudUpload, Verified } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSendVerificationRequest } from "../../API/SharedApi";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

export default function VerificationRequest() {
  const { mutate } = useSendVerificationRequest();
  const [errorMessage, setErrorMessage] = useState(null);

  const formik = useFormik({
    initialValues: {
      document: null,
      documentType: "NationalId",
    },
    validationSchema: Yup.object({
      document: Yup.mixed().required("Please upload a document."),
      documentType: Yup.string().required("Document type is required"),
    }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      // Clear error message
      setErrorMessage(null);

      if (!values.document) {
        formik.setFieldTouched("document", true, true);
        setErrorMessage("Please upload a document.");
        return;
      }

      const formData = new FormData();
      formData.append("Document", values.document);
      formData.append("DocumentType", values.documentType);

      mutate(formData, {
        onSuccess: (data) => {
          setErrorMessage(null); // Reset error message on success
        },
        onError: (error) => {
          setErrorMessage(error.response?.data?.detail || "An error occurred");
        },
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        border="grey solid 1px"
        component={Paper}
        maxWidth={650}
        minWidth={300}
        m={"auto"}
        mt={2}
        mb={2}
        height={"fit-content"}
      >
        <Box
          pt={2}
          pb={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Verified color="primary" sx={{ fontSize: "90px" }} />
        </Box>
        <Box p={4}>
          {(formik.errors.document && formik.touched.document) ||
          errorMessage ? (
            <Box mb={2}>
              <Alert severity="error">
                {formik.errors.document || errorMessage}
              </Alert>
            </Box>
          ) : null}

          <Typography variant="h5" fontWeight={600} pb={2}>
            Account Verification
          </Typography>
          <Typography>
            We offer an optional identity verification process designed to
            enhance the trust and safety of our platform by ensuring that users
            have a verified identity.
          </Typography>

          <Typography variant="h5" fontWeight={600} pb={2} pt={4}>
            How to Verify Your Account
          </Typography>
          <Typography>
            To verify your account, you can submit one of the following valid
            identity documents:
          </Typography>

          <Select
            variant="standard"
            required
            name="documentType"
            value={formik.values.documentType}
            onChange={formik.handleChange}
            sx={{ width: "60%", mt: 2 }}
          >
            <MenuItem value={"Passport"}>Passport</MenuItem>
            <MenuItem value={"NationalId"}>National Id</MenuItem>
            <MenuItem value={"DriverLicense"}>Driver License</MenuItem>
            <MenuItem value={"SchoolCard"}>School Card</MenuItem>
            <MenuItem value={"Other"}>Other</MenuItem>
          </Select>

          <Typography variant="h5" fontWeight={600} pb={2} pt={4}>
            Instructions for Uploading
          </Typography>
          <Typography pl={2}>
            1- Make sure your document is up-to-date and clearly legible.
            <br />
            2- Use a supported file format (JPG, PNG, PDF).
          </Typography>

          <Button
            sx={{ width: "60%", mt: 4 }}
            component="label"
            variant="contained"
            startIcon={<CloudUpload />}
          >
            Upload File
            <VisuallyHiddenInput
              name="document"
              type="file"
              accept=".jpg,.png,.pdf"
              onChange={(event) => {
                setErrorMessage(null); // Reset error message when file is selected
                formik.setFieldValue("document", event.currentTarget.files[0]);
              }}
            />
          </Button>
          <Box pt={4} pr={2} width="100%" display="flex" justifyContent="end">
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  );
}
