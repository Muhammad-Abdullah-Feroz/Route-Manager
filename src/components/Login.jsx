import React from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom';
import bgImage from "../assets/img1.jpg";

const user = { username: "maferoz", password: "password" }

const wait = (n) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1)
        }, n * 1000);
    })
}

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate();
    
    const onSubmit = async (data) => {
        console.log(data)
        if (data.username === user.username && data.password === user.password) {
            console.log("Authenticated")
            await wait(2);
            navigate("/user");
        }
    }

    return (
        <div className="relative flex justify-center items-center min-w-full h-screen bg-gray-900 bg-opacity-50">
            {/* Background Image */}
            <div className="absolute w-full h-full z-0 overflow-hidden">
                <img src={bgImage} alt="Background" className="object-cover w-full h-full" />
            </div>

            {/* Form Container */}
            <div className="relative z-10 w-96 p-8 bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg">
                <h2 className="text-3xl font-bold text-center text-green-500 mb-8">Login to your account</h2>

                {/* Login Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

                    {/* Username Field */}
                    <div>
                        <label htmlFor="username" className="block text-lg font-semibold text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="John_Doe"
                            {...register("username", { required: "Username is required" })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-lg font-semibold text-gray-700">Password</label>
                        <div className="flex justify-between">
                            <input
                                type="password"
                                id="password"
                                placeholder="•••••"
                                {...register("password", { required: "Password is required" })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                    </div>

                    {/* Forgot Password Link */}
                    <div className="flex justify-between items-center">
                        <NavLink to="/user/auth/forget" className="text-sm text-green-500 hover:underline">Forgot Password?</NavLink>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-400 transition duration-300"
                    >
                        Log In
                    </button>

                    {/* Sign Up Link */}
                    <div className="mt-4 text-center">
                        <span className="text-sm text-gray-700">New user? </span>
                        <NavLink to="/user/auth/signup" className="text-sm text-green-500 hover:underline">Sign Up</NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;
