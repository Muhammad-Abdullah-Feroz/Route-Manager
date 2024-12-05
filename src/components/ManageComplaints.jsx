import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineFileDone } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { CiFilter } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { MdDeleteOutline, MdPendingActions } from "react-icons/md";
import Modal from "./Modal";
import SpanLoader from "./SpanLoader";
import { LuRefreshCcwDot } from "react-icons/lu";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import formatDate from "../handlers/format-date";
const ManageComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [FilterData, setFilterData] = useState("All");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const complaintsPerPage = 7;

  const FetchData = async () => {
    setIsLoading(true);
    try {
      console.log(import.meta.env.VITE_BACKEND_URL);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/complaint`
      );
      console.log("Response :", response);
      if (response.data.success) {
        setComplaints(response.data.complaints ? response.data.complaints : []);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error :", error);
    }
  };
  useEffect(() => {
    FetchData();
  }, []);

  const filteredComplaints = complaints
    .filter((complaint) => {
      if (FilterData === "All") return true;
      if (FilterData.toLocaleLowerCase() == "pending")
        return !complaint.isSolved;
      if (FilterData.toLocaleLowerCase() == "resolved")
        return complaint.isSolved;
    })
    .filter((complaint) =>
      complaint.complaint_description
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  // Pagination logic
  const indexOfLastComplaint = currentPage * complaintsPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
  const currentComplaints = filteredComplaints.slice(
    indexOfFirstComplaint,
    indexOfLastComplaint
  );

  const totalPages = Math.ceil(filteredComplaints.length / complaintsPerPage);
totalPages==0?1:totalPages;
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className=" bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-6 my-5 min-h-screen">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Manage Complaints
        </h2>

        <div>
          <div className=" flex justify-between mb-4">
            <div className="relative lg:w-1/3 md:w-2/3 w-full">
              <input
                type="text"
                placeholder="Search complaints..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="p-2 border outline-none font-semibold text-gray-500 border-gray-300 focus:ring-2 focus:ring-gray-100 rounded w-full"
              />
              <span className="absolute right-[11px] top-[11px]">
                {" "}
                <FaSearch className="text-gray-300 h-5 w-5 " />
              </span>
            </div>
            <div className="md:flex items-center gap-2 hidden">
              <p className="text-md font-semibold flex items-center gap-1">
                <CiFilter />
                filter{" "}
              </p>

              <select
                value={FilterData}
                onChange={(e) => setFilterData(e.target.value)}
                className="p-2 border border-gray-300 focus:ring-2 focus:ring-gray-100 cursor-pointer outline-none rounded "
              >
                <option value="All">All</option>
                <option value="pending">Pending</option>
                <option value="rsolved">Resolved</option>
              </select>
            </div>
          </div>
          {isLoading ? (
            <>
              <SpanLoader />
            </>
          ) : (
            <>
              <div className="w-full overflow-x-auto min-h-[70vh]">
                <table className="min-w-full table-auto border-collapse">
                  {" "}
                  <thead className="text-lg">
                    <tr className="bg-blue-600 text-white">
                      <th className="py-3 px-4 min-w-[120px] text-center">
                        
                      </th>
                      <th className="py-3 px-4 min-w-[100px] text-center">
                        #
                      </th>
                      <th className="py-3 px-4 min-w-[200px] text-left ">
                        Registration No.
                      </th>
                      <th className="py-3 px-4 min-w-[150px] text-center">
                        Status
                      </th>
                      <th className="py-3 px-4 min-w-[300px] text-left">
                        Description
                      </th>
               
                      <th className="py-3 px-4 min-w-[200px] text-center">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentComplaints.map((complaint, index) => (
                      <tr
                        key={complaint._id}
                        className={
                          index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                        }
                      >
                         <td className="py-5 px-4 text-center flex justify-center items-center space-x-2">
                          <Modal
                            requestData={{ complaint_id: complaint._id }}
                            apikey={`${
                              import.meta.env.VITE_BACKEND_URL
                            }/api/admin/complaint/update-status`}
                            action={"update"}
                            ActionBtnText={"Update Status"}
                            displayBtnText={
                              <div className=" flex gap-1 items-center">
                                <BiEditAlt className="text-white" />
                                
                              </div>
                            }
                            title={"Update Complaint Status"}
                            children={
                              <>
                                Are you sure you want to update the status of
                                Complaint? Your current status is{" "}
                                <strong>
                                  {" "}
                                  {complaint.isSolved ? "Aproved" : "Pending"}.
                                </strong>
                              </>
                            }
                            reFetchData={FetchData}
                          />

                          <Modal
                            requestData={{ complaint_id: complaint._id }}
                            apikey={`${
                              import.meta.env.VITE_BACKEND_URL
                            }/api/admin/complaint/delete`}
                            action={"delete"}
                            ActionBtnText={"Delete"}
                            displayBtnText={
                              <div className=" flex gap-1 items-center">
                                <MdDeleteOutline className="text-white" />
                                
                              </div>
                            }
                            title={"Delete Complaint"}
                            children={
                              <>
                                Are you sure you want to delete the complaint ?
                                All of your data will be{" "}
                                <strong>permanently removed.</strong> This
                                action cannot be<strong> undone.</strong>
                              </>
                            }
                            reFetchData={FetchData}
                          />
                        </td>
                        <td className="py-3 px-4 min-w-[100px] text-center">
                          {(index + 1)+((currentPage-1)*7)}
                        </td>
                        <td className=" pl-8 ">
                          {complaint.registration_no}
                        </td>
                        <td className=" px-4 flex justify-center items-center">
                          {!complaint.isSolved ? (
                            <span className="bg-red-100 text-red-900 text-xs font-medium px-1  py-0.5 rounded  border border-red-800 flex gap-1 items-center">
                              <MdPendingActions />
                              pending
                            </span>
                          ) : (
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-1 py-0.5 rounded border border-blue-800 flex gap-1 items-center">
                              <AiOutlineFileDone />
                              resolved
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4  max-w-[400px] cursor-pointer">
                          {/* popover code  */}
                          <div className=" group relative">
                            <span>
                              {complaint.complaint_description.length > 50
                                ? `${complaint.complaint_description.substring(
                                    0,
                                    50
                                  )}...`
                                : complaint.complaint_description}
                            </span>
                            <div className="w-72  mb-2  text-left absolute hidden group-hover:block border border-gray-200   left-1/2 -translate-x-1/2   z-10  bg-white text-sm text-gray-600 rounded-xl shadow-md">
                              <h5 className="mb-1 text-sm text-gray-900 font-medium  px-5 py-3 border-b border-gray-200">
                                Descritption
                              </h5>
                              <p className="text-sm text-gray-600 font-normal px-5 py-3">
                                {complaint.complaint_description}
                              </p>
                            </div>
                          </div>

                          {/* to there is popover code  */}
                        </td>
                     
                        <td className="py-3 px-4 text-center">
                         {formatDate(complaint.createdAt)}
                        </td>
                       
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          <div className="flex justify-between items-center mt-4 p-4 bg-white shadow relative bottom-0 left-0 right-0">
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
                className={`px-4 py-2 rounded ${
                  currentPage === 1 
                    ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
                }`}
              >
                <GrChapterPrevious />
              </button>
              <span className="px-4 py-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className={`px-4 py-2 rounded ${
                  currentPage >= totalPages
                    ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
                }`}
              >
                <GrChapterNext />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageComplaint;
