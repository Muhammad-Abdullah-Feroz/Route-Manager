import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
// import io from "socket.io-client";
// import { messageToastError } from "../../handlers/messageToast";
import markerPng from '../../assets/marker.png'
import axios from "axios";

// const SOCKET_SERVER_URL = import.meta.env.VITE_BACKEND_URL;

// Custom marker icons
const customMarkerIcon = new L.Icon({
    iconUrl: markerPng,// URL for custom marker
    iconSize: [60, 60], // Size of the icon [width, height]
    iconAnchor: [17, 45], // Point of the icon that corresponds to marker's location
    popupAnchor: [1, -34], // Point where the popup should open relative to the iconAnchor
  });
// Fix for default marker icon issue with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const UpdateMapCenter = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([location.latitude, location.longitude], map.getZoom());
  }, [location, map]);

  return null;
};

const GPSSharing = () => {
  const [location, setLocation] = useState({ latitude: 31.6943, longitude: 74.2472 });
  // const [error, setError] = useState(null);

  useEffect(() => {
    let watchId;

    // Function to send location updates to the backend
    const sendLocationUpdate = async(location) => {
      const repsonse=await axios.post(import.meta.env.VITE_BACKEND_URL, { token: localStorage.getItem("token"), location })
      console.log(repsonse,"respoint");
      
      if(repsonse.status == 200) {
        console.log("Location updated successfully");
      } else {
        console.error("Error updating location");
      }
   
    }


    // Function to get live location using Geolocation API
    const startTracking = () => {
      if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const newLocation = { latitude, longitude };
            setLocation(newLocation);
            sendLocationUpdate(newLocation);
          },
          (err) => {
            setError(err.message);
            console.error("Error fetching location:", err.message);
          },
          { enableHighAccuracy: true, maximumAge: 0 }
        );
      } else {
        setError("Geolocation is not supported by your browser.");
      }
    };

    startTracking();

    // Cleanup geolocation watch on component unmount
    return () => {
      if (navigator.geolocation && watchId !== undefined) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return (
    <div className="h-screen w-screen">
      <MapContainer
        center={[location.latitude, location.longitude]}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full "
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[location.latitude, location.longitude]}      
          icon={customMarkerIcon}>
          <Popup>
            Current Location: Latitude: {location.latitude}, Longitude: {location.longitude}
          </Popup>
        </Marker>
        <UpdateMapCenter location={location} />
      </MapContainer >
    </div>
  );
};

export default GPSSharing;
