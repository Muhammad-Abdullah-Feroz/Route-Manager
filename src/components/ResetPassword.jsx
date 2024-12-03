import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import bgImage from "../assets/img1.jpg";
import Loading from "./Loading";
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
      <div className="relative flex items-center justify-center min-h-screen">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <img
            src={bgImage}
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Password and Confirm Password */}
        <div className="relative z-10 bg-white/90 border border-gray-200 shadow-lg rounded-xl p-8 w-[90%] max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Reset Your Password
          </h1>
          <p className="text-sm text-gray-600 text-center mb-8">
            Enter your new password below.
          </p>
          <form
            onSubmit={handleSubmit(ChangePassword)}
            className="flex flex-col gap-6"
          >
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
