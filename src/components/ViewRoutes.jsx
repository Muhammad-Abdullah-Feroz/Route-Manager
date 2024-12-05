import axios from "axios";
import React, { useEffect, useState } from "react";
import SpanLoader from "./SpanLoader";

// Sample Route Data (Dummy Data)
// const routeData = [
//   {
//     routeNo: "01",
//     driver: "John Doe",
//     busNo: "B123",
//     stops: ["Stop A", "Stop B", "Stop C"],
//     schedule: "9:00 AM - 5:00 PM",
//     currentStop: "Stop A",
//   },
//   {
//     routeNo: "02",
//     driver: "Jane Smith",
//     busNo: "B456",
//     stops: ["Stop D", "Stop E", "Stop F"],
//     schedule: "8:00 AM - 4:00 PM",
//     currentStop: "Stop D",
//   },
//   {
//     routeNo: "03",
//     driver: "Alice Johnson",
//     busNo: "B789",
//     stops: ["Stop G", "Stop H", "Stop I"],
//     schedule: "7:00 AM - 3:00 PM",
//     currentStop: "Stop G",
//   },
//   {
//     routeNo: "04",
//     driver: "Bob Brown",
//     busNo: "B101",
//     stops: ["Stop J", "Stop K", "Stop L"],
//     schedule: "10:00 AM - 6:00 PM",
//     currentStop: "Stop J",
//   },
//   {
//     routeNo: "05",
//     driver: "Charlie Lee",
//     busNo: "B202",
//     stops: ["Stop M", "Stop N", "Stop O"],
//     schedule: "6:00 AM - 2:00 PM",
//     currentStop: "Stop M",
//   },
//   {
//     routeNo: "06",
//     driver: "David King",
//     busNo: "B303",
//     stops: ["Stop P", "Stop Q", "Stop R"],
//     schedule: "7:30 AM - 4:30 PM",
//     currentStop: "Stop P",
//   },
//   {
//     routeNo: "07",
//     driver: "Emily Clark",
//     busNo: "B404",
//     stops: ["Stop S", "Stop T", "Stop U"],
//     schedule: "8:30 AM - 5:30 PM",
//     currentStop: "Stop S",
//   },
//   {
//     routeNo: "08",
//     driver: "Frank White",
//     busNo: "B505",
//     stops: ["Stop V", "Stop W", "Stop X"],
//     schedule: "9:00 AM - 5:00 PM",
//     currentStop: "Stop V",
//   },
//   {
//     routeNo: "09",
//     driver: "Grace Green",
//     busNo: "B606",
//     stops: ["Stop Y", "Stop Z", "Stop A1"],
//     schedule: "10:00 AM - 6:00 PM",
//     currentStop: "Stop Y",
//   },
//   {
//     routeNo: "10",
//     driver: "Henry Blue",
//     busNo: "B707",
//     stops: ["Stop B1", "Stop C1", "Stop D1"],
//     schedule: "6:30 AM - 2:30 PM",
//     currentStop: "Stop B1",
//   },
// ];

const RouteDetails = () => {
  const [expandedRoute, setExpandedRoute] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [routeData, setRouteData] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch Route Data from API
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/route`
      );
      
      // if (response.data.success) {
        setRouteData(response.data.data);
        console.log(response.data);
        setIsLoading(false);
      // }
    } catch (error) {
      console.error("Error fetching route data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const toggleRoute = (routeNo) => {
    setExpandedRoute((prev) => (prev === routeNo ? null : routeNo)); // Toggle expansion
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Available Routes</h2>
      {isLoading ? (
        <SpanLoader />
      ) : (
        <>
          {/* Display Route List */}
          <div className="space-y-4">
            {routeData && routeData.length>0 && routeData.map((route) => (
              <div
                key={route._id}
                className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
              >
                {/* Route Header */}
                <div
                  onClick={() => toggleRoute(route._id)}
                  className="cursor-pointer flex justify-between items-center"
                >
                  <div>
                    <h3 className=" font-semibold">
                      Route name : <span className="font-light text-lg">{route.route_no}</span>
                    </h3>
                    <p>Driver: <span className="font-light text-lg">{route.driver.value}</span> </p>
                    <p>Bus No: <span className="font-light text-lg">{route.vehicle_no}</span> </p>
                    
                    <p>Driver Ph_no: <span className="font-light text-lg">{route.driver.phone}</span> </p>
                  </div>
                  <div className="text-2xl font-bold">
                    {expandedRoute === route._id ? "-" : "+"}
                  </div>
                </div>

                {/* Expanded Details with Transition */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    expandedRoute === route._id
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="mt-4 bg-white text-black p-4 rounded-lg shadow-lg">
                  <h5 className="mb-1 text-sm text-gray-900 font-medium  px-2.5 py-1.5 border-b border-gray-200">
                                All Stops
                              </h5>
                              <p className="text-sm text-gray-600 font-normal px-5 py-3">
                                <ul>
                                    {route.stops.map((stop) => (
                                        <li key={stop.value} className="list-disc list-inside">{stop.label}</li>
                                    ))}
                                </ul>
                                {/* {complaint.complaint_description} */}
                              </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RouteDetails;
