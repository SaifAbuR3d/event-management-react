import {
  Box,
  Button,
  FormHelperText,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { FieldArray, useField, useFormikContext } from "formik";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Add, Delete, FileUpload } from "@mui/icons-material";
import img1 from "../../../assets/images/CreateEventImage/placeholder.webp";
import { InputAdornment } from "@mui/material";
export default function InputField({ label, numeric = false, name }) {
  const [field, meta] = useField(name);

  const handleKeyPress = (e) => {
    if (numeric) {
      const keyCode = e.keyCode || e.which;
      // Allow numbers (key codes 48 to 57) and Back key (key code 8)
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 8) {
        e.preventDefault();
      }
    }
  };

  return (
    <TextField
      fullWidth
      label={label}
      name={name}
      {...field}
      onKeyDown={handleKeyPress}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
      sx={{ mb: 1 }}
      InputProps={{
        startAdornment:
          label == "Price" ? (
            <InputAdornment position="start">$</InputAdornment>
          ) : null,
      }}
    />
  );
}

export function ImageField() {
  const [, meta, { setValue }] = useField("Thumbnail");
  const [previewSrc, setPreviewSrc] = useState("");
  const [type, setType] = useState("");

  return (
    <>
      <Box
        sx={{
          position: "relative",
          height: "38vh", // Set a fixed height for the box
          width: "100%",
          borderRadius: "10px",
          overflow: "hidden",
          outline: "#eeedf2 2px solid",
          "&:hover": { outline: "#3659e3 2px solid" },
        }}
      >
        <InputLabel
          htmlFor="upload"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%)`,
          }}
        >
          <Button
            color="primary"
            variant="outlined"
            component="span"
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100px",
              gap: "7px",
              alignItems: "center",
              backgroundColor: "#ffffff",
              textTransform: "capitalize",
              borderRadius: "15px",
              "&:hover": {
                backgroundColor: "#ffffff",
              },
            }}
          >
            <FileUpload sx={{ fontSize: "23px" }} />
            {!previewSrc ? (
              <Typography
                variant="body2"
                color="primary"
                sx={{ fontWeight: "700" }}
              >
                Upload Image
              </Typography>
            ) : (
              <Typography
                variant="body2"
                color="primary"
                sx={{ fontWeight: "700" }}
              >
                Edit Image
              </Typography>
            )}

            <Typography variant="body1" color="red" sx={{ fontSize: "14px" }}>
              {meta.value || meta.touched ? meta.error : null}
            </Typography>
          </Button>
        </InputLabel>

        <img
          src={previewSrc && type.startsWith("image") ? previewSrc : img1}
          alt="Uploaded Image Preview"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      <input
        name={name}
        type="file"
        accept="image/*"
        id="upload"
        style={{ display: "none" }}
        onChange={(event) => {
          const file = event.target.files[0];
          setValue(file);
          setType(file.type);

          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setPreviewSrc(reader.result);
            };
            reader.readAsDataURL(file);
          } else {
            setPreviewSrc("");
          }
        }}
      />
    </>
  );
}

export function DateField({ name, label, minDate }) {
  const [field, meta, helpers] = useField(name);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        name={name}
        value={field.value || null}
        onChange={(newValue) => {
          helpers.setValue(newValue);
        }}
        slotProps={{
          textField: {
            helperText: meta.value || meta.touched ? meta.error : null,
            fullWidth: true,
          },
        }}
        minDate={minDate}
      />
    </LocalizationProvider>
  );
}

export function TimeField({ name, label }) {
  const [field, meta, helpers] = useField(name);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label={label}
        name={name}
        value={field.value || null}
        onChange={(newValue) => {
          helpers.setValue(newValue);
        }}
        slotProps={{
          textField: {
            helperText: meta.value || meta.touched ? meta.error : null,
            fullWidth: true,
          },
        }}
      />
    </LocalizationProvider>
  );
}

export function ControlledOpenSelect({ name, options, label }) {
  const [age, setAge] = useState("");
  const [open, setOpen] = useState(false);
  // const { data, isLoading } = useGetCategories();
  const [, meta, { setValue, setTouched }] = useField(name);

  const handleChange = (event) => {
    setAge(event.target.value);
    setValue(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    setTouched(true);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const error = meta.touched && !!meta.error && !meta.value;

  return (
    <div>
      {/* <Button sx={{ display: "block", mt: 2 }} onClick={handleOpen}>
        Open the select
      </Button> */}
      <FormControl sx={{ minWidth: "100%" }} error={error}>
        <InputLabel id="demo-controlled-open-select-label">{label}</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          label={label}
          onChange={handleChange}
        >
          {name === "categoryId" &&
            options.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}

          {name === "allowedGender" &&
            options.map((option) => (
              <MenuItem key={option.id} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
        </Select>
        {error && <FormHelperText>{meta.error}</FormHelperText>}
      </FormControl>
    </div>
  );
}

export function TicketsFieldArray({ name }) {
  const { values } = useFormikContext();
  // const [field, meta, helpers] = useField(name);

  return (
    <FieldArray name={name}>
      {({ push, remove }) => (
        <Box>
          {values.tickets.map((ticket, index) => (
            <Box
              sx={{
                mt: 4,
                p: 4,
                width: "100%",
                height: "fit-content",
                borderRadius: "10px",
                outline: "#eeedf2 2px solid",
                "&:hover": { outline: "#3659e3 2px solid" },
              }}
              key={index}
            >
              <Grid container rowSpacing={3} justifyContent={"space-between"}>
                <Grid item xs={12}>
                  <InputField label="Name" name={`tickets.${index}.name`} />
                </Grid>
                <Grid item xs={5.7}>
                  <InputField
                    label="Price"
                    name={`tickets.${index}.price`}
                    numeric={true}
                  />
                </Grid>
                <Grid item xs={5.7}>
                  <InputField
                    label="Quantity"
                    name={`tickets.${index}.quantity`}
                    numeric={true}
                  />
                </Grid>
                <Grid item xs={5.7}>
                  <DateField
                    label="Start Sale"
                    name={`tickets.${index}.startSale`}
                    minDate={dayjs().add(1, "day")}
                  />
                </Grid>
                <Grid item xs={5.7}>
                  <DateField
                    label="End Sale"
                    name={`tickets.${index}.endSale`}
                    minDate={dayjs().add(1, "day")}
                  />
                </Grid>
                <Grid item xs={5.7}>
                  <TimeField
                    name={`tickets.${index}.startSaleTime`}
                    label="Start Time"
                  />
                </Grid>
                <Grid item xs={5.7}>
                  <TimeField
                    name={`tickets.${index}.endSaleTime`}
                    label="End Time"
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Tooltip title="Delete Tikit">
                    <IconButton
                      type="button"
                      disabled={values.tickets.length === 1}
                      onClick={() => remove(index)}
                      component={"span"}
                    >
                      <Delete
                        sx={{
                          fontSize: "50px",
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Box>
          ))}
          <Tooltip title="Add Tikit">
            <IconButton
              type="button"
              sx={{
                display: "block",
                m: "auto",
              }}
              onClick={() =>
                push({
                  name: "",
                  price: "",
                  quantity: "",
                  startSale: "",
                  endSale: "",
                })
              }
            >
              <Add
                sx={{
                  color: "#3659e3",
                  fontSize: "50px",
                }}
              />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </FieldArray>
  );
}
