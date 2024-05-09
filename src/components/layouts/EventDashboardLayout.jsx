import React, { useState } from "react";
import EventDrawer from "../other/eventDashboardComponents/EventDrawer";
import { Outlet, useParams } from "react-router-dom";
import EventAppbar from "../other/eventDashboardComponents/EventAppbar";
import { Box } from "@mui/material";
import { useGetEventData } from "../../API/eventPageApi";

export default function EventDashboardLayout() {
  const [open, setOpen] = useState(false);
  const { eventId } = useParams();
  const { data: eventData } = useGetEventData(eventId);

  return (
    <Box sx={{ backgroundColor: "#f8f7fa", minHeight: "100vh" }}>
      {/* <CssBaseline /> */}
      <EventAppbar open={open} eventData={eventData} />
      <EventDrawer open={open} setOpen={setOpen} eventData={eventData} />
      <Box
        sx={{
          width: "100%",
          minHeight: "90vh",
          m: "auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
