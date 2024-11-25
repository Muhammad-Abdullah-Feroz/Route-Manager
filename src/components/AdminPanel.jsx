import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminPanel = () => {
  // Sample route data (could be dynamic from an API)
  const routes = [
    { id: 1, routeNumber: 'Route 1', driverName: 'John Doe', busNumber: '123' },
    { id: 2, routeNumber: 'Route 2', driverName: 'Jane Smith', busNumber: '456' },
    { id: 3, routeNumber: 'Route 3', driverName: 'Mike Johnson', busNumber: '789' },
  ];

  return (
    <div className="p-8 bg-gray-100 h-screen">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl text-center font-bold text-gray-800 mb-6">Route Management</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-3 px-4 text-left">Route #</th>
              <th className="py-3 px-4 text-left">Driver Name</th>
              <th className="py-3 px-4 text-left">Bus #</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route, index) => (
              <tr
                key={route.id}
                className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}
              >
                <td className="py-3 px-4">{route.routeNumber}</td>
                <td className="py-3 px-4">{route.driverName}</td>
                <td className="py-3 px-4">{route.busNumber}</td>
                <td className="py-3 px-4">
                  <NavLink
                    to={`/admin/edit/${route.id}`}
                    className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-400 transition duration-300"
                  >
                    Edit
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
