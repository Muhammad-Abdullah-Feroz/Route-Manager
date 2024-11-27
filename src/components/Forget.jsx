import React, { useState } from 'react';
import bgImage from '../assets/img1.jpg';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';

const Forget = () => {
    const email = "2023se3@student.uet.edu.pk";
    const [authenticated, setAuthenticated] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmitEmail = (data) => {
        console.log(`Submitted Email: ${data.email}`);
        if (data.email === email) {
            setAuthenticated(true);
            
        } else {
            alert('Email not recognized. Please try again.');
        }
    };

    const onSubmitPassword = (data) => {
        if (data.newPassword === data.confirmPassword) {
            console.log('Password successfully reset:', data.newPassword);
            alert('Password reset successful!');
        } else {
            alert('Passwords do not match. Please try again.');
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen">
            {/* Background Image */}
            <div className="absolute inset-0 overflow-hidden z-0">
                <img
                    src={bgImage}
                    alt="Background"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Form Container */}
            <div className="relative z-10 bg-white/90 border border-gray-200 shadow-lg rounded-xl p-8 w-[90%] max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    {authenticated ? 'Reset Your Password' : 'Forgot Your Password?'}
                </h1>
                <p className="text-sm text-gray-600 text-center mb-8">
                    {authenticated
                        ? 'Enter your new password below.'
                        : 'Enter your email address to reset your password.'}
                </p>

                <form
                    onSubmit={handleSubmit(authenticated ? onSubmitPassword : onSubmitEmail)}
                    className="flex flex-col gap-6"
                >
                    {!authenticated ? (
                        <>
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
                                            ? 'border-red-500 focus:ring-red-400'
                                            : 'border-gray-300 focus:ring-green-400'
                                    } focus:ring-2 outline-none`}
                                    {...register('email', {
                                        required: 'Email is required.',
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                            message: 'Enter a valid email address.',
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
                            <button
                                type="submit"
                                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-300"
                            >
                                Reset Password
                            </button>
                        </>
                    ) : (
                        <>
                            {/* New Password Input */}
                            <div>
                                <label
                                    htmlFor="newPassword"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    placeholder="Enter new password"
                                    className={`w-full p-3 rounded-lg border ${
                                        errors.newPassword
                                            ? 'border-red-500 focus:ring-red-400'
                                            : 'border-gray-300 focus:ring-green-400'
                                    } focus:ring-2 outline-none`}
                                    {...register('newPassword', {
                                        required: 'New password is required.',
                                        minLength: {
                                            value: 6,
                                            message: 'Password must be at least 6 characters.',
                                        },
                                    })}
                                />
                                {errors.newPassword && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.newPassword.message}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password Input */}
                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="Confirm new password"
                                    className={`w-full p-3 rounded-lg border ${
                                        errors.confirmPassword
                                            ? 'border-red-500 focus:ring-red-400'
                                            : 'border-gray-300 focus:ring-green-400'
                                    } focus:ring-2 outline-none`}
                                    {...register('confirmPassword', {
                                        required: 'Please confirm your password.',
                                    })}
                                />
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-300"
                            >
                                Update Password
                            </button>
                        </>
                    )}
                </form>

                {!authenticated && (
                    <p className="text-center text-sm text-gray-700 mt-6">
                        New user?{' '}
                        <NavLink
                            to="/user/auth/signup"
                            className="text-green-500 hover:underline"
                        >
                            Sign Up
                        </NavLink>
                    </p>
                )}
            </div>
        </div>
    );
};

export default Forget;
