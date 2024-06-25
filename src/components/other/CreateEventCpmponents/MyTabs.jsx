import React, { useState } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { LocationOn, OndemandVideo } from "@mui/icons-material";
import MapComponent from "./MapComponent";
import { useField } from "formik";
import InputField from "./InputField";

// Define your components for each tab content
function TabPanel({ children, value, index, ...other }) {
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

// Main component
export default function MyTabs() {
  const [{ value: isOnlineValue }, , helpers] = useField("isOnline");
  const [value, setValue] = useState(+isOnlineValue);
  const handleChange = (event, newValue) => {
    setValue(newValue);

    newValue == 1 ? helpers.setValue(true) : helpers.setValue(false);
  };

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="icon label tabs example"
      >
        <Tab
          icon={<LocationOn />}
          label="Venue"
          sx={{ textTransform: "capitalize" }}
        />
        <Tab
          icon={<OndemandVideo />}
          label="Online"
          sx={{ textTransform: "capitalize" }}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <MapComponent />
        <InputField name="street" label="Street" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div>
          {
            "Online events do not require physical location details. Please include the relevant online meeting link (e.g., Zoom, Teams, Webex) in the event description."
          }
        </div>
      </TabPanel>
    </div>
  );
}
