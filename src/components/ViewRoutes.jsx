import React, { useState } from 'react';

// Sample Route Data (Dummy Data)
const routeData = [
  {
    routeNo: "01",
    driver: "John Doe",
    busNo: "B123",
    stops: ["Stop A", "Stop B", "Stop C"],
    schedule: "9:00 AM - 5:00 PM",
    currentStop: "Stop A",
  },
  {
    routeNo: "02",
    driver: "Jane Smith",
    busNo: "B456",
    stops: ["Stop D", "Stop E", "Stop F"],
    schedule: "8:00 AM - 4:00 PM",
    currentStop: "Stop D",
  },
  {
    routeNo: "03",
    driver: "Alice Johnson",
    busNo: "B789",
    stops: ["Stop G", "Stop H", "Stop I"],
    schedule: "7:00 AM - 3:00 PM",
    currentStop: "Stop G",
  },
  {
    routeNo: "04",
    driver: "Bob Brown",
    busNo: "B101",
    stops: ["Stop J", "Stop K", "Stop L"],
    schedule: "10:00 AM - 6:00 PM",
    currentStop: "Stop J",
  },
  {
    routeNo: "05",
    driver: "Charlie Lee",
    busNo: "B202",
    stops: ["Stop M", "Stop N", "Stop O"],
    schedule: "6:00 AM - 2:00 PM",
    currentStop: "Stop M",
  },
  {
    routeNo: "06",
    driver: "David King",
    busNo: "B303",
    stops: ["Stop P", "Stop Q", "Stop R"],
    schedule: "7:30 AM - 4:30 PM",
    currentStop: "Stop P",
  },
  {
    routeNo: "07",
    driver: "Emily Clark",
    busNo: "B404",
    stops: ["Stop S", "Stop T", "Stop U"],
    schedule: "8:30 AM - 5:30 PM",
    currentStop: "Stop S",
  },
  {
    routeNo: "08",
    driver: "Frank White",
    busNo: "B505",
    stops: ["Stop V", "Stop W", "Stop X"],
    schedule: "9:00 AM - 5:00 PM",
    currentStop: "Stop V",
  },
  {
    routeNo: "09",
    driver: "Grace Green",
    busNo: "B606",
    stops: ["Stop Y", "Stop Z", "Stop A1"],
    schedule: "10:00 AM - 6:00 PM",
    currentStop: "Stop Y",
  },
  {
    routeNo: "10",
    driver: "Henry Blue",
    busNo: "B707",
    stops: ["Stop B1", "Stop C1", "Stop D1"],
    schedule: "6:30 AM - 2:30 PM",
    currentStop: "Stop B1",
  },
];


const RouteDetails = () => {
  const [expandedRoute, setExpandedRoute] = useState(null);

  const toggleRoute = (routeNo) => {
    setExpandedRoute((prev) => (prev === routeNo ? null : routeNo)); // Toggle expansion
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Available Routes</h2>

      {/* Display Route List */}
      <div className="space-y-4">
        {routeData.map((route) => (
          <div
            key={route.routeNo}
            className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {/* Route Header */}
            <div
              onClick={() => toggleRoute(route.routeNo)}
              className="cursor-pointer flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold">Route #{route.routeNo}</h3>
                <p>Driver: {route.driver}</p>
                <p>Bus No: {route.busNo}</p>
              </div>
              <div className="text-2xl font-bold">
                {expandedRoute === route.routeNo ? "-" : "+"}
              </div>
            </div>

            {/* Expanded Details with Transition */}
            <div
              className={`overflow-hidden transition-all duration-500 ${
                expandedRoute === route.routeNo ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="mt-4 bg-white text-black p-4 rounded-lg shadow-lg">
                <p><strong>Current Stop:</strong> {route.currentStop}</p>
                <p><strong>All Stops:</strong> {route.stops.join(", ")}</p>
                <p><strong>Schedule:</strong> {route.schedule}</p>
                <p><strong>Driver:</strong> {route.driver}</p>
                <p><strong>Bus No:</strong> {route.busNo}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteDetails;
