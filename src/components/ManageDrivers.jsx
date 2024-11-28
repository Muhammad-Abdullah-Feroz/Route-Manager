import React from 'react'
import { BiEditAlt } from 'react-icons/bi';

const ManageDrivers = ({ onAddDriver, onEditDriver }) => {
  const drivers = [
      { id: 1, name: 'John Doe', contact: '123-456-7890', vehicle: 'Bus 123' },
      { id: 2, name: 'Jane Smith', contact: '987-654-3210', vehicle: 'Bus 456' },
  ];

  return (
      <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-3xl text-center font-bold text-gray-800 mb-6">Driver Management</h2>
          <button
              onClick={onAddDriver}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300 mb-6"
          >
              Add New Driver
          </button>
          <table className="w-full table-auto border-collapse">
              <thead className="text-lg">
                  <tr className="bg-blue-600 text-white">
                      <th className="py-3 px-4 text-center">Driver Name</th>
                      <th className="py-3 px-4 text-center">Contact</th>
                      <th className="py-3 px-4 text-center">Assigned Vehicle</th>
                      <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {drivers.map((driver, index) => (
                      <tr
                          key={driver.id}
                          className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}
                      >
                          <td className="py-3 px-4 text-center">{driver.name}</td>
                          <td className="py-3 px-4 text-center">{driver.contact}</td>
                          <td className="py-3 px-4 text-center">{driver.vehicle}</td>
                          <td className="py-3 px-4 text-center">
                              <button
                                  onClick={() => onEditDriver(driver)}
                                  className="bg-yellow-500 flex gap-1 items-center m-auto text-white py-2 px-4 rounded hover:bg-yellow-400 transition duration-300"
                              >
                                  Edit <BiEditAlt className='text-white'/>
                              </button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
  );
};

export default ManageDrivers;
