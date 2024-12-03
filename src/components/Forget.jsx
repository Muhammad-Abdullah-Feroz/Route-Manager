import React, { useState } from 'react';
import bgImage from '../assets/img1.jpg';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import Bttn from './Bttn';
import axios from 'axios';
import { messageToast, messageToastError } from '../handlers/messageToast';

const Forget = () => {
    const email = "2023se3@student.uet.edu.pk";
    const [loadingBtn, setLoadingBtn] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmitEmail = async(data) => {
        setLoadingBtn(true);
        console.log(`Submitted Email: ${data.email}`);

        try {
            const response= await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/forget-password`, {email:data.email})
            console.log(response.data);
            if(response.data.success){
                messageToast(response.data.msg);
            }else{
                messageToastError(response.data.msg);
            }
            
        } catch (error) {
            console.log(error);
            
            messageToastError(error.response.data.msg || "Internal Error Occur");
        }finally{
            reset()
            setLoadingBtn(false);
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
              Forgot Your Password?
                </h1>
                <p className="text-sm text-gray-600 text-center mb-8">
                 Enter your email address to reset your password.
                </p>

                <form
                    onSubmit={handleSubmit( onSubmitEmail)}
                    className="flex flex-col gap-6"
                >
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
                                            : 'border-gray-300 focus:ring-blue-500'
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
                            {/* <button
                                type="submit"
                                className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition duration-300 ease-in-out transform hover:scale-105'
                                >
                                Reset Password
                            </button> */}

                    <Bttn children={'Forget Password'} type={'submit'} isLoading={loadingBtn}/>
              
                </form>

                    <p className="text-center text-sm text-gray-700 mt-6">
                        New user?{' '}
                        <NavLink
                            to="/user/auth/signup"
                            className="text-blue-600 hover:underline"
                        >
                            Sign Up
                        </NavLink>
                    </p>
            </div>
        </div>
    );
};

export default Forget;
