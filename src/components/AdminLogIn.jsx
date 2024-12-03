import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const AdminLogIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();

      const [errorMessage, setErrorMessage] = useState("");
      
  const navigate = useNavigate();
  const adminCredentials = { username: "admin", password: "password" };
      const onSubmit = (data) => {
        if (
          data.username === adminCredentials.username &&
          data.password === adminCredentials.password
        ) {
        } else {
          setErrorMessage("Invalid username or password. Please try again.");
          reset();
        }
      };


  return (
    <div className="popup-modal fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center">
    <div className="modal-content bg-white p-6 rounded-md shadow-lg w-96">
      <h2 className="text-2xl mb-4 font-semibold text-center">
        Admin Login
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="username" className="block">
            Username
          </label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: "Username is required",
            })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
            })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        {errorMessage && (
          <p className="text-red-500 text-sm">{errorMessage}</p>
        )}

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default AdminLogIn