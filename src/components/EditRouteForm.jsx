import React from 'react';
import { useForm } from 'react-hook-form';

const EditRouteForm = ({ route, onBack }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: route, // Pre-fill form fields with provided route data
  });

  const onSubmit = (data) => {
    console.log('Updated Route:', data);
    // Simulate API call or handle submission logic here
    alert('Route updated successfully!');
    onBack(); // Notify parent component to return to the main view
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit Route</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Route Number */}
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Route Number</label>
            <input
              type="text"
              {...register('route_no', { required: 'Route number is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.route_no && (
              <span className="text-red-500 text-sm">{errors.route_no.message}</span>
            )}
          </div>

          {/* Driver Name */}
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Driver Name</label>
            <input
              type="text"
              {...register('driver', { required: 'Driver name is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.driver && (
              <span className="text-red-500 text-sm">{errors.driver.message}</span>
            )}
          </div>

          {/* Bus Number */}
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Bus Number</label>
            <input
              type="text"
              {...register('vehicle_no', { required: 'Bus number is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.vehicle_no && (
              <span className="text-red-500 text-sm">{errors.vehicle_no.message}</span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onBack}
              className="bg-gray-500 text-white py-2 px-4 rounded mr-4"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRouteForm;
