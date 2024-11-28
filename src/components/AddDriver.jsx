import React from 'react';
import { useForm } from 'react-hook-form';

const AddDriver = ({ onBack }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log('Driver Data:', data);
        // Logic to save driver data (e.g., API call)
        onBack(); // Navigate back to the driver list
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Add New Driver</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-gray-700">Name:</label>
                    <input
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.name && (
                        <span className="text-red-500 text-sm">{errors.name.message}</span>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Contact:</label>
                    <input
                        type="text"
                        {...register('contact', {
                            required: 'Contact is required',
                            pattern: {
                                value: /^[0-9]{10,15}$/,
                                message: 'Invalid contact number',
                            },
                        })}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.contact && (
                        <span className="text-red-500 text-sm">{errors.contact.message}</span>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Assigned Vehicle:</label>
                    <input
                        type="text"
                        {...register('vehicle', { required: 'Vehicle is required' })}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.vehicle && (
                        <span className="text-red-500 text-sm">{errors.vehicle.message}</span>
                    )}
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
    );
};

export default AddDriver;
