import React,{useState} from 'react';
import { useForm } from 'react-hook-form';
import  axios from "axios";
import Bttn from './Bttn';
import {messageToast,messageToastError} from '../handlers/messageToast'

const AddDriver = ({ onBack }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async(data) => {
    setIsLoading(true);
    const addData={
        name:data.name,
        email:data.email,
        phone:data.phone_no,
        cnic:data.cnic,
        address:data.address
    }

    try {
        const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/driver/add-driver`,addData);
        console.log(response);
        if(response.data.success){
            console.log('Driver added successfully');
            messageToast("Driver added successfully");
            setTimeout(() => {
              
      setIsLoading(false);
              onBack(); // Navigate back to the driver list
            }, 4000);
          }else{
            messageToastError("Something went wrong, please try again");
        }
      } catch (error) {
        console.log(error);
        messageToastError(error.response.data.msg);
        
        setIsLoading(false);
      }
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
            className="w-full p-2 border font-light border-gray-300 rounded"
            placeholder='John Doe'
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email address',
              },
            })}
            placeholder='example@gmail.com'
            className="w-full p-2 border border-gray-300 font-light rounded"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Phone Number:</label>
          <input
            type="text"
            {...register('phone_no', {
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9]{11}$/,
                message: 'Invalid phone number',
              },
            })}
            placeholder='03123456789'
            className="w-full p-2 border border-gray-300 rounded font-light"
          />
          {errors.phone_no && (
            <span className="text-red-500 text-sm">{errors.phone_no.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">CNIC:</label>
          <input
            type="text"
            {...register('cnic', {
              required: 'CNIC is required',
              pattern: {
                value: /^[0-9]{13}$/,
                message: 'Invalid CNIC number',
              },
            })}
            placeholder='1234512345678'
            className="w-full p-2 border border-gray-300 rounded font-light"
          />
          {errors.cnic && (
            <span className="text-red-500 text-sm">{errors.cnic.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Address:</label>
          <input
            type="text"
            {...register('address', { required: 'Address is required' })}
            className="w-full p-2 border border-gray-300 rounded font-light"
            placeholder='House #, Street, City'
          />
          {errors.address && (
            <span className="text-red-500 text-sm">{errors.address.message}</span>
          )}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Back
          </button>
       
          <Bttn type={"submit"} isLoading={isLoading} children={"save"} />
          </div>
      </form>
    </div>
  );
};

export default AddDriver;
