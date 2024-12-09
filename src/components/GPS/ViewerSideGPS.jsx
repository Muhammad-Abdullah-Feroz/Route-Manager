import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
// import io from "socket.io-client";
import { messageToastError } from "../../handlers/messageToast";
import markerPng from "../../assets/marker.png";
import stopMarker from "../../assets/stop-marker.png";
import { BiRefresh } from "react-icons/bi";
import SpanLoader from "../SpanLoader";
import { TbMapSearch } from "react-icons/tb";
import axios from "axios";
import Pusher from "pusher-js";
import RouteModal from "./DisplayRoutesListModal";
import { FaMapMarkerAlt } from "react-icons/fa";

// Custom marker icons
const customMarkerIcon = new L.Icon({
  iconUrl: markerPng,
  iconSize: [60, 60],
  iconAnchor: [17, 45],
  popupAnchor: [1, -34],
});
const customMarkerIcon2 = new L.Icon({
  iconUrl: stopMarker,
  iconSize: [60, 60],
  iconAnchor: [17, 45],
  popupAnchor: [1, -34],
});
const Viewer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [routeArray, setRouteArray] = useState([]);
  const [stopsArray, setStopsArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [routesPassingThrough, setRoutesPassingThrough] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    FetchStopsdata();
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
      cluster: import.meta.env.VITE_PUSHER_CLUSTER,
    });
    const channel = pusher.subscribe("location-channel");
    channel.bind("location-update", (data) => {
      if (data) {
        setRouteArray(data);
      }
    });
    setIsLoading(false);

    // Cleanup on component unmount
    return () => {
      pusher.unsubscribe("location-channel");
      pusher.disconnect();
    };
  }, []);

  const FetchStopsdata = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/stop`
      );
      // console.log(response.data.data, "response");
      if (response.data.success) {
        setStopsArray(response.data.data);

        setIsLoading(false);
      } else {
        messageToastError("something went wrong");
      }
    } catch (error) {
      messageToastError("something went wrong");
    }
  };
  const filteredStops = stopsArray.filter((stop) =>
    stop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSuggestionClick = async (stop) => {
    MapCenter(stop.latitude, stop.longitude);
    console.log(stop, "stop");
    // set
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCAL_BACKEND_URL}/api/routes-by-stop/${
          stop._id
        }`
      );
      console.log(response.data, "response");
      if (response.data.success) {
        setRoutesPassingThrough(response.data.routes);
        setIsModalOpen(true);
      } else {
        messageToastError("something went wrong");
      }
    } catch (error) {
      messageToastError("something went wrong");
    }
    // MapCenter(stop.latitude, stop.longitude);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const MapCenter = (lat, long) => {
    setLocation({ latitude: lat, longitude: long });
  };
  return (
    <>
      <div className="relative h-[89vh] w-[90.2vw] overflow-hidden">
        <div className="absolute right-0 top-0  z-50">
          <button
            onClick={() => {
              FetchStopsdata();
            }}
            className="bg-blue-500 size-12 flex items-center justify-center text-white p-2 rounded-md"
          >
            <BiRefresh size={30} />
          </button>
        </div>

        <div className="absolute top-4 left-14 z-10">
          <TbMapSearch
            className="absolute left-2 top-[10px] text-gray-500 border-r-2 pr-2 "
            size={30}
          />
          <input
            type="text"
            placeholder="Search stops or routes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 w-80 rounded-lg pl-12 text-gray-500 pr-3 font-light border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 focus:w-96"
            id=""
          />
          {searchQuery && (
            <div className="bg-white border border-gray-300 rounded-lg shadow-md mt-2 w-96 max-h-80 overflow-y-auto">
              {filteredStops.map((stop) => (
                <div
                  key={stop._id}
                  className="p-2 cursor-pointer hover:bg-blue-200 border-b flex items-center gap-2"
                  onClick={() => handleSuggestionClick(stop)}
                >
                  <span className="text-blue-600">
                    <FaMapMarkerAlt />
                  </span>
                  {stop.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <MapContainer
          center={[location.latitude, location.longitude]} // Default map center
          zoom={13}
          scrollWheelZoom={true}
          id="MPCONATINER"
          className=" relative h-full w-full z-0"
        >
          {isLoading ? (
            <SpanLoader />
          ) : (
            <>
              {" "}
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {/* Render markers for each driver's location */}
              {filteredStops &&
                filteredStops.length > 0 &&
                filteredStops.map((stop) => (
                  <Marker
                    key={stop._id}
                    position={[stop.latitude, stop.longitude]}
                    icon={customMarkerIcon2}
                    eventHandlers={{
                      mouseover: (e) => {
                        e.target.openPopup();
                      },
                      mouseout: (e) => {
                        e.target.closePopup();
                      },
                    }}
                  >
                    <Popup>
                      <p className="text-md font-semibold">
                        Stop name:{" "}
                        <span className="font-light">{stop.name}</span>
                      </p>
                    </Popup>
                  </Marker>
                ))}
              {routeArray &&
                routeArray.length > 0 &&
                routeArray.map((route) => (
                  <Marker
                    key={route.id}
                    position={[
                      route.location.latitude,
                      route.location.longitude,
                    ]}
                    icon={customMarkerIcon}
                    eventHandlers={{
                      mouseover: (e) => {
                        e.target.openPopup();
                      },
                      mouseout: (e) => {
                        e.target.closePopup();
                      },
                    }}
                  >
                    <Popup>
                      <p className="text-md font-semibold">
                        Route name:{" "}
                        <span className="font-light">{route.name}</span>
                      </p>
                    </Popup>
                  </Marker>
                ))}
            </>
          )}
        </MapContainer>
      </div>

      <RouteModal
        routes={routesPassingThrough}
        onClose={handleCloseModal}
        showModal={isModalOpen}
      />
    </>
  );
};

export default Viewer;
