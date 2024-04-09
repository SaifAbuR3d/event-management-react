import { useField, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

export default function MapComponent({ name }) {
  const [, , { setValue: latSetValue }] = useField("lat");
  const [, , { setValue: lonSetValue }] = useField("lon");

  const [defaultPosition, setDefaultPosition] = useState([51.505, -0.09]); // Default position before geolocation

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
    <>
      <MapContainer
        key={defaultPosition.toString()}
        center={defaultPosition}
        zoom={10}
        style={{ height: "400px", marginBottom: "15px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker latSetValue={latSetValue} lonSetValue={lonSetValue} />
      </MapContainer>
    </>
  );
}

function LocationMarker({ latSetValue, lonSetValue }) {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      latSetValue(e.latlng.lat);
      lonSetValue(e.latlng.lng);
    },
  });

  return position ? (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  ) : null;
}
