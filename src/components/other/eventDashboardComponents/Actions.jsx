import { Check, Clear } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React from "react";
import {
  useApproveRegReq,
  useRejectRegReq,
} from "../../../API/eventDahboardApi";
import { useParams } from "react-router-dom";
import { useSnackBar } from "../../../contexts/SnackBarContext";

export default function Actions({ params }) {
  const { eventId } = useParams();
  const { mutateAsync: mutateApprove, isPending: pendingApprove } =
    useApproveRegReq(eventId);
  const { mutateAsync: mutateReject, isPending: pendingReject } =
    useRejectRegReq(eventId);
  const { showSnackBar } = useSnackBar();

  const handelApprove = (id) =>
    mutateApprove(id).then(() =>
      showSnackBar(
        "You Are Approved this Attendee successfully!",
        "success",
        "filled"
      )
    );
  const handelReject = (id) =>
    mutateReject(id).then(() =>
      showSnackBar(
        "You Are Reject this Attendee successfully!",
        "success",
        "filled"
      )
    );

  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: "20px" }}>
      <IconButton
        color="success"
        disabled={
          params?.row?.status === "Approved" ||
          params?.row?.status === "Rejected" ||
          pendingApprove
        }
        onClick={() => {
          handelApprove(params.row.id);
        }}
      >
        <Check />
      </IconButton>
      <IconButton
        disabled={
          params?.row?.status === "Approved" ||
          params?.row?.status === "Rejected" ||
          pendingReject
        }
        color="error"
        onClick={() => {
          handelReject(params.row.id);
        }}
      >
        <Clear />
      </IconButton>
    </Box>
  );
}
