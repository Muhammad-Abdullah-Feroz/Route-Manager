import React from 'react';
import mainLogo from '../assets/logo.png'; 


const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-blue-100">
      <div className="flex flex-col items-center">
      <img src={mainLogo} alt="Main Logo" className="h-30 w-48 mb-2 " />
      <h2 className="text-2xl font-semibold text-gray-700"> Routes Management System</h2>
        <p className="text-gray-500">Please wait while the content is loading...</p>
      </div>
    </div>
  );
};

export default Loading;