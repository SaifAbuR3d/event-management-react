import {
  DateRange,
  LocationOn,
  ExpandMore,
  LockPerson,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Marker } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import "leaflet/dist/leaflet.css";
import Leaflet from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = Leaflet.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

Leaflet.Marker.prototype.options.icon = DefaultIcon;

const isRTL = (text) => {
  const rtlChar = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
  return rtlChar.test(text);
};

export default function TitleAndSubtitleCard({
  title,
  subtitle,
  isOnline,
  forWhat,
  center,
}) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const textAlign = isRTL(subtitle) ? "right" : "left";

  const handelLocation = () => (
    <Box>
      <Accordion
        expanded={expanded}
        onChange={handleChange}
        sx={{ boxShadow: "none" }}
      >
        <AccordionSummary
          sx={{
            justifyContent: "flex-start",
            gap: "3px",
            "& .MuiAccordionSummary-content": {
              flexGrow: 0,
            },
            ml: 3,
          }}
          expandIcon={<ExpandMore />}
        >
          {expanded ? (
            <Typography
              variant="bode2"
              color="primary"
              sx={{ fontWeight: "bold", fontSize: "15px" }}
            >
              Hide Map
            </Typography>
          ) : (
            <Typography
              variant="bode2"
              color="primary"
              sx={{ fontWeight: "bold", fontSize: "15px " }}
            >
              Show Map
            </Typography>
          )}
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ width: "100%", height: "400px" }}>
            <MapContainer
              center={center}
              zoom={14}
              scrollWheelZoom={false}
              style={{ width: "100%", height: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={center}></Marker>
            </MapContainer>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );

  const handelRestriction = () => {
    const { allowedGender, minAge, maxAge } = subtitle;
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="body2" color="initial" sx={{ fontWeight: "bold" }}>
          This Event is Privete !
        </Typography>
        {allowedGender && (
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Gender : {allowedGender} is allowed
          </Typography>
        )}
        {minAge && (
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Age : Only Ages Between {minAge} - {maxAge} are allowed
          </Typography>
        )}
      </Box>
    );
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          width: "95%",
          minHeight: "100px",
          mt: 1,
          mb: "50px",
          ml: 0,
          p: 2,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          {title}
        </Typography>
        <Box display="flex" gap="17px">
          {forWhat == "date" && <DateRange />}
          {forWhat == "location" && <LocationOn />}
          {forWhat == "restriction" && <LockPerson />}

          {forWhat == "restriction" ? (
            handelRestriction()
          ) : (
            <Typography
              variant="h6"
              align={textAlign}
              component="pre"
              whiteSpace="pre-wrap"
              sx={{ fontWeight: "bold" }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
        {!isOnline && forWhat == "location" && handelLocation()}
      </Paper>
    </>
  );
}
