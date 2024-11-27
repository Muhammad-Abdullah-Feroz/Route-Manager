import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const AddRouteForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Submit the data to API or perform other actions (e.g., adding a new route)
    console.log('New Route Data:', data);
    navigate("/admin")
  };

  return (
    <div className="p-8 bg-gray-100 h-screen">
      <div className="bg-white rounded-lg shadow-md p-6 m-auto w-5/6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Add New Route</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Route Number</label>
            <input
              type="text"
              {...register('routeNumber', { required: 'Route number is required' })}
              className={`w-full px-4 outline-none py-2 border ${errors.routeNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500`}
            />
            {errors.routeNumber && <p className="text-red-500 text-sm mt-1">{errors.routeNumber.message}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Driver Name</label>
            <input
              type="text"
              {...register('driverName', { required: 'Driver name is required' })}
              className={`w-full px-4 outline-none py-2 border ${errors.driverName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500`}
            />
            {errors.driverName && <p className="text-red-500 text-sm mt-1">{errors.driverName.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Bus Number</label>
            <input
              type="text"
              {...register('busNumber', { required: 'Bus number is required' })}
              className={`w-full px-4 outline-none py-2 border ${errors.busNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500`}
            />
            {errors.busNumber && <p className="text-red-500 text-sm mt-1">{errors.busNumber.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Stops</label>
            <input
              type="text"
              {...register('stops', { required: 'Please enter stops, separated by commas' })}
              className={`w-full px-4 outline-none py-2 border ${errors.stops ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500`}
              placeholder="Stop 1, Stop 2, Stop 3"
            />
            {errors.stops && <p className="text-red-500 text-sm mt-1">{errors.stops.message}</p>}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Add Route
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRouteForm;
