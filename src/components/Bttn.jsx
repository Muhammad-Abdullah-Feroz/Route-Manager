import React from 'react';

const Bttn = ({type, isLoading, onClick, children, ...props }) => {
  return (
    <button
    type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`relative flex items-center justify-center px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:scale-95 hover:bg-blue-700 transition duration-300 ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
      {...props}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-white h-6 w-6"></div>
        </div>
      )}
      <span className={`${isLoading ? 'invisible' : 'visible'}`}>{children}</span>
    </button>
  );
};

export default Bttn;