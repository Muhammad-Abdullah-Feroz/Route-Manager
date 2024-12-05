import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

const AddRouteForm = ({ drivers, stops, onSubmit, onBack }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [driverOptions, setDriverOptions] = useState([]);
  const [stopOptions, setStopOptions] = useState([]);
  const navigate = useNavigate();
console.log("AddRouteForm -> drivers", drivers)
console.log("AddRouteForm -> stops", stops);

  // const driverOptions = drivers?.map(driver => ({
  //   value: driver._id,
  //   label: driver.name,
  // }));

  // const stopOptions = stops?.map(stop => ({
  //   value: stop._id,
  //   label: stop.name,
  // }));

  useEffect(() => {
    setDriverOptions(drivers?.map(driver => ({
      value: driver._id,
      label: driver.name,
    })));
    setStopOptions(stops?.map(stop => ({
      value: stop._id,
      label: stop.name,
    })));
  }, [drivers, stops]);

  return (
    <div className="p-8 bg-gray-100 h-screen">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Add New Route</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Route Name</label>
            <input
              type="text"
              {...register('routeName', { required: 'Route name is required' })}
              className={`w-full px-4 py-2 border ${errors.routeName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500`}
            />
            {errors.routeName && <p className="text-red-500 text-sm mt-1">{errors.routeName.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Driver</label>
            <Controller
              name="driver"
              control={control}
              rules={{ required: 'Driver is required' }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={driverOptions}
                  className={`w-full ${errors.driver ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500`}
                />
              )}
            />
            {errors.driver && <p className="text-red-500 text-sm mt-1">{errors.driver.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Stops</label>
            <Controller
              name="stops"
              control={control}
              rules={{ required: 'Please select stops' }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={stopOptions}
                  isMulti
                  className={`w-full ${errors.stops ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500`}
                />
              )}
            />
            {errors.stops && <p className="text-red-500 text-sm mt-1">{errors.stops.message}</p>}
          </div>

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

export default AddRouteForm;
