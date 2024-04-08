import Container from "@mui/material/Container";
import { Box, Typography, Grid, Paper } from "@mui/material";

import InputField, {
  ControlledOpenSelect,
  DateField,
  ImageField,
  TicketsFieldArray,
  TimeField,
} from "../other/CreateEventCpmponents/InputField";
import MultiStepForm, { FormStep } from "../forms/multiStepForm/MultiStepForm";
import dayjs from "dayjs";
import MyTabs from "../other/CreateEventCpmponents/MyTabs";
import { useCreateEvent, useGetCategories } from "../../API/createEventApi";
import {
  validationSchemaStepOne,
  validationSchemaStepThree,
  validationSchemaStepTwo,
} from "../other/CreateEventCpmponents/validationSchemas";
import utc from "dayjs/plugin/utc";

export default function CreateEvetnPage() {
  const { data, isLoading } = useGetCategories();

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYW5pbmk4NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFobWFkYW5pbmk4NkBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJPcmdhbml6ZXIiLCJleHAiOjE3MTI1NjIxNDEsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MCJ9.I7FSYfKpJXncOcEksjb0-2uPopvG1gNggqgf_sknKMk";

  const { mutateAsync, isPending } = useCreateEvent(token);

  const handelValues = (values) => {
    dayjs.extend(utc); // extend dayjs with utc plugin
    const formData = new FormData();
    if (values.allowedGender || values.maxAge || values.minAge) {
      values.isManaged = true;
    }

    const formattedTickets = values.tickets.map((ticket) => {
      const { startSale, endSale, startSaleTime, endSaleTime, ...rest } =
        ticket;
      const formattedStartSale = new Date(
        `${dayjs(ticket.startSale).format("YYYY-MM-DD")}T${dayjs(
          ticket.startSaleTime
        ).format("HH:mm:ss")}`
      ).toISOString();

      const formattedEndSale = new Date(
        `${dayjs(ticket.endSale).format("YYYY-MM-DD")}T${dayjs(
          ticket.endSaleTime
        ).format("HH:mm:ss")}`
      ).toISOString();

      return {
        ...rest,
        startSale: formattedStartSale,
        endSale: formattedEndSale,
        price: Number(rest.price),
        quantity: Number(rest.quantity),
      };
    });

    console.log(formattedTickets);

    // Step 1
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("thumbnail", values.Thumbnail);
    formData.append("startDate", dayjs(values.startDate).format("YYYY-MM-DD"));
    formData.append("endDate", dayjs(values.endDate).format("YYYY-MM-DD"));
    formData.append(
      "startTime",
      dayjs.utc(values.startTime).format("HH:mm:ss")
    );
    formData.append("endTime", dayjs.utc(values.endTime).format("HH:mm:ss"));

    formData.append("lat", values.lat);
    formData.append("lon", values.lon);
    formData.append("street", values.street);
    formData.append("isOnline", values.isOnline);
    formData.append("categoryId", values.categoryId);

    // Step 2
    formData.append("tickets", JSON.stringify(formattedTickets));

    // Step 3
    formData.append("isManaged", values.isManaged);
    formData.append("allowedGender", values.allowedGender);
    formData.append("maxAge", values.maxAge);
    formData.append("minAge", values.minAge);

    return formData;
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Container maxWidth="md" sx={{ p: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "600", mb: 1 }}>
            Build your event page
          </Typography>
          <Typography
            variant="h6"
            color="initial"
            sx={{ opacity: 0.75, mb: 5 }}
          >
            Add all of your event details and let attendees know what to expect
          </Typography>
          <MultiStepForm
            withStepper
            initialValues={{
              name: "",
              description: "",
              Thumbnail: "",
              startDate: "",
              endDate: "",
              startTime: "",
              endTime: "",
              lat: 51.505,
              lon: -0.09,
              street: "",
              isOnline: false,
              categoryId: "",
              //----step 2--------
              tickets: [
                {
                  name: "",
                  price: "",
                  quantity: "",
                  startSale: "",
                  endSale: "",
                  startSaleTime: "",
                  endSaleTime: "",
                },
              ],
              //----step 3--------
              isManaged: false,
              allowedGender: "",
              maxAge: "",
              minAge: "",
            }}
            onSubmit={(values) => {
              const formData = handelValues(values);
              mutateAsync(formData);
            }}
          >
            <FormStep
              stepName={"Event"}
              onSubmit={() => console.log("step 1 is submit")}
              validationSchema={validationSchemaStepOne}
            >
              <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      height: "38vh",
                      borderRadius: "10px",
                      outline: "#eeedf2 2px solid",
                      "&:hover": { outline: "#3659e3 2px solid" },
                    }}
                  >
                    <ImageField name="image" />
                  </Paper>
                </Grid>

                <Box
                  sx={{
                    mt: 4,
                    p: 4,
                    width: "100%",
                    MinHeight: "60vh",
                    height: "fit-contents",
                    borderRadius: "10px",
                    outline: "#eeedf2 2px solid",
                    "&:hover": { outline: "#3659e3 2px solid" },
                  }}
                >
                  <Typography
                    variant="h5"
                    color="initial"
                    sx={{ fontWeight: "600", mb: 5 }}
                  >
                    Event Overview
                  </Typography>

                  <Grid container rowSpacing={1}>
                    <Grid item xs={12}>
                      <Typography variant="h6" color="initial" sx={{ mb: 2 }}>
                        Event title
                      </Typography>
                      <Typography
                        variant="body2"
                        color="#585163"
                        sx={{ mb: 2 }}
                      >
                        Be clear and descriptive with a title that tells people
                        what your event is about.
                      </Typography>
                      <InputField name="name" label="Title" />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="h6" color="initial" sx={{ mb: 2 }}>
                        Event Details
                      </Typography>
                      <Typography
                        variant="body2"
                        color="#585163"
                        sx={{ mb: 2 }}
                      >
                        Add more details about your event and include what
                        people can expect if they attend.
                      </Typography>
                      <InputField name="description" label="Description" />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6" color="initial" sx={{ mb: 1 }}>
                        Event category
                      </Typography>

                      <ControlledOpenSelect
                        name="categoryId"
                        label="category"
                        options={data}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Box
                  sx={{
                    mt: 4,
                    p: 4,
                    width: "100%",
                    MinHeight: "45vh",
                    height: "fit-contents",
                    borderRadius: "10px",
                    outline: "#eeedf2 2px solid",
                    "&:hover": { outline: "#3659e3 2px solid" },
                  }}
                >
                  <Typography
                    variant="h5"
                    color="initial"
                    sx={{ fontWeight: "600", mb: 5 }}
                  >
                    Event Date and Time
                  </Typography>

                  <Grid
                    container
                    rowSpacing={1}
                    sx={{ rowSpacing: 1 }}
                    justifyContent={"space-between"}
                  >
                    <Grid item xs={12}>
                      <Typography variant="h6" color="initial" sx={{ mb: 2 }}>
                        Date
                      </Typography>
                    </Grid>
                    <Grid item xs={11.8} sm={5.8}>
                      <DateField
                        name="startDate"
                        label={"Start Date"}
                        minDate={dayjs().add(1, "day")}
                      />
                    </Grid>
                    <Grid item xs={11.8} sm={5.8}>
                      <DateField
                        name="endDate"
                        label={"End Date"}
                        minDate={dayjs().add(1, "day")}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6" color="initial" sx={{ mb: 2 }}>
                        Time
                      </Typography>
                    </Grid>
                    <Grid item xs={11.8} sm={5.8}>
                      <TimeField name="startTime" label={"Start time"} />
                    </Grid>
                    <Grid item xs={11.8} sm={5.8}>
                      <TimeField name="endTime" label={"End Time"} />
                    </Grid>
                  </Grid>
                </Box>
                <Box
                  sx={{
                    mt: 4,
                    p: 4,
                    width: "100%",
                    minHeight: "30vh",
                    height: "fit-content",
                    borderRadius: "10px",
                    outline: "#eeedf2 2px solid",
                    "&:hover": { outline: "#3659e3 2px solid" },
                  }}
                >
                  <Typography
                    variant="h5"
                    color="initial"
                    sx={{ fontWeight: "600", mb: 5 }}
                  >
                    Event Loacation
                  </Typography>

                  <Grid
                    container
                    rowSpacing={1}
                    columnGap={2}
                    justifyContent={"space-between"}
                  >
                    <Grid item xs={12}>
                      <MyTabs />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </FormStep>

            <FormStep
              stepName={"tikits"}
              onSubmit={() => console.log("step 2 is submit")}
              validationSchema={validationSchemaStepTwo}
            >
              <Box>
                <Typography
                  variant="h5"
                  color="initial"
                  sx={{ fontWeight: "600", mb: 5 }}
                >
                  Event Tikits
                </Typography>

                <TicketsFieldArray name="tickets" />
              </Box>
            </FormStep>
            <FormStep
              stepName={"restriction"}
              onSubmit={() => console.log("step 3 is submit")}
              validationSchema={validationSchemaStepThree}
            >
              <Box
                sx={{
                  mt: 4,
                  p: 4,
                  width: "100%",
                  height: "50vh",
                  borderRadius: "10px",
                  outline: "#eeedf2 2px solid",
                  "&:hover": { outline: "#3659e3 2px solid" },
                }}
              >
                <Typography
                  variant="h5"
                  color="initial"
                  sx={{ fontWeight: "600", mb: 5 }}
                >
                  Restrictions
                </Typography>

                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={2}
                  justifyContent={"space-between"}
                >
                  <Grid item xs={12}>
                    <Typography variant="h6" color="initial" sx={{ mb: 2 }}>
                      Age
                    </Typography>
                    <Typography variant="body2" color="#585163" sx={{ mb: 2 }}>
                      You can specify the age of the attendee
                    </Typography>
                  </Grid>
                  <Grid item xs={5.8}>
                    <InputField name="minAge" label="Min Age" numeric={true} />
                  </Grid>
                  <Grid item xs={5.8}>
                    <InputField name="maxAge" label="Max Age" numeric={true} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" color="initial" sx={{ mb: 2 }}>
                      Gender
                    </Typography>
                    <Typography variant="body2" color="#585163" sx={{ mb: 2 }}>
                      You can specify the age of the attendee
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <ControlledOpenSelect
                      name="allowedGender"
                      label="Gender"
                      options={[
                        { id: 1, value: "Male" },
                        { id: 2, value: "Female" },
                      ]}
                    />
                  </Grid>
                </Grid>
              </Box>
            </FormStep>
          </MultiStepForm>
        </Box>
      </Container>
    </>
  );
}
