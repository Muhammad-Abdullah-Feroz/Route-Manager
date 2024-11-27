import React, { useEffect } from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const EditRouteForm = () => {
  const { id } = useParams(); // Getting the route id from the URL
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate()
  
  // Sample function to simulate fetching route data by ID (replace with API call)
  const fetchRouteData = (id) => {
    // Simulated route data
    const route = {
      routeNumber: 'Route ' + id,
      driverName: `Driver ${id}`,
      busNumber: `Bus ${id * 10}`,
    };
    // Setting the fetched data into the form fields
    setValue('routeNumber', route.routeNumber);
    setValue('driverName', route.driverName);
    setValue('busNumber', route.busNumber);
  };

  // Call fetch data on component mount
  useEffect(() => {
    fetchRouteData(id);
  }, [id, setValue]);

  const onSubmit = (data) => {
    console.log('Updated Route:', data);
    navigate("/admin/")
  };

  return (
    <div className="p-8 bg-gray-100 h-screen">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit Route</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Route Number</label>
            <input
              type="text"
              {...register('routeNumber', { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Driver Name</label>
            <input
              type="text"
              {...register('driverName', { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Bus Number</label>
            <input
              type="text"
              {...register('busNumber', { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Update Route
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRouteForm;
