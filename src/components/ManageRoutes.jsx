import React, { useEffect, useState } from "react";
import AddRouteForm from "./AddRouteForm";
import EditRouteForm from "./EditRouteForm";
import { BiEditAlt } from "react-icons/bi";
import axios from "axios";
import SpanLoader from "./SpanLoader";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import { LuRefreshCcwDot } from "react-icons/lu";
import Modal from "./Modal";
import { MdDeleteOutline } from "react-icons/md";

// Route Management Component
const ManageRoutes = () => {
  const [StopsData, setStopsData] = useState([]);
  const [DriversData, setDriversData] = useState([]);
  const [loadingPage, setLoadingPage] = useState(false);
  const [activeComponent, setActiveComponent] = useState("list"); // Controls which component to show
  const [selectedRoute, setSelectedRoute] = useState(null); // Holds data for the selected route

  // Sample route data (could be dynamic from an API)
  const [routes, setRoutes] = useState([]);
  const fetchRoutes = async () => {
    setLoadingPage(true);
    try {
        
        const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/route`
        );
        console.log("fetching routes data");
        console.log(res);

      if (res.data.success) {
        console.log(res.data.data);
        setRoutes(res.data.data);
        setLoadingPage(false);
      }
    } catch (error) {
      console.log(error);

      console.log(error.response.data);
    }
  };

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
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/driver/isAvailable`
      );
      console.log(res.data.data);
      if (res.data.success) {
        setDriversData(res.data.data);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    fetchRoutes();
    fetchStopsdata();
    fetchDriversdata();
    // Fetch data from an API and update the `routes` state
  }, []);

  const handleEdit = (route) => {
    console.log("handle driver",route.driver);
    console.log("handle driver",DriversData);
    
    setDriversData([...DriversData,{_id:route.driver.value,username:route.driver.label}]);
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
    fetchRoutes()
    fetchDriversdata()
  };
  const [currentPage, setCurrentPage] = useState(1);
  const routesPerPage = 10;

  const indexOfLastRoute = currentPage * routesPerPage;
  const indexOfFirstRoute = indexOfLastRoute - routesPerPage;
  const currentRoutes = routes.slice(indexOfFirstRoute, indexOfLastRoute);

  const totalPages = Math.ceil(routes.length / routesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // Rendered Content based on `activeComponent`
  return (
    <div className="py-8 bg-gray-100 min-h-screen">
      {activeComponent === "list" && (
        <div className="bg-white rounded-lg shadow-md p-6 min-h-screen">
          <h2 className="text-3xl text-center font-bold text-gray-800 mb-6">
            Route Management
          </h2>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300 mb-6"
          >
            Add New Route
          </button>
          {loadingPage ? (
            <SpanLoader />
          ) : (
         
            <div className="w-full overflow-x-auto min-h-[70vh]">
              <table className="w-full table-auto border-collapse">
                <thead className="text-lg">
                  <tr className="bg-blue-600 text-white">
                  <th className="py-3 px-4 min-w-[100px] text-center">
                        #
                      </th>
                    <th className="py-3 px-4 text-center min-w-[200px]">Route </th>
                    <th className="py-3 px-4 text-center min-w-[200px]">Driver Name</th>
                    <th className="py-3 px-4 text-center min-w-[140px]">Bus #</th>
                    <th className="py-3 px-4 text-center min-w-[250px]">Stops</th>
                    
                    <th className="py-3 px-4 text-left w-[130px]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRoutes && currentRoutes.length>0 && currentRoutes.map((route, index) => (
                    <tr
                      key={route._id}
                      className={
                        index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                      }
                    >
                           <td className="py-3 px-4 min-w-[100px] text-center">
                          {(index + 1)+((currentPage-1)*7)}
                        </td>                    
                      <td className="py-3 px-4 text-center">
                        {route.route_no}
                      </td>
                      <td className="py-3 px-4 text-center">{route?.driver?.label}</td>
                      <td className="py-3 px-4 text-center">
                        {route.vehicle_no}
                      </td>
                      <td className="py-3 px-4 text-center">
                        
                      <div className=" group relative cursor-pointer">
                        <span>
                        {route?.stops?.length > 0
                          ? `${route.stops[0].label} - ${
                              route.stops[route.stops.length - 1].label
                            }`
                          : "No stops available"}
                          </span>
                          <div className="w-72  mb-2  text-left absolute hidden group-hover:block border border-gray-200   left-1/2 -translate-x-1/2   z-10  bg-white text-sm text-gray-600 rounded-xl shadow-md">
                              <h5 className="mb-1 text-sm text-gray-900 font-medium  px-5 py-3 border-b border-gray-200">
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
                      </td>
                      <td className="py-5 relative my-auto px-4 flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(route)}
                          className="bg-yellow-500 flex gap-1 items-center m-auto text-white py-2 px-4 rounded hover:bg-yellow-400 transition duration-300"
                        >
                           <BiEditAlt className="text-white" />
                        </button>
                        <Modal
                            requestData={{ route_id: route._id }}
                            apikey={`${
                              import.meta.env.VITE_BACKEND_URL
                            }/api/admin/route/delete`}
                            action={"delete"}
                            ActionBtnText={"Delete Route"}
                            displayBtnText={
                              <div className=" flex gap-1 items-center">
                                <MdDeleteOutline className="text-white" />
                                
                              </div>
                            }
                            title={"Delete Route"}
                            children={
                              <>
                                Are you sure you want to delete the route Details ?
                                All of your data will be{" "}
                                <strong>permanently removed.</strong> This
                                action cannot be<strong> undone.</strong>
                              </>
                            }
                            reFetchData={fetchRoutes}
                          />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
              <div className="flex justify-between items-center mt-4 p-4 bg-white shadow relative bottom-0 left-0 right-0 ">
            {/* Refresh Button */}
            <button
              onClick={fetchRoutes}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              <LuRefreshCcwDot className="text-white" />
              Refresh
            </button>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 transition duration-300'}`}
              >
                <GrChapterPrevious />
              </button>
              <span className="px-4 py-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className={`px-4 py-2 rounded ${currentPage >= totalPages ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 transition duration-300'}`}
              >
                <GrChapterNext />
              </button>
            </div>
          </div>
        </div>
      )}
      {activeComponent === "add" && (
        <AddRouteForm
          stops={StopsData}
          drivers={DriversData}
          onBack={handleBack}
        />
      )}
      {activeComponent === "edit" && (
        <EditRouteForm
          stops={StopsData}
          drivers={DriversData}
          route={selectedRoute}
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default ManageRoutes;
