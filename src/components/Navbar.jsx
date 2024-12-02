import React from 'react';
import { BiLogOut } from 'react-icons/bi';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate()
    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout ?")){
            localStorage.removeItem('token');  
            navigate("/user/auth/login");
          }
        }

    return (
        <div className="bg-blue-600 w-full flex justify-between items-center py-3 px-8 shadow-md">
            {/* Logo */}
            <NavLink to={'/user'}>
                <div className="logo text-2xl font-extrabold text-white drop-shadow-lg">
                    Route Manager
                </div>
            </NavLink>
            <button
                                className="flex items-center gap-1 bg-white font-bold text-blue-600 border-2 border-blue-600 py-2 px-4 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out transform hover:scale-105" 
                                onClick={handleLogout}
                            >
                                <BiLogOut/>Logout
                            </button>
            {/* User Profile Section
            <div className="user-profile flex items-center gap-4">
                <div
                    className="w-12 h-12 flex items-center justify-center bg-green-600 text-white rounded-full font-bold"
                    style={{ fontSize: '24px' }}
                >
                    {userInitial}
                </div>
                <div className="user-name text-white text-lg font-semibold">
                    {userName}
                </div>
            </div> */}
        </div>
    );
};

export default Navbar;
