import React from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom';
import main_logo from "../assets/main_logo.png";
import logo from "../assets/logo.png";
import Bttn from './Bttn';
import axios from 'axios';
import { messageToast, messageToastError } from '../handlers/messageToast';


const wait = (n) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1)
        }, n * 1000);
    })
}

const Login = () => {
    const [loadingBtn, setLoadingBtn] = React.useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate();
    
    const onSubmit = async (data) => {
        setLoadingBtn(true)
        console.log(data)
        const LogIndata={
            email: data.email,
            password: data.password
        }
        reset()
        console.log(LogIndata)
        try{
            const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`,LogIndata)
            console.log(response.data)
            if(response.data.success){
                localStorage.setItem('token',response.data.token)
                messageToast(response.data.msg)
                await wait(4)
                navigate('/user')
            }
            console.log("res",response.data);
            
        }catch(err){
            
            messageToastError(err?.response?.data?.msg || err?.msg || err)
        }finally{
            setLoadingBtn(false)
        }

        
        
    }

    return (
        <>       
        <button onClick={()=>navigate('/admin/auth/lgoin')}>admin login</button>
        
         <div className="relative flex justify-center items-center min-w-full h-screen bg-white/70 backdrop-blur-lg border border-white/20 ">
            {/* Background Image */}
            {/* <div className="absolute w-full h-full z-0 overflow-hidden">
                <img src={bgImage} alt="Background" className="object-cover w-full h-full" />
            </div> */}

            {/* Form Container */}
            <div className="  z-10 w-full h-full flex  justify-around items-center px-6">
                <div className='hidden md:flex'>
                    <img src={main_logo} className='rounded-full size-[90%] border-2 drop-shadow-lg border-gray-100' alt="" />
                </div>
        <form
          className={`flex flex-col w-full max-w-lg gap-4 p-6 transition-all duration-1000 ease-in-out 
          `} onSubmit={handleSubmit(onSubmit)} >
    <div className='flex justify-center items-center mb-1 md:hidden'>
                    <img src={logo} className=' lg:size-[35%] size-[27%] ' alt="" />
                </div>
    <h2 className="text-2xl text-center font-bold text-gray-700 mb-2">
           Log In to your account
          </h2>
                     {/* Email */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-md font-semibold text-gray-600"
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


                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-md font-semibold text-gray-700">Password</label>
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
                        <NavLink to="/user/auth/forget" className="text-sm text-blue-600 hover:underline">Forgot Password?</NavLink>
                    </div>

                    {/* Submit Button */}
                    {/* <button
                        type="submit"
                        className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition duration-300 ease-in-out transform hover:scale-105'
                     >
                        Log In
                    </button> */}
                    <Bttn children={'Log In'} type={'submit'} isLoading={loadingBtn}/>

                    {/* Sign Up Link */}
                    <div className="mt-3 text-center">
                        <span className="text-sm text-gray-700">New user? </span>
                        <NavLink to="/user/auth/signup" className="text-sm text-blue-600 hover:underline">Sign Up</NavLink>
                    </div>
                </form>
            </div>
        </div>
        </>

    )
}

export default Login;
