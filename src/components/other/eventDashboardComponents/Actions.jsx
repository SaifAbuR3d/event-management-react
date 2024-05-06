import { Check, Clear } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React from "react";
import {
  useApproveRegReq,
  useRejectRegReq,
} from "../../../API/eventDahboardApi";
import { useParams } from "react-router-dom";

export default function Actions({ params }) {
  const { eventId } = useParams();
  const { mutateAsync: mutateApprove } = useApproveRegReq(eventId);
  const { mutateAsync: mutateReject } = useRejectRegReq(eventId);
  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: "20px" }}>
      <IconButton
        color="success"
        disabled={
          params?.row?.status === "Approved" ||
          params?.row?.status === "Rejected"
        }
        onClick={() => {
          mutateApprove(params.row.id);
        }}
      >
        <Check />
      </IconButton>
      <IconButton
        disabled={
          params?.row?.status === "Approved" ||
          params?.row?.status === "Rejected"
        }
        color="error"
        onClick={() => {
          mutateReject(params.row.id);
        }}
      >
        <Clear />
      </IconButton>
    </Box>
  );
}
