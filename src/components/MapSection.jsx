import { useEffect, useRef } from "react";
import leaflet from "leaflet";

export default function MapSection({ latitude, longitude, label }) {
  const mapforStopRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = leaflet
        .map(mapforStopRef.current)
        .setView([31.6404, 74.3587], 11);
      leaflet
        .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        })
        .addTo(mapInstanceRef.current);
    }

    // Update the marker
    if (markerRef.current) {
      markerRef.current.setLatLng([latitude, longitude]);
    } else {
      markerRef.current = leaflet
        .marker([latitude, longitude])
        .addTo(mapInstanceRef.current);
    }
    // Update the map view
    mapInstanceRef.current.setView([latitude, longitude], 14);

    // Update the marker popup
    markerRef.current.bindPopup(label).openPopup();
  }, [latitude, longitude, label]);

  return (
    <>
      <div
        id="mapForStop"
        ref={mapforStopRef}
        className="z-10 lg:h-[450px] h-80 w-full"
      ></div>
      <h2 className="text-lg font-bold">Location Details :</h2>
      <p>Name : {label} </p>
      <p>Latitude : {latitude}</p>
      <p>Longitude : {longitude}</p>
    </>
  );
}
