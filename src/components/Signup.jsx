import React from 'react'
import { useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import bgImage from "../assets/img1.jpg";

const Signup = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => console.log(data)

    return (
        <div className='flex min-w-full h-[88vh]'>
            <div className="img absolute w-screen h-screen z-0 overflow-hidden">
                <img src={bgImage} style={{ width: 10000 }} alt="image" />
            </div>
            <div className="left z-10 w-1/2 h-full items-center flex  justify-center flex-col">
                <form action="" className='flex flex-col w-4/5 p-3 justify-center  gap-2bg-white/15 backdrop-blur-lg border border-white/20 shadow-lg-75 h-full my-20 px-10 rounded-3xl' onSubmit={handleSubmit(onSubmit)}>
                
                <span className='text-2xl text-center font-bold m-4'>Sign-Up Form </span>

                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" className=' text-black p-2 rounded' placeholder='John Doe' {...register("Full Name")} />

                    <label htmlFor="username">Username</label>
                    <input type="text" className=' text-black p-2 rounded' placeholder='John_Doe' {...register("username")} />

                    <label htmlFor="email">Email ID</label>
                    <input type="email" className=' text-black p-2 rounded' placeholder='2023cs987@student.uet.edu.pk' {...register("username")} />

                    <div className="passBox flex justify-between items-center w-full">

                        <div className='w-[48%]'>
                            <label htmlFor="password">Password</label>
                            <input type="password" className=' text-black p-2 rounded w-full' placeholder = '•••••' {...register("password")} />
                        </div>

                        <div className='w-[48%]'>
                            <label htmlFor="confirmPass">Confirm Password</label>
                            <input type="password" className=' text-black p-2 rounded w-full' placeholder = '•••••' {...register("confirmPass")} />
                        </div>

                    </div>

                    <input type="submit" className=' text-black w-20 m-auto mt-4 p-2  border rounded bg-slate-400 hover:bg-slate-300 cursor-pointer font-bold' value="Submit" />
                <span className='text-right'>Already a user? <NavLink className={"underline text-green-500"} to={'/auth/login'}>Login</NavLink></span>
                </form>
            </div>
        </div>
    )
}

export default Signup
