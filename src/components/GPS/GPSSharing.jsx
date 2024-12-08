import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import io from "socket.io-client";
import { messageToastError } from "../../handlers/messageToast";
import markerPng from '../../assets/marker.png'

const SOCKET_SERVER_URL = import.meta.env.VITE_BACKEND_URL;

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
  const [socket, setSocket] = useState(null);
  const [location, setLocation] = useState({ latitude: 31.6943, longitude: 74.2472 });
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      messageToastError("Token not found in localStorage. Please login again.");
      return;
    }

    // Initialize socket connection
    const newSocket = io(SOCKET_SERVER_URL, {
      transports: ["websocket"],
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to server");
      newSocket.emit("driver_id", { token });
    });

    newSocket.on("error", (error) => {
      console.error("Socket error:", error);
      messageToastError("Socket connection error.");
    });

    return () => {
      newSocket.disconnect();
    };
  }, [token]);

  useEffect(() => {
    if (!socket) return;

    let intervalId;

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            // Only update if location changes
            if (
              location.latitude !== latitude ||
              location.longitude !== longitude
            ) {
              setLocation({ latitude, longitude });
              console.log("Sending location:", { token, location: { latitude, longitude } });
              socket.emit("driverLocation", { token, location: { latitude, longitude } });
            }
          },
          (error) => {
            console.error("Error fetching location:", error);
            messageToastError("Error fetching location.");
          },
          { enableHighAccuracy: true }
        );
      } else {
        messageToastError("Geolocation is not supported by this browser.");
      }
    };

    // Update location every 5 to 7 seconds
    intervalId = setInterval(updateLocation, Math.random() * (7000 - 5000) + 5000);

    return () => {
      clearInterval(intervalId); // Clean up interval on unmount
    };
  }, [socket, location, token]);

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
