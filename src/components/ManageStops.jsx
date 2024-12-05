import React, { useEffect, useState } from "react";
import AddStopForm from "./AddStopForm";
import { BiEditAlt } from "react-icons/bi";
import axios from "axios";
import { LuRefreshCcwDot } from "react-icons/lu";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import SpanLoader from "./SpanLoader";
import Modal from "./Modal";
import { MdDeleteOutline } from "react-icons/md";

const FormPageState = {
  INACTIVE: 'inactive',
  ADD: 'add',
  UPDATE: 'update',
};



const ManageStops = () => {

  const [stopsList, setStopsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormPageState, setIsFormPageState] = useState(FormPageState.INACTIVE);
 const [stopDetails, setStopDetails] = useState({});  // store stop details to be updated

 const fetchData=async()=>{
  setIsLoading(true);
  try {
    const response= await axios.get(`${import.meta.env.VITE_LOCAL_BACKEND_URL}/api/admin/stop`);
    console.log(response.data);
    if(response.data.success){
      setStopsList(response.data.data)
      setIsLoading(false);
    }
  } catch (error) {
    console.log(error.response);
    
  }
  }


  useEffect(()=>{
    fetchData();
  },[isFormPageState ])
  const handleAddStop = () => {
    setIsFormPageState(FormPageState.ADD);
  };

  const onEditStop = (stop) => {  
    console.log("Edit Stop", stop);
    setStopDetails(stop);
    setIsFormPageState(FormPageState.UPDATE);

  }

  const [currentPage, setCurrentPage] = useState(1);
  const stopsPerPage = 8;

  const indexOfLastStop = currentPage * stopsPerPage;
  const indexOfFirstStop = indexOfLastStop - stopsPerPage;
  const currentStop = stopsList.slice(indexOfFirstStop, indexOfLastStop);

  const totalPages = Math.ceil(stopsList.length / stopsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div>
      {isFormPageState !== FormPageState.INACTIVE ? (
        isFormPageState === FormPageState.UPDATE ? (
            <AddStopForm setIsFormPageState={setIsFormPageState}  FormPageState={FormPageState}  stopDetails={stopDetails} isAddNew={false} />
          ) : (
            <AddStopForm setIsFormPageState={setIsFormPageState} FormPageState={FormPageState}/>
          )
        
      ) : (
        <>
          <div className="py-8 bg-gray-100">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-3xl text-center font-bold text-gray-800 mb-6">
                Stop Management
              </h2>
              <button
                onClick={handleAddStop}
                className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300 mb-6"
              >
                Add New Stop
              </button>
              {isLoading ? (<SpanLoader/>):(
                <>
                <div className="overflow-x-auto min-h-[60vh]">
              <table className="w-full table-auto border-collapse">
                <thead className="text-lg">
                  <tr className="bg-blue-600 text-white">
                    <th className="py-3 px-4 text-left min-w-[200px]"></th>
                    <th className="py-3 px-4 text-left min-w-[300px]">Driver Name</th>
                    <th className="py-3 px-4 text-left min-w-[140px]">Latitude</th>
                    <th className="py-3 px-4 text-left min-w-[140px]">Longitude</th>
                  </tr>
                </thead>
                <tbody>
                  {currentStop!=undefined && currentStop.map((stop, index) => (
                    <tr
                      key={stop._id}
                      className={
                        index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                      }
                    >
                      <td className="py-3 px-10 flex items-center justify-center ">
                        <button
                          onClick={() => onEditStop(stop)}
                          className="bg-yellow-500 flex gap-1 items-center text-white  py-3 px-4 rounded m-auto hover:bg-yellow-400 transition duration-300"
                        >
                           <BiEditAlt className='text-white'/>
                        </button>
                        <Modal
                            requestData={{ stop_id: stop._id }}
                            apikey={`${
                              import.meta.env.VITE_LOCAL_BACKEND_URL
                            }/api/admin/stop/delete`}
                            action={"delete"}
                            ActionBtnText={"Delete"}
                            displayBtnText={
                              <div className="py-1">
                                <MdDeleteOutline className="text-white" />
                              </div>
                            }
                            title={"Delete Stop"}
                            children={
                              <>
                                Are you sure you want to delete the Stop ?
                                All of your data will be{" "}
                                <strong>permanently removed.</strong> This
                                action cannot be<strong> undone.</strong>
                              </>
                            }
                            reFetchData={fetchData}
                          />
                      </td>
                      <td className="py-3 px-4 text-left">{stop.name}</td>
                      <td className="py-3 px-4 text-left">{stop.latitude}</td>
                      <td className="py-3 px-4 text-left">
                        {stop.longitude}
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
              onClick={fetchData}
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
          </div>
        </>
      )}
      {/* Display table here  */}
    </div>
  );
};

export default ManageStops;
