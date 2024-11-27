import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    // Replace with dynamic user data
    const userName = "John Doe";  // Example: replace with the actual user's name

    // Get the first initial of the user's first name
    const userInitial = userName ? userName.charAt(0).toUpperCase() : '';

    return (
        <div className="bg-gradient-to-r from-green-400 to-blue-500 h-16 w-full flex justify-between items-center px-8 shadow-md">
            {/* Logo */}
            <NavLink to={'/user'}>
                <div className="logo text-2xl font-extrabold text-white drop-shadow-lg">
                    Route Manager
                </div>
            </NavLink>

            {/* User Profile Section */}
            <div className="user-profile flex items-center gap-4">
                <div
                    className="w-10 h-10 flex items-center justify-center bg-green-600 text-white rounded-full font-bold"
                    style={{ fontSize: '18px' }}
                >
                    {userInitial}
                </div>
                <div className="user-name text-white font-semibold">
                    {userName}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
