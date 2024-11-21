import React from 'react'
import bgImage from "../assets/img1.jpg";
import { useForm } from 'react-hook-form'

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
        console.log(code )
    }

    return (
        <div className='flex justify-center items-center min-w-full h-[88vh]'>

            <div className="img absolute w-screen h-screen z-0 overflow-hidden">
                <img src={bgImage} style={{ width: 10000 }} alt="image" />
            </div>

            <div className="z-10 bg-white/15 backdrop-blur-lg border border-white/20 shadow-lg-75 text-white text-xl text-center items-center gap-4 p-5 bg-opacity-75 rounded-3xl h-80  mx-auto w-1/2 flex flex-col">
                <span>Verification code sent to your Email</span>
                <span className='text-2xl font-bold'>Enter Code</span>
                <form action="" className=" w-full text-center flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
                    <div className=' w-4/5 my-5 code flex justify-evenly items-center'>
                        <input type="text" className='w-20 h-20 bg-white text-black text-center text-5xl rounded-xl' {...register('u1')} maxLength={1} />
                        <span className='w-5 h-2 bg-white'></span>
                        <input type="text" className='w-20 h-20 bg-white text-black text-center text-5xl rounded-xl' {...register('u2')} maxLength={1}/>
                        <span className='w-5 h-2 bg-white'></span>
                        <input type="text" className='w-20 h-20 bg-white text-black text-center text-5xl rounded-xl' {...register('u3')} maxLength={1}/>
                        <span className='w-5 h-2 bg-white'></span>
                        <input type="text" className='w-20 h-20 bg-white text-black text-center text-5xl rounded-xl' {...register('u4')} maxLength={1}/>
                    </div>
                        <input type="submit" value="Submit" className=' text-black w-22 m-auto mt-4 p-2  border rounded bg-slate-400 hover:bg-slate-300 cursor-pointer font-bold' />
                </form>
            </div>
        </div>
    )
}

export default Forget
