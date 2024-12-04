import React, { useState } from "react";
import bgImage from "../assets/img1.jpg";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import main_logo from "../assets/main_logo.png";
import logo from "../assets/logo.png";
import Bttn from "./Bttn";
import axios from "axios";
import { messageToast, messageToastError } from "../handlers/messageToast";

const Forget = () => {
  const email = "2023se3@student.uet.edu.pk";
  const [loadingBtn, setLoadingBtn] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmitEmail = async (data) => {
    setLoadingBtn(true);
    console.log(`Submitted Email: ${data.email}`);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/forget-password`,
        { email: data.email }
      );
      console.log(response.data);
      if (response.data.success) {
        messageToast(response.data.msg);
      } else {
        messageToastError(response.data.msg);
      }
    } catch (error) {
      console.log(error);

      messageToastError(error.response.data.msg || "Internal Error Occur");
    } finally {
      reset();
      setLoadingBtn(false);
    }
  };

  return (
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
        <div className="hidden md:flex">
          <img
            src={main_logo}
            className="rounded-full size-[90%] border-2 drop-shadow-lg border-gray-100"
            alt=""
          />
        </div>
        <form
          className={`flex flex-col w-full max-w-lg gap-4 p-6  transition-all duration-1000 ease-in-out 
          opacity-90
          `}
          onSubmit={handleSubmit(onSubmitEmail)}
        >
          <div className="flex justify-center items-center mb-1 md:hidden">
            <img src={logo} className=" lg:size-[35%] size-[27%] " alt="" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 text-center ">
            Forgot Your Password?
          </h1>
          <p className="text-sm text-gray-600 text-center mb-2">
            Enter your email address to reset your password.
          </p>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="2023cs987@student.uet.edu.pk"
              className={`w-full p-3 rounded-lg border ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-500"
              } focus:ring-2 outline-none`}
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Enter a valid email address.",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Submit Button */}

            <div ></div>

          <Bttn
            children={"Forget Password"}
            type={"submit"}
            isLoading={loadingBtn}
            
          />
          <p className="text-center text-sm text-gray-700 mt-3">
          New user?{" "}
          <NavLink
            to="/user/auth/signup"
            className="text-blue-600 hover:underline"
          >
            Sign Up
          </NavLink>
        </p>
        </form>

      
      </div>
    </div>
  );
};

export default Forget;
