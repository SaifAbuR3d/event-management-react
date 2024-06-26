import Container from "@mui/material/Container";
import { Box, Typography, Grid } from "@mui/material";
import InputField, {
  CheckboxField,
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
import { styled } from "@mui/system";
import Alert from "@mui/material/Alert";
import { useContext, useState } from "react";
import MainLoding from "../looding/MainLoding";
import { Link, useNavigate } from "react-router-dom";
import { useSnackBar } from "../../contexts/SnackBarContext";
import { UserContext } from "../../contexts/UserContext";

const MainBox = styled("div")(({ theme }) =>
  theme.unstable_sx({
    mt: 4,
    p: 4,
    width: "100%",
    height: "fit-contents",
    borderRadius: "10px",
    outline: "#eeedf2 2px solid",
    "&:hover": { outline: "#3659e3 2px solid" },
  })
);

const MainTitle = styled(Typography)(({ theme }) =>
  theme.unstable_sx({
    fontWeight: "600",
    mb: 5,
  })
);

export default function CreateEvetnPage() {
  const [isManged, setIsManged] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading } = useGetCategories();
  const { showSnackBar } = useSnackBar();
  const { isVerified } = useContext(UserContext);

  const { mutateAsync, isPending, isError, error } = useCreateEvent();

  const handelMutateAsync = (values) => {
    mutateAsync(values).then(({ eventId }) => {
      showSnackBar("Yor Event Created successfully", "success");
      navigate(`/event/${eventId}`);
    });
  };

  const handelValues = (values) => {
    dayjs.extend(utc); // extend dayjs with utc plugin
    const formData = new FormData();

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
        Totalquantity: Number(rest.quantity),
      };
    });

    const startDateUtc = new Date(
      `${dayjs(values.startDate).format("YYYY-MM-DD")}T${dayjs(
        values.startTime
      ).format("HH:mm:ss")}`
    ).toISOString();

    const endDateUtc = new Date(
      `${dayjs(values.endDate).format("YYYY-MM-DD")}T${dayjs(
        values.endTime
      ).format("HH:mm:ss")}`
    ).toISOString();

    // Step 1
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("thumbnail", values.Thumbnail);
    formData.append("startDate", startDateUtc.substring(0, 10));
    formData.append("endDate", endDateUtc.substring(0, 10));
    formData.append(
      "startTime",
      startDateUtc.substring(11, startDateUtc.length - 1) + "1"
    );
    formData.append(
      "endTime",
      endDateUtc.substring(11, startDateUtc.length - 1) + "1"
    );

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
    return <MainLoding isLoading={isLoading} />;
  }

  return (
    <>
      <Container maxWidth="md" sx={{ p: 2 }}>
        <Box sx={{ minHeight: "60vh" }}>
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

          {isError && (
            <Alert variant="standard" severity="error" sx={{ mb: 2 }}>
              <Typography variant="body1" color="initial">
                {error?.response?.data?.detail}
              </Typography>
            </Alert>
          )}
          <MultiStepForm
            initialValues={{
              name: "",
              description: "",
              Thumbnail: "",
              startDate: dayjs().add(1, "day"),
              endDate: dayjs().add(1, "day"),
              startTime: dayjs().add(10, "minute"),
              endTime: dayjs().add(1, "hour"),
              lat: "",
              lon: "",
              street: "",
              isOnline: false,
              categoryId: "",
              //----step 2--------
              tickets: [
                {
                  name: "",
                  price: "",
                  quantity: "",
                  startSale: dayjs(),
                  endSale: dayjs().add(10, "minute"),
                  startSaleTime: dayjs().add(10, "minute"),
                  endSaleTime: dayjs().add(60, "minute"),
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
              handelMutateAsync(formData);
            }}
            isPending={isPending}
          >
            <FormStep
              stepName={"Event Overview"}
              validationSchema={validationSchemaStepOne}
            >
              <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                  <ImageField name="image" />
                </Grid>
                {/* Event Overview section */}
                <MainBox>
                  <MainTitle variant="h5" color="initial">
                    Event Overview
                  </MainTitle>

                  <Grid container rowSpacing={1}>
                    <Grid item xs={12}>
                      <Typography variant="h6" color="initial" sx={{ mb: 2 }}>
                        Event title
                      </Typography>
                      <InputField name="name" label="Title" />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="h6" color="initial" sx={{ mb: 2 }}>
                        Event Details
                      </Typography>

                      <InputField
                        name="description"
                        label="Description"
                        multiline={"multiline"}
                        minRow={3}
                      />
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
                </MainBox>
                {/* Event Date and Time section */}
                <MainBox>
                  <MainTitle variant="h5" color="initial">
                    Event Date and Time
                  </MainTitle>

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
                </MainBox>
                {/* Event Loacation section */}
                <MainBox>
                  <MainTitle variant="h5" color="initial">
                    Event Loacation
                  </MainTitle>

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
                </MainBox>
              </Grid>
            </FormStep>

            <FormStep
              stepName={"Event Tickets"}
              validationSchema={validationSchemaStepTwo}
            >
              <TicketsFieldArray name="tickets" />
            </FormStep>

            <FormStep
              stepName={"Event Restrictions"}
              validationSchema={validationSchemaStepThree}
            >
              {isVerified() ? (
                <MainBox>
                  <MainTitle variant="h5" color="initial">
                    Restrictions
                  </MainTitle>
                  <Typography variant="body1" color="initial" sx={{ mb: 1 }}>
                    When you select &apos;Event is Managed&apos;, you&apos;ll
                    need to approve attendance manually.Additionally, you can
                    specify the age and gender of attendees if you wish. For
                    unmanaged events, you may leave &apos;Event is Managed&apos;
                    unchecked.
                  </Typography>
                  <CheckboxField
                    label="Event is Managed"
                    name="isManaged"
                    setIsManged={setIsManged}
                    isManged={isManged}
                  />
                  {isManged && (
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
                        <Typography
                          variant="body2"
                          color="#585163"
                          sx={{ mb: 2 }}
                        >
                          You can specify the age of the attendee
                        </Typography>
                      </Grid>
                      <Grid item xs={5.8}>
                        <InputField
                          name="minAge"
                          label="Min Age"
                          numeric={true}
                        />
                      </Grid>
                      <Grid item xs={5.8}>
                        <InputField
                          name="maxAge"
                          label="Max Age"
                          numeric={true}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h6" color="initial" sx={{ mb: 2 }}>
                          Gender
                        </Typography>
                        <Typography
                          variant="body2"
                          color="#585163"
                          sx={{ mb: 2 }}
                        >
                          You can specify the Gender of the attendee
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
                  )}
                </MainBox>
              ) : (
                <MainBox>
                  <MainTitle variant="h5" color="initial">
                    Restrictions
                  </MainTitle>
                  <Typography variant="body1" color="initial" sx={{ mb: 1 }}>
                    To create a managed event and apply restrictions, account
                    verification is required. Normal events, however, can be
                    created without this prerequisite. Verify your account
                    <Link to="/verification" style={{ textDecoration: "none" }}>
                      {" here"}
                    </Link>
                    .
                  </Typography>
                </MainBox>
              )}
            </FormStep>
          </MultiStepForm>
        </Box>
      </Container>
    </>
  );
}
