import React from 'react';
import { useForm } from 'react-hook-form';
import Bttn from './Bttn';
import axios from 'axios';
import { messageToast, messageToastError } from '../handlers/messageToast';

const Complaint = () => {
    const [loadingBtn, setLoadingBtn] = React.useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async(data) =>{
        setLoadingBtn(true);
        console.log(data);
        const ComplaintData = {
            registration_no: data.regNumber,
            complaint_description: data.complaint,
        }
        console.log(ComplaintData);
        try {
            const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/create-complaint`,ComplaintData)

            console.log(response.data)
            if(response.data.success){
                messageToast(response.data.msg)
            }else{
                messageToast(response.data.msg)
                console.log("res",response.data);
            }
            
        } catch (error) {
            
            messageToastError(err?.response?.data?.msg || err?.msg || err)
        }finally{
            setLoadingBtn(false);
        }
    };

    return (
        <div className="w-full bg-gray-100">
            <form
                className="flex flex-col gap-6 bg-gradient-to-r from-gray-50 via-white to-gray-100 backdrop-blur-md rounded-3xl p-8 border border-gray-200 shadow-xl my-10 mx-auto max-w-3xl"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">Report a Complaint</h1>

                {/* Registration Number and Route Selection */}
                <div className="flex gap-4">
                    {/* Registration Number */}
                    <div className="flex-1 flex flex-col gap-2">
                        <label
                            htmlFor="regNumber"
                            className="text-lg font-medium text-gray-700"
                        >
                            Registration Number
                        </label>
                        <input
                            type="text"
                            id="regNumber"
                            placeholder="e.g., 2020CS999"
                            className={`w-full px-4 py-3 border ${errors.regNumber ? "border-red-500" : "border-gray-300"} rounded-lg shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                            {...register("regNumber", {
                                required: "Registration Number is required",
                                pattern: {
                                    value: /^[0-9]{4}[A-Za-z]{2}[0-9]{1,3}$/,
                                    message: "Invalid Registration Number format",
                                },
                            })}
                        />
                        {errors.regNumber && (
                            <p className="text-sm text-red-500 mt-1">{errors.regNumber.message}</p>
                        )}
                    </div>

                    
                </div>

                {/* Complaint Textarea */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="complaint"
                        className="text-lg font-medium text-gray-700"
                    >
                        Complaint Details
                    </label>
                    <textarea
                        id="complaint"
                        rows="5"
                        placeholder="Type your complaint here..."
                        className={`w-full px-4 py-3 border ${errors.complaint ? "border-red-500" : "border-gray-300"} rounded-lg shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none`}
                        {...register("complaint", {
                            required: "This field is required",
                            minLength: {
                                value: 10,
                                message: "Complaint must be at least 10 characters long",
                            },
                        })}
                    ></textarea>
                    {errors.complaint && (
                        <p className="text-sm text-red-500 mt-1">{errors.complaint.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                {/* <button
                    type="submit"
                    className="w-full px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Submit Complaint
                </button> */}
                 <Bttn children={'Submit Complaint'} type={'submit'} isLoading={loadingBtn}/>

            </form>
        </div>
    );
};

export default Complaint;
