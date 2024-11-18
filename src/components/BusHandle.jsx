import React from 'react'

const BusHandle = ({ route }) => {
    return (
        <div className='flex w-full min-h-28 bg-gray-700 text-white p-2 '>
            <div className='w-full left flex flex-col'>
                <span className='font-bold text-xl'>{route.title}</span>
                <span className='mx-5'><span className='font-semibold text-blue-100'>Driver : </span>{route.driver}</span>
                <span className='mx-5'><span className='font-semibold text-blue-100'>Plate No. : </span>{route.number}</span>
                <span className='mx-5'><span className='font-semibold text-blue-100'>Contact No. </span>{route.contact}</span>
            </div>
            <div className="right w-1/4 flex justify-center items-center">
                <div className={`status-btn w-16 h-16 border shadow-neutral-950 shadow-inner ${route.status == "parked"?"bg-red-600":"bg-green-500"}`}>

                </div>
            </div>
        </div>
    )
}

export default BusHandle
