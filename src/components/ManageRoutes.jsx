import React, { useEffect, useState } from "react";
import AddRouteForm from "./AddRouteForm";
import EditRouteForm from "./EditRouteForm";
import { BiEditAlt } from "react-icons/bi";
import axios from "axios";

// Route Management Component
const ManageRoutes = () => {
  const [StopsData, setStopsData] = useState([]);
  const [DriversData, setDriversData] = useState([]);
  const [activeComponent, setActiveComponent] = useState("list"); // Controls which component to show
  const [selectedRoute, setSelectedRoute] = useState(null); // Holds data for the selected route

  // Sample route data (could be dynamic from an API)
  const routes = [
    {
      id: 1,
      route_no: "Route 1",
      vehicle_no: "123",
      driver: "John Doe", // Driver's name
      stops: [
        { name: "Stop 1", latitude: 33.6844, longitude: 73.0479 },
        { name: "Stop 2", latitude: 33.6845, longitude: 73.048 },
      ],
    },
    {
      id: 2,
      route_no: "Route 2",
      vehicle_no: "456",
      driver: "Jane Smith",
      stops: [
        { name: "Stop A", latitude: 33.685, longitude: 73.049 },
        { name: "Stop B", latitude: 33.6851, longitude: 73.0491 },
      ],
    },
    {
      id: 3,
      route_no: "Route 3",
      vehicle_no: "789",
      driver: "Mike Johnson",
      stops: [
        { name: "Stop X", latitude: 33.686, longitude: 73.05 },
        { name: "Stop Y", latitude: 33.6861, longitude: 73.0501 },
      ],
    },
    {
      id: 4,
      route_no: "Route 4",
      vehicle_no: "1011",
      driver: "Sarah Lee",
      stops: [
        { name: "Stop Alpha", latitude: 33.687, longitude: 73.051 },
        { name: "Stop Beta", latitude: 33.6871, longitude: 73.0511 },
      ],
    },
    {
      id: 5,
      route_no: "Route 5",
      vehicle_no: "1213",
      driver: "Chris Brown",
      stops: [
        { name: "Stop 1A", latitude: 33.688, longitude: 73.052 },
        { name: "Stop 2A", latitude: 33.6881, longitude: 73.0521 },
      ],
    },
    {
      id: 6,
      route_no: "Route 6",
      vehicle_no: "1415",
      driver: "Emma Wilson",
      stops: [
        { name: "Stop Z", latitude: 33.689, longitude: 73.053 },
        { name: "Stop W", latitude: 33.6891, longitude: 73.0531 },
      ],
    },
    {
      id: 7,
      route_no: "Route 7",
      vehicle_no: "1617",
      driver: "Lucas Green",
      stops: [
        { name: "Stop 1B", latitude: 33.69, longitude: 73.054 },
        { name: "Stop 2B", latitude: 33.6901, longitude: 73.0541 },
      ],
    },
    {
      id: 8,
      route_no: "Route 8",
      vehicle_no: "1819",
      driver: "Olivia Black",
      stops: [
        { name: "Stop 1C", latitude: 33.691, longitude: 73.055 },
        { name: "Stop 2C", latitude: 33.6911, longitude: 73.0551 },
      ],
    },
    {
      id: 9,
      route_no: "Route 9",
      vehicle_no: "2021",
      driver: "Ethan Davis",
      stops: [
        { name: "Stop 3", latitude: 33.692, longitude: 73.056 },
        { name: "Stop 4", latitude: 33.6921, longitude: 73.0561 },
      ],
    },
    {
      id: 10,
      route_no: "Route 10",
      vehicle_no: "2223",
      driver: "Sophia Taylor",
      stops: [
        { name: "Stop 5", latitude: 33.693, longitude: 73.057 },
        { name: "Stop 6", latitude: 33.6931, longitude: 73.0571 },
      ],
    },
  ];
  const fetchStopsdata = async () => {
    try {
      console.log("fetching stops data");

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/stop`
      );
      if (res.data.success) {
        console.log(res.data.data);
        setStopsData(res.data.data);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const fetchDriversdata = async () => {
    console.log("fetching drivers data");

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_LOCAL_BACKEND_URL}/api/admin/driver/isAvailable`
      );
      if (res.data.success) {
        console.log(res.data.data);
        setDriversData(res.data.data);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    fetchStopsdata();
    fetchDriversdata();
    // Fetch data from an API and update the `routes` state
  }, []);

  const handleEdit = (route) => {
    setSelectedRoute(route);
    setActiveComponent("edit");
  };

  const handleAdd = () => {
    setSelectedRoute(null);
    setActiveComponent("add");
  };

  const handleBack = () => {
    setActiveComponent("list");
    setSelectedRoute(null);
  };

  // Rendered Content based on `activeComponent`
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {activeComponent === "list" && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-3xl text-center font-bold text-gray-800 mb-6">
            Route Management
          </h2>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300 mb-6"
          >
            Add New Route
          </button>
          <table className="w-full table-auto border-collapse">
            <thead className="text-lg">
              <tr className="bg-blue-600 text-white">
                <th className="py-3 px-4 text-center">Route #</th>
                <th className="py-3 px-4 text-center">Driver Name</th>
                <th className="py-3 px-4 text-center">Bus #</th>
                <th className="py-3 px-4 text-center">Stops</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route, index) => (
                <tr
                  key={route.id}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}
                >
                  <td className="py-3 px-4 text-center">{route.route_no}</td>
                  <td className="py-3 px-4 text-center">{route.driver}</td>
                  <td className="py-3 px-4 text-center">{route.vehicle_no}</td>
                  <td className="py-3 px-4 text-center">
                    {route.stops.length > 0
                      ? `${route.stops[0].name} - ${
                          route.stops[route.stops.length - 1].name
                        }`
                      : "No stops available"}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleEdit(route)}
                      className="bg-yellow-500 flex gap-1 items-center m-auto text-white py-2 px-4 rounded hover:bg-yellow-400 transition duration-300"
                    >
                      Edit <BiEditAlt className="text-white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {activeComponent === "add" && <AddRouteForm  stops={StopsData} driver={DriversData}  onBack={handleBack} />}
      {activeComponent === "edit" && (
        <EditRouteForm stops={StopsData} driver={DriversData} route={selectedRoute} onBack={handleBack} />
      )}
    </div>
  );
};

export default ManageRoutes;
