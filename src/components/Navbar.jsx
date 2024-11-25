import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="bg-gradient-to-r from-green-400 to-blue-500 h-16 w-full flex justify-between items-center px-8 shadow-md">
            {/* Logo */}
            <NavLink to={'/user'}>
                <div className="logo text-2xl font-extrabold text-white drop-shadow-lg">
                    Route Manager
                </div>
            </NavLink>

            {/* Buttons Section */}
            <div className="buttons flex gap-6">
                <NavLink to={'/user/auth/login'}>
                    <div className="btn py-2 px-4 rounded-md bg-white text-green-500 font-semibold hover:bg-green-100 hover:text-green-700 transition duration-300">
                        Log In
                    </div>
                </NavLink>
                <NavLink to={'/user/auth/signup'}>
                    <div className="btn py-2 px-4 rounded-md bg-white text-green-500 font-semibold hover:bg-green-100 hover:text-green-700 transition duration-300">
                        Sign Up
                    </div>
                </NavLink>
            </div>
        </div>
    )
}

export default Navbar
