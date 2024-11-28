import React, { useState } from "react";
import AddStopForm from "./AddStopForm";
import { BiEditAlt } from "react-icons/bi";

const FormPageState = {
  INACTIVE: 'inactive',
  ADD: 'add',
  UPDATE: 'update',
};


const stopsList = [
  {
    id: 1,
    name: "Liberty Market",
    latitude: 31.5204,
    longitude: 74.3587,
  },
  {
    id: 2,
    name: "Gulberg",
    latitude: 31.5095,
    longitude: 74.3433,
  },
  {
    id: 3,
    name: "Model Town",
    latitude: 31.475,
    longitude: 74.3162,
  },
  {
    id: 4,
    name: "Johar Town",
    latitude: 31.467,
    longitude: 74.2768,
  },
  {
    id: 5,
    name: "DHA Phase 5",
    latitude: 31.4863,
    longitude: 74.3686,
  },
];

const ManageStops = () => {
  const [isFormPageState, setIsFormPageState] = useState(FormPageState.INACTIVE);
 const [stopDetails, setStopDetails] = useState({});  // store stop details to be updated

  const handleAddStop = () => {
    setIsFormPageState(FormPageState.ADD);
  };

  const onEditStop = (stop) => {  
    console.log("Edit Stop", stop);
    setStopDetails(stop);
    setIsFormPageState(FormPageState.UPDATE);

  }
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
          <div className="p-8 bg-gray-100">
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
              <table className="w-full table-auto border-collapse">
                <thead className="text-lg">
                  <tr className="bg-blue-600 text-white">
                    <th className="py-3 px-4 text-center">Driver Name</th>
                    <th className="py-3 px-4 text-center">Latitude</th>
                    <th className="py-3 px-4 text-center">Longitude</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stopsList.map((stop, index) => (
                    <tr
                      key={stop.id}
                      className={
                        index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                      }
                    >
                      <td className="py-3 px-4 text-center">{stop.name}</td>
                      <td className="py-3 px-4 text-center">{stop.latitude}</td>
                      <td className="py-3 px-4 text-center">
                        {stop.longitude}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => onEditStop(stop)}
                          className="bg-yellow-500 flex gap-1 items-center text-white py-2 px-4 rounded m-auto hover:bg-yellow-400 transition duration-300"
                        >
                          Edit <BiEditAlt className='text-white'/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      {/* Display table here  */}
    </div>
  );
};

export default ManageStops;
