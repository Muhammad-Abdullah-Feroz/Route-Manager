import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Bttn from '../Bttn';
import { messageToast, messageToastError } from '../../handlers/messageToast';

const LogInDriver = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();

      const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
      const SubmitDriverLogin = async(data) => {
        setLoading(true)
       console.log(data);
       const LogInData={
        email:data.email,
        cnic:data.cnic
       }
try {
  const response=await axios.post(`${import.meta.env.VITE_LOCAL_BACKEND_URL}/api/driver/login`,LogInData)
   console.log(response.data);
  if(response.data.success){
    localStorage.setItem('token',response.data.token)
    messageToast("Login Successfully")
    setTimeout(() => {
      navigate('/_driver/driver-dashboard')
      
    }, 4000);
  }
} catch (error) {
  console.log(error.response.data);
  messageToastError("Error : wrong credentials")
  
}finally{
reset()
setLoading(false)
}
       
      };


  return (
    <div className="popup-modal fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center">
    <div className="modal-content bg-white p-6 rounded-md shadow-lg w-96">
      <h2 className="text-2xl mb-4 font-semibold text-center">
        Driver Login
      </h2>
      <form onSubmit={handleSubmit(SubmitDriverLogin)}>
        <div className="mb-4">
          <label htmlFor="username" className="block">
            email
          </label>
          <input
            type="text"
            id="username"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: "Invalid email format",
              },
            })}
            placeholder='example@gmail.com'
            className="w-full p-2 border font-light border-gray-300 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="cnic" className="block">
            Cnic no 
          </label>
          <input
            type="text"
            id='cnic'
            {...register('cnic', {
                required: 'CNIC is required',
                pattern: {
                  value: /^[0-9]{13}$/,
                  message: 'Invalid CNIC number , must be 13 digits without dashes',
                },
              })}
              placeholder='1234512345678'
            className="w-full p-2 border  font-light border-gray-300 rounded"
          />
          {errors.cnic && (
            <p className="text-red-500 text-sm">
              {errors.cnic.message}
            </p>
          )}
        </div>

      

        <div className="flex justify-center">
          <Bttn
            type="submit"
            isLoading={loading}
            children={"Login"}
          />
        </div>
      </form>
    </div>
  </div>
  )
}

export default LogInDriver