import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function SearchMap({ handleEventLocations }) {
  const [defaultPosition, setDefaultPosition] = useState([31.900692, 35.20387]); // Default position before geolocation
  const positions = handleEventLocations();
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setDefaultPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        height: "98%",
      }}
    >
      <MapContainer
        key={defaultPosition.toString()}
        center={defaultPosition}
        zoom={8}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {positions?.map((position) => (
          <Marker position={position} key={position.id}>
            <Popup>{position.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
}
