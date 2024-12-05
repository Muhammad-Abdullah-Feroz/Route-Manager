import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import bgImage from "../assets/img1.jpg";
import main_logo from "../assets/main_logo.png";
import logo from "../assets/logo.png";
import { useNavigate, useParams } from "react-router-dom";
import { messageToast, messageToastError } from "../handlers/messageToast";
import Bttn from "./Bttn";
import axios from "axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();
   const [loadingBtn,setLoadingBtn]= useState(false);


  const ChangePassword =async (data) => {
  console.log(data.password,slug);
  setLoadingBtn(true)
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/forget-password/verify/${slug}`,{password:data.password}
      );
      console.log(response.data);
      if (response.data.success) {
        messageToast(response.data.msg);
        setTimeout(() => {
          navigate("/user/auth/login");
        }, 4000);

      } else {
        messageToastError(response.data.msg);
      }
    } catch (error) {
      console.log(error);
      messageToastError("Not Valid Email Verifcation Link");
      setTimeout(() => {
        navigate("/user/auth/forget");
      }, 4000);
    } finally {
      setLoadingBtn(false);
    }
    
  };

  return (
    <>
     <div className="relative flex min-w-full h-screen bg-white/70 backdrop-blur-lg ">
      {/* Background Image */}
      {/* <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="background"
          className="object-cover w-full h-full"
        />
      </div> */}

      {/* Form Container */}
      <div className="  z-10 w-full  h-full flex justify-around items-center px-6">
      <div className='hidden md:flex'>
                    <img src={main_logo} className='rounded-full size-[90%] border-2 drop-shadow-lg border-gray-100' alt="" />
                </div>
        <form
          className={`flex flex-col w-full max-w-lg gap-4 p-6  transition-all duration-1000 ease-in-out 
          opacity-90
          `}
            onSubmit={handleSubmit(ChangePassword)}
          >
                   <div className='flex justify-center items-center mb-1 md:hidden'>
                    <img src={logo} className=' lg:size-[35%] size-[27%] ' alt="" />
                </div>
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Reset Your Password
          </h1>
          <p className="text-sm text-gray-600 text-center mb-4">
            Enter your new password below.
          </p>
            <div className="flex flex-col justify-between gap-6">
              <div className="w-full">
                <label
                  htmlFor="password"
                  className="text-md font-semibold text-gray-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  placeholder="•••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                  className="p-2 w-full rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="confirmPassword"
                  className="text-md font-semibold text-gray-600"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="•••••"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                  className="p-2 w-full rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
                <div></div>
            <Bttn
              children={"Change Password"}
              type={"submit"}
              isLoading={loadingBtn}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
