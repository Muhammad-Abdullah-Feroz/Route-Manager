import React from 'react';
import { FaBus, FaRegClock, FaMapMarkedAlt, FaExclamationTriangle } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <div className="h-screen bg-gradient-to-r rounded-md from-blue-500 via-blue-400 to-blue-300 text-white overflow-x-hidden">
      <div className="flex flex-col justify-center items-center h-full py-10">
        {/* Welcome Message */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold mb-4">Welcome here</h2>
          <p className="text-xl mb-6">We’re glad to have you on board. Here's a quick guide to how the app works</p>
        </div>

        {/* App Details and Benefits */}
        <div className="bg-white text-gray-800 rounded-lg shadow-lg p-8 max-w-4xl w-full">
          <h3 className="text-3xl font-bold text-blue-600 mb-4">What Our App Does</h3>
          <p className="text-lg mb-6">
            The app helps you manage your daily commute by providing real-time information about bus routes, schedules,
            driver details, and more. It's your go-to tool for a smooth and reliable journey.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {/* Feature 1 - View Routes */}
            <div className="p-4 bg-blue-600 text-white rounded-lg shadow-md">
              <FaBus size={40} className="mb-4 mx-auto" />
              <h4 className="text-xl font-bold">View Routes</h4>
              <br />
              <hr className="border-gray-300 my-4" /> {/* Customized hr */}
              <p className="mt-2">Access all available bus routes and view details like stops and schedules.</p>
            </div>

            {/* Feature 2 - Check Schedule */}
            <div className="p-4 bg-blue-600 text-white rounded-lg shadow-md">
              <FaRegClock size={40} className="mb-4 mx-auto" />
              <h4 className="text-xl font-bold">Check Schedule</h4>
              <br />
              <hr className="border-gray-300 my-4" />
              <p className="mt-2">Know exactly when your bus will arrive and plan your day ahead.</p>
            </div>

            {/* Feature 3 - View Bus Location */}
            <div className="p-4 bg-blue-600 text-white rounded-lg shadow-md">
              <FaMapMarkedAlt size={40} className="mb-4 mx-auto" />
              <h4 className="text-xl font-bold">Real-Time Bus Location</h4>
              <hr className="border-gray-300 my-4" />
              <p className="mt-2">Track buses in real-time and never miss your ride again.</p>
            </div>

            {/* Feature 4 - Report Complaints */}
            <div className="p-4 bg-blue-600 text-white rounded-lg shadow-md">
              <FaExclamationTriangle size={40} className="mb-4 mx-auto" />
              <h4 className="text-xl font-bold">Report Complaints</h4>
              <hr className="border-gray-300 my-4" />
              <p className="mt-2">Have an issue? Log complaints to help improve bus services.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
