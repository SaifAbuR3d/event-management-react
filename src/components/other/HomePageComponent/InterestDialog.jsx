import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useSetInterests } from "../../../API/HomePageApi";
import { useTheme } from "@emotion/react";
import { useGetCategories } from "../../../API/createEventApi";
import MainLoding from "../../looding/MainLoding";
import * as yup from "yup";
import { useSnackBar } from "../../../contexts/SnackBarContext";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const validationSchema = yup.object().shape({
  categoryIds: yup
    .array()
    .test("at-least-one", "Select one or more categories", function (value) {
      return value.length > 0;
    }),
});

export default function InterestDialog({ open, handleClose }) {
  const theme = useTheme();

  const initialValues = {
    categoryIds: [],
  };
  const { data: categories, isLoading } = useGetCategories();
  const { mutateAsync, isPending, isError, error } = useSetInterests();

  const { showSnackBar } = useSnackBar();

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      mutateAsync(values).then(() => {
        showSnackBar(
          "Your interests have been updated successfully!",
          "success"
        );
        handleClose();
      });
    },
    validationSchema,
  });

  if (isLoading) {
    return <MainLoding isLoading={isLoading} />;
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    formik.setFieldValue("categoryIds", value);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        onSubmit={formik.handleSubmit}
        PaperProps={{
          component: "form",
        }}
      >
        <DialogTitle>Set Your Interests</DialogTitle>
        <DialogContent>
          {isError && (
            <Alert severity="error" sx={{ mb: 1 }}>
              {error?.response?.data?.detail}.
            </Alert>
          )}
          <DialogContentText>
            {`Please select the categories that best represent your interests.
               This will help us tailor our recommendations and updates for you.`}
          </DialogContentText>

          <FormControl sx={{ m: 3, width: 300 }}>
            <InputLabel id="demo-multiple-chip-label">Categories</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={formik.values.categoryIds}
              onChange={handleChange}
              input={
                <OutlinedInput id="select-multiple-chip" label="Categories" />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((categoryId) => {
                    const category = categories.find(
                      (c) => c.id === categoryId
                    );
                    return <Chip key={categoryId} label={category.name} />;
                  })}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {categories?.map((category) => (
                <MenuItem
                  key={category?.id}
                  value={category?.id}
                  style={getStyles(category, categories, theme)}
                >
                  {category?.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {!!formik.errors.categoryIds && formik.errors.categoryIds}
            </FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton loading={isPending} type="submit">
            Submit
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
