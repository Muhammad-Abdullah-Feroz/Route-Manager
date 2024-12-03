import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {  useNavigate } from "react-router-dom";
import ManageRoutes from "./ManageRoutes"; // Your ManageRoutes component
// import ManageDrivers from './ManageDrivers'; // Your ManageDrivers component
import ManageStops from "./ManageStops"; // Your ManageStops component
import ManageComplaints from "./ManageComplaints"; // Your ManageComplaints component
import ManageDriversContainer from "./ManageDriversContainer";
import { IoBusOutline, IoLogOutOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { MdLogout, MdOutlineDirectionsBus, MdOutlineManageHistory } from "react-icons/md";
import { BiLogOut, BiSolidLogOut } from "react-icons/bi";
import { FaPerson } from "react-icons/fa6";
import { BsStoplights } from "react-icons/bs";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { AiOutlineDashboard } from "react-icons/ai";

const AdminPanel = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [selectedView, setSelectedView] = useState(""); // state to track selected view
    // Function to handle sidebar item click and change selected view
  const handleSidebarClick = (view) => {
    setSelectedView(view);
  };

  return (
   
        <div className="h-screen overflow-hidden flex flex-col bg-gray-100">
          {/* Navbar */}
          <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
          <div className="logo text-2xl font-extrabold text-white drop-shadow-lg">
                    Admin Panel
                </div>
            <nav className="flex space-x-4">
              <button
                className="flex items-center gap-1 bg-white font-bold text-blue-600 border-2 border-blue-600 py-2 px-4 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() => navigate("/")}
              >
                <BiLogOut />
                Logout
              </button>
            </nav>
          </header>

          {/* Main Content */}
          <div className="flex flex-1 overflow-x-auto">
           
            <aside
              className={`relative mr-10 bg-gradient-to-b from-blue-800 via-blue-600 to-blue-600 text-white h-full transition-all duration-300 ${
                isSidebarExpanded ? "w-56" : "w-16"
              }`}
            >
              <button
                className=" absolute -right-7 top-3 flex items-center my-2 gap-2"
                onClick={()=>setIsSidebarExpanded(!isSidebarExpanded)}
              >
                {isSidebarExpanded ? (
                  <GoSidebarExpand
                    size={22}
                    className="text-blue-600 font-extrabold"
                  />
                ) : (
                  <GoSidebarCollapse
                    size={22}
                    className="text-blue-600 font-extrabold"
                  />
                )}
              </button>
              <nav className="mt-4">
                <ul>
                  <li
                    onClick={() => handleSidebarClick("dashboard")}
                    className={`cursor-pointer p-2 my-1 mx-3 rounded-md ${
                      isSidebarExpanded ? "" : "my-[20px]"
                    }  hover:bg-blue-400`}
                  >
                    <button className="flex items-center gap-2">
                      <AiOutlineDashboard
                        className={`${isSidebarExpanded ? "size-4" : "size-6"}`}
                      />
                      {isSidebarExpanded && <span>Dashboard</span>}
                    </button>
                  </li>
                  <li
                    onClick={() => handleSidebarClick("manage-routes")}
                    className={`cursor-pointer p-2 my-1 mx-3 rounded-md ${
                      isSidebarExpanded ? "" : "my-[20px]"
                    }  hover:bg-blue-400`}
                  >
                    <button className="flex items-center gap-2">
                      <MdOutlineDirectionsBus 
                        className={`${isSidebarExpanded ? "size-4" : "size-6"}`}
                      />
                      {isSidebarExpanded && <span> Routes</span>}
                    </button>
                  </li>
                  <li
                    onClick={() => handleSidebarClick("manage-drivers")}
                    className={`cursor-pointer p-2 my-1 mx-3 rounded-md ${
                      isSidebarExpanded ? "" : "my-[20px]"
                    }  hover:bg-blue-400`}
                  >
                    <button className="flex items-center  gap-2">
                      {" "}
                      <FaPerson
                        className={`${isSidebarExpanded ? "size-4" : "size-6"}`}
                      />
                      {isSidebarExpanded && <span> Drivers</span>}
                    </button>
                  </li>
                  <li
                    onClick={() => handleSidebarClick("manage-stops")}
                    className={`cursor-pointer p-2 my-1 mx-3 rounded-md ${
                      isSidebarExpanded ? "" : "my-[20px]"
                    }  hover:bg-blue-400`}
                  >
                    <button className="flex items-center gap-2">
                      <BsStoplights
                        className={`${isSidebarExpanded ? "size-4" : "size-6"}`}
                      />
                      {isSidebarExpanded && <span> Stops</span>}
                    </button>
                  </li>
                  <li
                    onClick={() => handleSidebarClick("manage-complaints")}
                    className={`cursor-pointer p-2 my-1 mx-3 rounded-md ${
                      isSidebarExpanded ? "" : "my-[20px]"
                    }  hover:bg-blue-400`}
                  >
                    <button className="flex items-center  gap-2">
                      <MdOutlineManageHistory
                        className={`${isSidebarExpanded ? "size-4" : "size-6"}`}
                      />
                      {isSidebarExpanded && <span>Complaints</span>}
                    </button>
                  </li>
                  <li
                    onClick={() => handleLogout()}
                    className={`cursor-pointer p-2 my-1 mx-3 rounded-md ${
                      isSidebarExpanded ? "" : "my-[20px]"
                    }  hover:bg-blue-400`}
                  >
                    <button className="flex items-center gap-2">
                      <BiLogOut
                        className={`${isSidebarExpanded ? "size-4" : "size-6"}`}
                      />
                      {isSidebarExpanded && <span>Logout</span>}
                    </button>
                  </li>
                </ul>
              </nav>
            </aside>

            {/* Dashboard Content */}
            <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
              {/* Conditionally render content based on selected view */}
              {selectedView === "manage-routes" && <ManageRoutes />}
              {selectedView === "manage-drivers" && <ManageDriversContainer />}
              {selectedView === "manage-stops" && <ManageStops />}
              {selectedView === "manage-complaints" && <ManageComplaints />}
            </main>
          </div>
        </div>
      
  );
};

export default AdminPanel;
