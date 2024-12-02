import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import bgImage from "../assets/img1.jpg";
import { messageToast } from "../handlers/messageToast";

const Signup = () => {
  const [fadeIn, setFadeIn] = useState(false); // State to control fade-in effect
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Trigger fade-in after component mount
    setFadeIn(true);
  }, []);

  const onSubmit = (data) => {
    const signBtn=document.getElementById("signUpBtn");
    signBtn.disabled=true;

    console.log(data);
    messageToast("User registered successfully");
  };

  return (
    <div className="relative flex min-w-full h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="background"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Form Container */}
      <div className="  z-10 w-full md:w-1/2 h-full flex justify-center items-center px-6">
        <form
          className={`flex flex-col w-full max-w-lg gap-4 p-6 bg-white/70 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg transition-all duration-1000 ease-in-out ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-2xl text-center font-bold text-gray-700 mb-2">
            Sign Up
          </h2>

          {/* Full Name */}
          <div className="flex flex-col">
            <label
              htmlFor="fullName"
              className="text-lg font-semibold text-gray-600"
            >
              Full Name
            </label>
            <input
              type="text"
              placeholder="Mehboob Alam"
              {...register("fullName", { required: "Full name is required" })}
              className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            {errors.fullName && (
              <p className="text-sm text-red-500 mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* phone number */}
          <div className="flex flex-col">
            <label
              htmlFor="phone_no"
              className="text-lg font-semibold text-gray-600"
            >
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="03193799699"
              {...register("phone_no", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{11}$/,
                  message: "Invalid phone number format",
                },
              })}
              className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            {errors.phone_no && (
              <p className="text-sm text-red-500 mt-1">
                {errors.phone_no.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-lg font-semibold text-gray-600"
            >
              Email ID
            </label>
            <input
              type="email"
              placeholder="example@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: "Invalid email format",
                },
              })}
              className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password and Confirm Password */}
          <div className="flex justify-between gap-6">
            <div className="w-1/2">
              <label
                htmlFor="password"
                className="text-lg font-semibold text-gray-600"
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

            <div className="w-1/2">
              <label
                htmlFor="confirmPassword"
                className="text-lg font-semibold text-gray-600"
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
          {/* Address */}
          <div className="flex flex-col">
            <label
              htmlFor="address"
              className="text-lg font-semibold text-gray-600"
            >
              Address
            </label>
            <input
              type="text"
              placeholder="123 Main St, City, Country"
              {...register("address", { required: "Address is required" })}
              className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            {errors.address && (
              <p className="text-sm text-red-500 mt-1">
                {errors.address.message}
              </p>
            )}
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            id="signUpBtn"
            className="w-full mt-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Sign Up
          </button>

          {/* Login Link */}
          <div className="mt-2 text-center">
            <span className="text-sm text-gray-600">Already a user? </span>
            <NavLink
              to="/user/auth/login"
              className="text-sm text-blue-500 hover:underline transition-all duration-300"
            >
              Login
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
