import React, { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import SpanLoader from "./SpanLoader";
import { LuRefreshCcwDot } from "react-icons/lu";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import { BsDot } from "react-icons/bs";
const ManageDrivers = ({ isLoading, drivers, onAddDriver, onEditDriver,FetchData }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const driversPerPage = 8;
  
    const indexOfLastDriver = currentPage * driversPerPage;
    const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
    const currentDrivers = drivers.slice(indexOfFirstDriver, indexOfLastDriver);
  
    const totalPages = Math.ceil(drivers.length / driversPerPage);
  
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  return (
    <div className="bg-white rounded-lg shadow-md p-6 min-h-screen">
      <h2 className="text-3xl text-center font-bold text-gray-800 mb-6">
        Driver Management
      </h2>
      <button
        onClick={onAddDriver}
        className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300 mb-6"
      >
        Add New Driver
      </button>
      {isLoading || !(drivers && drivers.length >= 0) ? (
        <SpanLoader />
      ) : (
        <>
          <div className="w-full overflow-x-auto min-h-[70vh]">
            <table className="min-w-full table-auto border-collapse">
              <thead className="text-lg">
                <tr className="bg-blue-600 text-white">
                <th className="py-3 px-4 min-w-[100px] text-center">
                        #
                      </th>
                  <th className="py-3 px-4 text-left min-w-[250px]"> Name</th>
                  <th className="py-3 px-4 text-left min-w-[250px]">Email</th>
                  <th className="py-3 px-4 text-left min-w-[100px]">Available</th>

                  <th className="py-3 px-4 text-left min-w-[170px]">
                    Phone no
                  </th>
                  <th className="py-3 px-4 text-left min-w-[170px]">CNIC</th>
                  <th className="py-3 px-4 text-left min-w-[400px]">Address</th>
                  
                  <th className="py-3 px-4 text-center min-w-[120px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentDrivers.map((driver, index) => (
                  <tr
                    key={driver._id}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}
                  >
                 <td className="py-3 px-4 min-w-[100px] text-center">
                          {(index + 1)+((currentPage-1)*driversPerPage)}
                        </td>
                    <td className="py-3 px-4 text-left min-w-[250px]">
                      {driver.username}
                    </td>
                    <td className="py-3 px-4 text-left min-w-[250px]">
                      {driver.email}
                    </td>
                    <td className="py-7 px-4 text-left min-w-[170px] flex items-center ">
                    {!driver.isAvailable ? (
                            <span className="bg-red-100 text-red-900 text-xs font-medium p-0.5 rounded  border border-red-800 flex  items-center">
                              <BsDot  />
                              on work
                            </span>
                          ) : (
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium p-0.5 rounded border border-blue-800 flex  items-center">
                                  <BsDot  />
                              available
                            </span>
                          )}
                    </td>
                    <td className="py-3 px-4 text-left min-w-[170px]">
                      {driver.phone}
                    </td>
                    <td className="py-3 px-4 text-left min-w-[170px]">
                      {driver.cnic}
                    </td>
                    <td className="py-3 px-4 text-left min-w-[400px]">
                      {driver.address}
                    </td>
                    <td className="py-3 px-4 text-left min-w-[100px]">
                      <button
                        onClick={() => onEditDriver(driver)}
                        className="bg-yellow-500 flex gap-1 items-center m-auto text-white py-2 px-4 rounded hover:bg-yellow-400 transition duration-300"
                      >
                         <BiEditAlt className="text-white" />
                      </button>
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
          <div className="flex justify-between items-center mt-4 p-4 bg-white shadow relative bottom-0 left-0 right-0 ">
            {/* Refresh Button */}
            <button
              onClick={FetchData}
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
      {/* <Table/> */}
    </div>
  );
};

export default ManageDrivers;
