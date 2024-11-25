import React from 'react'
import bgImage from "../assets/img1.jpg";
import { useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom';

const Forget = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data.u1)
        let code = "";
        code = data.u1 + data.u2 + data.u3 + data.u4;
        console.log(code)
    }

    return (
        <div className='flex justify-center items-center min-w-full h-screen'>
            <div className="img absolute w-screen h-screen z-0 overflow-hidden">
                <img src={bgImage} style={{ width: 10000 }} alt="image" />
            </div>

            <div className="z-10 bg-white/15 backdrop-blur-lg border border-white/20 shadow-lg-75 text-white text-xl rounded-3xl h-80 justify-center flex flex-col  mx-auto w-[600px] ">
                <form action="" className="flex flex-col p-10 justify-center" onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="email">Email ID</label>
                    <input type="email" className=' text-black p-2 rounded w-ful' placeholder='2023cs987@student.uet.edu.pk' {...register("username")} />
                    <input type="submit" value="Forget Password" className=' text-black w-22 m-auto mt-4 p-2  border border-green-900 rounded bg-green-400 hover:bg-green-300 cursor-pointer font-bold' />

                </form>
                    <span className='text-right mx-10'>New user? <NavLink className={"underline text-green-500"} to={'/user/auth/signup'}>Sign Up</NavLink></span>
            </div>
        </div>
    )
}

export default Forget
