import { useEffect, useState } from "react";
import { useField } from "formik";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";


const Search = ({ provider, latSetValue, lonSetValue }) => {
  const map = useMap();

  useEffect(() => {
    const searchControl = new GeoSearchControl({
      provider: provider,
      style: "button",
      autoComplete: true,
      showMarker: false, // you can customize this
      showPopup: false, // whether to show a popup after search
      marker: {
        draggable: true,
      },
      popupFormat: ({ query, result }) => result.label, // customize popup text
    });

    map.addControl(searchControl);

    // Event listener for selecting a search result
    map.on("geosearch/showlocation", (result) => {
      latSetValue(result.location.y); // Latitude
      lonSetValue(result.location.x); // Longitude
    });

    return () => {
      map.removeControl(searchControl);
      map.off("geosearch/showlocation");
    };
  }, [map, provider, latSetValue, lonSetValue]);

  return null;
};

export default function MapComponent() {
  const [{ value: latValue }, , { setValue: latSetValue }] = useField("lat");
  const [{ value: lonValue }, , { setValue: lonSetValue }] = useField("lon");
  const [defaultPosition, setDefaultPosition] = useState([
    31.90359838023908, 35.2035646215093,
  ]);

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
  }, [latSetValue, lonSetValue]);

  return (
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
      <LocationMarker
        latSetValue={latSetValue}
        lonSetValue={lonSetValue}
        latValue={latValue}
        lonValue={lonValue}
      />
      <Search
        provider={new OpenStreetMapProvider()}
        latSetValue={latSetValue}
        lonSetValue={lonSetValue}
      />
    </MapContainer>
  );
}

function LocationMarker({ latSetValue, lonSetValue, latValue, lonValue }) {
  const map = useMap();
  const [position, setPosition] = useState(
    { lat: latValue, lng: lonValue } || null
  );
  map.on("click", (e) => {
    setPosition(e.latlng);
    latSetValue(e.latlng.lat);
    lonSetValue(e.latlng.lng);
  });

  return position ? (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  ) : null;
}
