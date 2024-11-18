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
        watch,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate();
    const onSubmit = async (data) => {
        console.log(data)
        if (data.username == user.username && data.password == user.password) {
            console.log("Authenticated")
            await wait(2);
            navigate("/");
        }
    }

    return (
        <div className='flex justify-center items-center min-w-full h-screen'>
            <div className="img absolute w-screen h-screen z-0 overflow-hidden">
                <img src={bgImage} style={{ width: 10000 }} alt="image" />
            </div>
            <div className=" z-10 w-1/2 h-full items-center flex  justify-center flex-col">
                <form action="" className='flex flex-col justify-center w-4/5 p-3  gap-2 bg-white/15 backdrop-blur-lg border border-white/20 shadow-lg-75 h-full my-20 px-10 rounded-3xl' onSubmit={handleSubmit(onSubmit)}>
                    <span className='text-3xl text-center text-green-200 font-bold m-10 text-border'>Login to your account</span>
                    <label htmlFor="username">Username</label>
                    <input type="text" className=' text-black p-2 rounded' placeholder='John_Doe' {...register("username")} />
                    <div className="flex justify-between">
                        <label htmlFor="username">Password</label>
                        <span className='text-right'> <NavLink className={"underline text-green-500"} to={'/auth/login/forget'}>Forgot Password?</NavLink></span>
                    </div>
                    <input type="password" className=' text-black p-2 rounded' placeholder='•••••' {...register("password")} />
                    <input type="submit" className=' text-black w-20 m-auto mt-4 p-2  border rounded bg-slate-400 hover:bg-slate-300 cursor-pointer font-bold' value="Submit" />
                    <span className='text-right'>New user? <NavLink className={"underline text-green-500"} to={'/auth/signup'}>Sign Up</NavLink></span>

                </form>
            </div>
        </div>
    )
}

export default Login
