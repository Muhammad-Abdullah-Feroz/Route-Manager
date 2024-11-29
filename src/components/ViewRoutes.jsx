import React, { useState } from 'react';

// Sample Route Data (Dummy Data)
const routeData = [
  {
    routeNo: "101",
    driver: "John Doe",
    busNo: "B123",
    stops: ["Stop A", "Stop B", "Stop C"],
    schedule: "9:00 AM - 5:00 PM",
    currentStop: "Stop A",
  },
  {
    routeNo: "102",
    driver: "Jane Smith",
    busNo: "B456",
    stops: ["Stop D", "Stop E", "Stop F"],
    schedule: "8:00 AM - 4:00 PM",
    currentStop: "Stop D",
  },
  // Add more routes as needed
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
