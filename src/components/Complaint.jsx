import React from 'react'
import { useForm } from 'react-hook-form'

const Complaint = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => console.log(data)


    return (
        <div className='w-full h-[89vh] bg-slate-300 p-5 overflow-y-scroll'>
            <form
                className="flex flex-col gap-6 bg-gradient-to-r from-gray-50 via-white to-gray-100 backdrop-blur-md rounded-3xl p-8 border border-gray-200 shadow-xl my-10 mx-auto max-w-3xl"
                onSubmit={onSubmit}
            >
                <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">Report a Complaint</h1>

                {/* Registration Number */}
                <div className="flex flex-col gap-2">
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        {...register("regNumber")}
                    />
                </div>

                {/* Route Selection */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="routeNumber"
                        className="text-lg font-medium text-gray-700"
                    >
                        Select Route
                    </label>
                    <select
                        id="routeNumber"
                        className={`w-full px-4 py-3 border ${errors.routeNumber ? "border-red-500" : "border-gray-300"
                            } rounded-lg shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                        {...register("routeNumber", { required: "Please select a route" })}
                    >
                        <option value="" disabled selected>
                            Select a route
                        </option>
                        {[...Array(10)].map((_, i) => (
                            <option key={i} value={`Route ${i + 1}`}>
                                Route {i + 1}
                            </option>
                        ))}
                    </select>
                    {errors.routeNumber && (
                        <p className="text-sm text-red-500 mt-1">{errors.routeNumber.message}</p>
                    )}
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
                        className={`w-full px-4 py-3 border ${errors.complaint ? "border-red-500" : "border-gray-300"
                            } rounded-lg shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none`}
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
                <button
                    type="submit"
                    className="w-full px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Submit Complaint
                </button>
            </form>

        </div>
    )
}

export default Complaint
