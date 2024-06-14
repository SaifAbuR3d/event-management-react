import { Box, Paper, Typography, Button, Alert } from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import {
  useCreateRegistrationRequest,
  useGetRegRequestForEvent,
} from "../../../API/eventPageApi";
import { useField } from "formik";
import { LoadingButton } from "@mui/lab";

export default function MangedEventStep({
  eventId,
  isPending,
  isApproved,
  isRejected,
  isNotVerified,
  flag,
}) {
  const navigate = useNavigate();

  const { mutateAsync, isPending: isPendingMutate } =
    useCreateRegistrationRequest(eventId);
  const handelCreateRegistration = () => mutateAsync();

  const [, meta, helpers] = useField("RegistrationRequest");
  return (
    <>
      {!!meta.error && (
        <Alert variant="filled" severity="error" sx={{ mb: 2 }}>
          {meta.error}
        </Alert>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          gap: "10px",
          backgroundColor: "#f9f9f9",
          boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          maxWidth: "100%",
          marginTop: 4,
        }}
      >
        {isNotVerified && (
          <Box sx={{ textAlign: "center", width: "100%" }}>
            <Typography
              variant="body1"
              color="textPrimary"
              sx={{ marginBottom: "10px" }}
            >
              To register for this event you must verify your account first.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/verification")}
              sx={{ marginBottom: "20px" }}
            >
              Verify your account
            </Button>
          </Box>
        )}

        <Typography
          variant="body1"
          color="textPrimary"
          sx={{ textAlign: "center", width: "100%" }}
        >
          This is a private event. You can send a registration request.
        </Typography>
        {isPending && <Alert severity="info">Your request is pending.</Alert>}
        {isApproved && (
          <Alert severity="success">Your request is approved.</Alert>
        )}
        {isRejected && (
          <Alert severity="error">Your request is rejected.</Alert>
        )}
        <LoadingButton
          variant="contained"
          loading={isPendingMutate}
          color="primary"
          onClick={handelCreateRegistration}
          disabled={flag || isNotVerified || isPendingMutate}
          sx={{ marginTop: "20px" }}
        >
          Send Request
        </LoadingButton>
      </Box>
    </>
  );
}
