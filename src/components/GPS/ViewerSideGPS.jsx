import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import io from "socket.io-client";

import markerPng from "../../assets/marker.png";
import { BiRefresh } from "react-icons/bi";
import SpanLoader from "../SpanLoader";
import { TbMapSearch } from "react-icons/tb";

const SOCKET_SERVER_URL = import.meta.env.VITE_BACKEND_URL;

// Custom marker icons
const customMarkerIcon = new L.Icon({
  iconUrl: markerPng, // URL for custom marker
  iconSize: [60, 60], // Size of the icon [width, height]
  iconAnchor: [17, 45], // Point of the icon that corresponds to marker's location
  popupAnchor: [1, -34], // Point where the popup should open relative to the iconAnchor
});
const Viewer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [socket, setSocket] = useState(null);
  const [routeArray, setRouteArray] = useState([]);

  useEffect(() => {
    // Connect to the socket server
    const newSocket = io(SOCKET_SERVER_URL, {
      transports: ["websocket"],
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to server");
    });

    // Receive routeArray updates from the backend
    newSocket.on("sendLoactionToViewer", (updatedRouteArray) => {
      console.log("Received routeArray:", updatedRouteArray);
      setRouteArray(updatedRouteArray);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);
  const loadingForGivenTime = (t) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, t);
  };

  return (
    <div className="relative h-[89vh] w-[90.2vw] overflow-hidden">
      <div className="absolute right-0 top-0  z-50">
        <button
          onClick={() => {
            socket.emit("getRouteArray");
            loadingForGivenTime(2000);
          }}
          className="bg-blue-500 size-12 flex items-center justify-center text-white p-2 rounded-md"
        >
          <BiRefresh size={30} />
        </button>
      </div>
      <div className="form absolute z-50 mt-3 left-[20%]">
        <div className="relative lg:w-[25vw] mb-2">
          <TbMapSearch
            className="absolute left-2 top-[10px] text-gray-500 border-r-2 pr-2 "
            size={30}
          />
          <input
            type="search"
            name=""
            className="h-12 w-full rounded-lg pl-12 text-gray-500 pr-3"
            id=""
          />
        </div>
        {/* <div className="relative lg:w-[25vw] ">
          <div
            name=""
            className="h-12 w-full rounded-lg pl-12 bg-white text-gray-500 pr-3"
            id=""
          ></div>
        </div> */}
      </div>
      <MapContainer
        center={[31.6943, 74.2472]} // Default map center
        zoom={13}
        scrollWheelZoom={true}
        className="relative h-full w-full z-0"
      >
        {isLoading ? (
          <SpanLoader />
        ) : (
          <>
            {" "}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* Render markers for each driver's location */}
            {routeArray.map((route, index) => (
              <Marker
                key={route.driver_id}
                position={[route.location.latitude, route.location.longitude]}
                icon={customMarkerIcon}
              >
                {/* <p */}
                <Popup>
                  <p className="text-lg font-semibold">
                    Route: <span className="font-light">{route.name}</span>
                  </p>
                  {/* Latitude: {route.location.latitude}, Longitude: {route.location.longitude} */}
                </Popup>
              </Marker>
            ))}
          </>
        )}

        {/* } */}
      </MapContainer>
    </div>
  );
};

export default Viewer;
