import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  useMediaQuery,
  TextField,
  IconButton,
  Alert,
} from "@mui/material";
import TicketCard from "../../cards/TicketCard";
import { useState } from "react";
import MultiStepForm, { FormStep } from "./MultiStepForm";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import { queryClient } from "../../../main";
import PayMethodAcordion from "./PayMethodAcordion";
import { Close, ShoppingCartOutlined } from "@mui/icons-material";
import { UserContext } from "../../../contexts/UserContext";
import MangedEventStep from "./MangedEventStep";
import * as yup from "yup";
import MainLoding from "../../looding/MainLoding";
import { useGetRegRequestForEvent } from "../../../API/eventPageApi";
import { useSnackBar } from "../../../contexts/SnackBarContext";
import dayjs from "dayjs";
export default function GetTicketDialog({ open, handleClose, data }) {
  const [orders, setOrders] = useState(new Map());
  const [total, setTotal] = useState(0);
  const [tickets, setTickets] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  const { showSnackBar } = useSnackBar();

  const isFullScreen = useMediaQuery("(max-width: 600px)");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const {
    name,
    startDate,
    endDate,
    startTime,
    endTime,
    thumbnailUrl,
    tickets: ticketsData,
    isManaged,
    ticketsSalesEnded,
    ticketsSalesRunning,
    ticketsSalesStarted,
  } = data;

  const addToOrder = (name, price, id) => {
    const key = JSON.stringify({ name, price, id });
    const updatedOrders = new Map(orders);
    if (updatedOrders.has(key)) {
      updatedOrders.set(key, updatedOrders.get(key) + 1);
    } else {
      updatedOrders.set(key, 1);
    }
    setOrders(updatedOrders);
    calculateTotal(updatedOrders);
  };

  const removeFromOrder = (name, price, id) => {
    const key = JSON.stringify({ name, price, id });
    const updatedOrders = new Map(orders);
    if (updatedOrders.has(key)) {
      const currentQuantity = updatedOrders.get(key);
      if (currentQuantity === 1) {
        updatedOrders.delete(key);
      } else {
        updatedOrders.set(key, currentQuantity - 1);
      }
      setOrders(updatedOrders);
      calculateTotal(updatedOrders);
    }
  };

  const calculateTotal = (orders) => {
    let total = 0;
    orders.forEach((value, key) => {
      const { price } = JSON.parse(key);
      total += price * value;
    });
    setTotal(total);
  };

  const renderTickets = ticketsData.map((ticket, index) => {
    return (
      <TicketCard
        key={index}
        id={ticket.id}
        name={ticket.name}
        price={ticket.price}
        quantity={ticket.availableQuantity}
        startSale={ticket.startSale}
        endSale={ticket.endSale}
        ticketsSalesEnded={ticketsSalesEnded}
        ticketsSalesRunning={ticketsSalesRunning}
        ticketsSalesStarted={ticketsSalesStarted}
        addToOrder={addToOrder}
        removeFromOrder={removeFromOrder}
        isManaged={isManaged}
        orders={orders}
      />
    );
  });

  const renderOrder = Array.from(orders).map(([key, value]) => {
    const { name, price } = JSON.parse(key);
    return (
      <Box key={`${name}-${price}`}>
        <Box display="flex" justifyContent="space-between">
          <Typography>
            {value} x {name}
          </Typography>
          <Typography>${price * value}</Typography>
        </Box>
      </Box>
    );
  });

  const clearOrder = () => {
    setOrders(new Map());
    setTotal(0);
  };
  const handleCloseDialog = () => {
    clearOrder();
    handleClose();
  };

  const initialValues = {
    RegistrationRequest: "",
    notes: "hi how are you?",
    paymentMethodId: 2,
    totalAmount: 0,
  };

  const createFinalOrder = () => {
    const finalOrder = [];
    Array.from(orders).forEach(([key, value]) => {
      const { id } = JSON.parse(key);
      finalOrder.push({ ticketId: id, quantity: value });
    });
    setTickets(finalOrder);
  };

  const { eventId } = useParams();

  const { userToken } = React.useContext(UserContext);

  const {
    mutateAsync,
    isPending: submitPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (values) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/events/${eventId}/bookings`,
        { tickets, ...values },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [["event", eventId]],
        exact: true,
      });
      handleCloseDialog();
      showSnackBar("Your order has been sent successfully", "success");
    },
  });

  const { isVerified } = React.useContext(UserContext);
  const { data: RegRequestData, isLoading } = useGetRegRequestForEvent(
    eventId,
    open
  );

  if (isLoading) {
    return <MainLoding isLoading={isLoading} />;
  }
  const isNotVerified = !isVerified();
  const flag = !!RegRequestData;
  const isPending = RegRequestData?.status === "Pending";
  const isApproved = RegRequestData?.status === "Approved";
  const isRejected = RegRequestData?.status === "Rejected";

  const handelMainDateTime = () => {
    const start_Date = new Date(`${startDate}T${startTime}z`);
    const end_Date = new Date(`${endDate}T${endTime}z`);

    start_Date.setSeconds(0);
    end_Date.setSeconds(0);

    const formattedStartDate = start_Date.toLocaleString("en-US", {
      hour12: false,
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    const formattedEndDate = end_Date.toLocaleString("en-US", {
      hour12: false,
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    if (dayjs(start_Date).isSame(dayjs(end_Date), "day")) {
      return formattedStartDate.concat(
        " - ",
        end_Date.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }
    return formattedStartDate.concat(" - ", formattedEndDate);
  };

  return (
    <Dialog open={open} fullScreen={isFullScreen} fullWidth maxWidth={"lg"}>
      <DialogContent
        sx={{
          height: "100vh",
          p: 0,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <IconButton
          onClick={handleCloseDialog}
          sx={{
            position: "absolute",
            zIndex: "10000",
            top: "5px",
            right: "5px",
            bgcolor: "#eeeeee",
          }}
        >
          <Close fontSize="small" />
        </IconButton>
        <Grid container height="100%">
          {/*********************************************  Left Side *******************************************/}
          <Grid
            item
            xs={12}
            md={8}
            position="relative"
            justifyContent="space-between"
          >
            {/***********************************  Title Section *********************************/}
            <Box
              top="0"
              position="sticky"
              zIndex="100"
              p={1.5}
              display="flex"
              flexDirection="column"
              gap={1.5}
              alignItems="center"
              borderBottom="#e0e0e0 solid 1px"
              bgcolor="white"
            >
              <Typography variant="h5" align="center">
                {name}
              </Typography>
              <Typography variant="body1" align="center">
                {handelMainDateTime()}
              </Typography>
            </Box>

            {isError && (
              <Alert variant="standard" severity="error" sx={{ mb: 2 }}>
                {error?.response?.data?.detail}
              </Alert>
            )}
            <MultiStepForm
              submitPending={submitPending}
              initialValues={initialValues}
              onSubmit={mutateAsync}
              totalAmount={total}
              fromGetTicket={true}
              order={orders}
              handleCloseDialog={handleCloseDialog}
              clearOrder={clearOrder}
            >
              {isManaged && (
                <FormStep
                  onSubmit={() => console.log("step 2 is submit")}
                  validationSchema={yup.object().shape({
                    RegistrationRequest: yup
                      .mixed()
                      .test(
                        "must-verify",
                        "You must verify your account before proceeding to the next step",
                        function () {
                          return !isNotVerified;
                        }
                      )
                      .test(
                        "must-approve",
                        "Approval must be obtained from the event organizer before proceeding to the next step",
                        function () {
                          return isApproved;
                        }
                      ),
                  })}
                >
                  <Box
                    pl={{
                      xs: 2,
                      sm: 10,
                    }}
                    pr={{
                      xs: 2,
                      sm: 10,
                    }}
                    pt={4}
                    display="flex"
                    flexDirection="column"
                    gap={2}
                    sx={{
                      overflowY: "auto",
                    }}
                    height={{
                      xs: "75vh",
                      sm: "67vh",
                      md: "71vh",
                    }}
                  >
                    <Typography variant="h4" fontWeight={400}>
                      Managed Event
                    </Typography>
                    <Box>
                      <MangedEventStep
                        eventId={eventId}
                        flag={flag}
                        isPending={isPending}
                        isApproved={isApproved}
                        isRejected={isRejected}
                        isNotVerified={isNotVerified}
                      />
                    </Box>
                  </Box>
                </FormStep>
              )}

              {/*********************** Choose Tickets form **********************/}
              <FormStep onSubmit={createFinalOrder}>
                <Box
                  pl={{
                    xs: 2,
                    sm: 10,
                  }}
                  pr={{
                    xs: 2,
                    sm: 10,
                  }}
                  pt={4}
                  display="flex"
                  flexDirection="column"
                  gap={2}
                  sx={{
                    overflowY: "auto",
                  }}
                  height={{
                    xs: "75vh",
                    sm: "67vh",
                    md: "71vh",
                  }}
                >
                  <Typography variant="h4" fontWeight={400}>
                    Tickets
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={2}>
                    {renderTickets}
                  </Box>
                </Box>
              </FormStep>

              {/********************* Choose Pay Method form *********************/}
              <FormStep>
                <Box
                  pl={{
                    xs: 2,
                    sm: 10,
                  }}
                  pr={{
                    xs: 2,
                    sm: 10,
                  }}
                  pt={4}
                  display="flex"
                  flexDirection="column"
                  gap={2}
                  sx={{
                    overflowY: "auto",
                  }}
                  height={{
                    xs: "75vh",
                    sm: "67vh",
                    md: "71vh",
                  }}
                >
                  {total === 0 && (
                    <Typography
                      variant="h4"
                      fontWeight={600}
                      ml="auto"
                      mr="auto"
                      mb={3}
                      sx={{ color: "green" }}
                    >
                      No Payment Required
                    </Typography>
                  )}

                  <Typography
                    variant="h4"
                    fontWeight={400}
                    sx={{ color: total === 0 ? "lightgray" : "inherit" }}
                  >
                    Pay with
                  </Typography>
                  <FormControl fullWidth disabled={total === 0}>
                    <RadioGroup
                      onChange={handleChange}
                      value={total !== 0 && selectedValue}
                    >
                      <PayMethodAcordion
                        setSelectedValue={setSelectedValue}
                        selectedValue="CreditOrDebitCard"
                        expanded={
                          total !== 0 && selectedValue === "CreditOrDebitCard"
                        }
                        onChange={() => setSelectedValue("CreditOrDebitCard")}
                        title={
                          <FormControlLabel
                            sx={{
                              p: 1,
                            }}
                            value="CreditOrDebitCard"
                            control={<Radio />}
                            label={
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <span>Credit or debit card</span>
                                <svg
                                  id="credit-card-back_svg__eds-icon--credit-card-back_svg"
                                  x="0"
                                  y="0"
                                  viewBox="0 0 24 24"
                                  xml:space="preserve"
                                  width="40"
                                  height="40"
                                  style={{
                                    position: "absolute",
                                    right: "20px",
                                  }}
                                >
                                  <path
                                    id="credit-card-back_svg__eds-icon--credit-card-back_base"
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M3 11h18v7H3v-7zm0-5h18v3H3V6zM2 19h20V5H2v14z"
                                  ></path>
                                  <g
                                    id="credit-card-back_svg__eds-icon--credit-card-back_dashes"
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                  >
                                    <path d="M4 15h2v1H4zM8 15h6v1H8z"></path>
                                  </g>
                                </svg>
                              </Box>
                            }
                          />
                        }
                        content={
                          <Box pl={6} pr={1}>
                            <TextField
                              fullWidth
                              label="Card number"
                              variant="outlined"
                            />
                            <Box
                              mt={2}
                              display="flex"
                              flexWrap="wrap"
                              justifyContent="space-between"
                            >
                              <TextField
                                sx={{ width: { xs: "32%", md: "32%" } }}
                                label="Expiration Date"
                                variant="outlined"
                              />
                              <TextField
                                sx={{ width: "32%" }}
                                label="Security Code"
                                variant="outlined"
                              />
                              <TextField
                                sx={{ width: "32%" }}
                                label="Postcode"
                                variant="outlined"
                              />
                            </Box>
                          </Box>
                        }
                      />
                      <PayMethodAcordion
                        setSelectedValue={setSelectedValue}
                        selectedValue="PayPal"
                        expanded={total !== 0 && selectedValue === "PayPal"}
                        onChange={() => setSelectedValue("PayPal")}
                        title={
                          <FormControlLabel
                            sx={{
                              p: 1,
                            }}
                            value="PayPal"
                            control={<Radio />}
                            label={
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  width: "100%",
                                }}
                              >
                                <span>PayPal</span>
                                <svg
                                  style={{
                                    position: "absolute",
                                    right: "20px",
                                  }}
                                  viewBox="0 0 48 32"
                                  width="40"
                                  height="40"
                                >
                                  <path
                                    fill="#0070BA"
                                    d="M3 0h42c1.7 0 3 1.3 3 3v26c0 1.7-1.3 3-3 3H3c-1.7 0-3-1.3-3-3V3c0-1.7 1.3-3 3-3z"
                                  ></path>
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    fill="#ADD0E6"
                                    d="M22.9 11.2H28c2.7 0 3.8 1.4 3.6 3.4-.3 3.3-2.3 5.2-5 5.2h-1.4c-.4 0-.6.2-.7.9l-.6 3.8c0 .2-.2.4-.4.4h-3.2c-.3 0-.4-.2-.3-.7L22 12c.1-.5.4-.8.9-.8z"
                                  ></path>
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    fill="#FFF"
                                    d="M19.7 7h5.1c1.4 0 3.1 0 4.3 1 .8.7 1.2 1.7 1.1 2.9-.3 3.9-2.6 6.1-5.8 6.1h-2.5c-.4 0-.7.3-.8 1l-.7 4.4c0 .3-.2.5-.4.5h-3.1c-.3 0-.5-.3-.4-.8l2.3-14.3c0-.5.3-.8.9-.8z"
                                  ></path>
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    fill="#E7F0F7"
                                    d="M21.1 17.6L22 12c.1-.5.3-.7.9-.7H28c.8 0 1.5.1 2.1.4-.5 3.5-2.7 5.4-5.7 5.4h-2.5c-.4-.1-.6.1-.8.5z"
                                  ></path>
                                </svg>
                              </Box>
                            }
                          />
                        }
                        content={
                          <Typography variant="body2" pl={5}>
                            Proceed below with your PayPal account and complete
                            your purchase.
                          </Typography>
                        }
                      />
                      <PayMethodAcordion
                        selectedValue="GooglePay"
                        setSelectedValue={setSelectedValue}
                        expanded={total !== 0 && selectedValue === "GooglePay"}
                        onChange={() => setSelectedValue("GooglePay")}
                        title={
                          <FormControlLabel
                            sx={{
                              p: 1,
                            }}
                            value="GooglePay"
                            control={<Radio />}
                            label={
                              <Box
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  width: "100%",
                                }}
                              >
                                <span>Google Pay</span>
                                <svg
                                  style={{
                                    position: "absolute",
                                    right: "20px",
                                  }}
                                  viewBox="0 0 754 402"
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  stroke-linejoin="round"
                                  stroke-miterlimit="2"
                                  width="40"
                                  height="40"
                                >
                                  <g id="google-pay-payment_svg__GPay_Base">
                                    <path
                                      d="M722.7 170h-352c-110 0-200 90-200 200s90 200 200 200h352c110 0 200-90 200-200s-90-200-200-200z"
                                      fill="#fff"
                                      fill-rule="nonzero"
                                      transform="translate(-170 -170)"
                                    ></path>
                                  </g>
                                  <g id="google-pay-payment_svg__GPay_Outline">
                                    <path
                                      d="M722.7 186.2c24.7 0 48.7 4.9 71.3 14.5 21.9 9.3 41.5 22.6 58.5 39.5 16.9 16.9 30.2 36.6 39.5 58.5 9.6 22.6 14.5 46.6 14.5 71.3 0 24.7-4.9 48.7-14.5 71.3-9.3 21.9-22.6 41.5-39.5 58.5-16.9 16.9-36.6 30.2-58.5 39.5-22.6 9.6-46.6 14.5-71.3 14.5h-352c-24.7 0-48.7-4.9-71.3-14.5-21.9-9.3-41.5-22.6-58.5-39.5-16.9-16.9-30.2-36.6-39.5-58.5-9.6-22.6-14.5-46.6-14.5-71.3 0-24.7 4.9-48.7 14.5-71.3 9.3-21.9 22.6-41.5 39.5-58.5 16.9-16.9 36.6-30.2 58.5-39.5 22.6-9.6 46.6-14.5 71.3-14.5h352m0-16.2h-352c-110 0-200 90-200 200s90 200 200 200h352c110 0 200-90 200-200s-90-200-200-200z"
                                      fill="#3c4043"
                                      fill-rule="nonzero"
                                      transform="translate(-170 -170)"
                                    ></path>
                                  </g>
                                  <g
                                    id="google-pay-payment_svg__G_Pay_LoGPay_Lockupckup_1_"
                                    transform="translate(-170 -170)"
                                    fill-rule="nonzero"
                                  >
                                    <g
                                      id="google-pay-payment_svg__Pay_Typeface_3_"
                                      fill="#3c4043"
                                    >
                                      <path
                                        id="google-pay-payment_svg__GPay_Letter_p"
                                        d="M529.3 384.1v60.6h-19.2V295.3H561c12.9 0 23.9 4.3 32.9 12.9 9.2 8.6 13.8 19.1 13.8 31.5 0 12.7-4.6 23.2-13.8 31.7-8.9 8.5-19.9 12.7-32.9 12.7h-31.7zm0-70.4v52.1h32.1c7.6 0 14-2.6 19-7.7 5.1-5.1 7.7-11.3 7.7-18.3 0-6.9-2.6-13-7.7-18.1-5-5.3-11.3-7.9-19-7.9h-32.1v-.1z"
                                      ></path>
                                      <path
                                        id="google-pay-payment_svg__GPay_Letter_a"
                                        d="M657.9 339.1c14.2 0 25.4 3.8 33.6 11.4 8.2 7.6 12.3 18 12.3 31.2v63h-18.3v-14.2h-.8c-7.9 11.7-18.5 17.5-31.7 17.5-11.3 0-20.7-3.3-28.3-10-7.6-6.7-11.4-15-11.4-25 0-10.6 4-19 12-25.2 8-6.3 18.7-9.4 32-9.4 11.4 0 20.8 2.1 28.1 6.3v-4.4c0-6.7-2.6-12.3-7.9-17-5.3-4.7-11.5-7-18.6-7-10.7 0-19.2 4.5-25.4 13.6l-16.9-10.6c9.3-13.5 23.1-20.2 41.3-20.2zm-24.8 74.2c0 5 2.1 9.2 6.4 12.5 4.2 3.3 9.2 5 14.9 5 8.1 0 15.3-3 21.6-9 6.3-6 9.5-13 9.5-21.1-6-4.7-14.3-7.1-25-7.1-7.8 0-14.3 1.9-19.5 5.6-5.3 3.9-7.9 8.6-7.9 14.1z"
                                      ></path>
                                      <path
                                        id="google-pay-payment_svg__GPay_Letter_y_"
                                        d="M808.2 342.4l-64 147.2h-19.8l23.8-51.5-42.2-95.7h20.9l30.4 73.4h.4l29.6-73.4h20.9z"
                                      ></path>
                                    </g>
                                    <g id="google-pay-payment_svg__GPayG_Mark">
                                      <path
                                        id="google-pay-payment_svg__GPay_Blue"
                                        d="M452.93 372c0-6.26-.56-12.25-1.6-18.01h-80.48v33l46.35.01c-1.88 10.98-7.93 20.34-17.2 26.58v21.41h27.59c16.11-14.91 25.34-36.95 25.34-62.99z"
                                        fill="#4285f4"
                                      ></path>
                                      <path
                                        id="google-pay-payment_svg__GPay_Green"
                                        d="M400.01 413.58c-7.68 5.18-17.57 8.21-29.14 8.21-22.35 0-41.31-15.06-48.1-35.36h-28.46v22.08c14.1 27.98 43.08 47.18 76.56 47.18 23.14 0 42.58-7.61 56.73-20.71l-27.59-21.4z"
                                        fill="#34a853"
                                      ></path>
                                      <path
                                        id="google-pay-payment_svg__GPay_Yellow"
                                        d="M320.09 370.05c0-5.7.95-11.21 2.68-16.39v-22.08h-28.46c-5.83 11.57-9.11 24.63-9.11 38.47s3.29 26.9 9.11 38.47l28.46-22.08a51.657 51.657 0 01-2.68-16.39z"
                                        fill="#fabb05"
                                      ></path>
                                      <path
                                        id="google-pay-payment_svg__GPay_Red"
                                        d="M370.87 318.3c12.63 0 23.94 4.35 32.87 12.85l24.45-24.43c-14.85-13.83-34.21-22.32-57.32-22.32-33.47 0-62.46 19.2-76.56 47.18l28.46 22.08c6.79-20.3 25.75-35.36 48.1-35.36z"
                                        fill="#e94235"
                                      ></path>
                                    </g>
                                  </g>
                                </svg>
                              </Box>
                            }
                          />
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              </FormStep>
            </MultiStepForm>
          </Grid>

          {/*********************************************  Right Side *******************************************/}
          <Grid
            item
            xs={false}
            md={4}
            display={{
              xs: "none",
              md: "block",
            }}
            borderLeft="#e0e0e0 solid 1px"
            bgcolor="#f5f5f5"
          >
            <div
              className="cont"
              style={{
                width: "100%",
                height: "fit-content",
                overflow: "hidden",
              }}
            >
              <img
                style={{ maxWidth: "100%", maxHeight: "100%", margin: "auto" }}
                src={`${import.meta.env.VITE_API_URL}/${thumbnailUrl}`}
                alt="Your Image"
              ></img>
            </div>

            {orders?.size <= 0 ? (
              <Box
                height="60%"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <ShoppingCartOutlined sx={{ fontSize: 60, color: "#e0e0e0" }} />
              </Box>
            ) : (
              <Box
                height="60%"
                pt={2}
                pl={4}
                pr={4}
                display="flex"
                flexDirection="column"
                gap={3}
              >
                <Typography variant="h6">Order summary</Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  {renderOrder}
                </Box>
                <Divider />
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6">${total}</Typography>
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
