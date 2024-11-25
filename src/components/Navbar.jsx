import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='bg-green-50 h-16 w-full flex justify-around items-center'>
            <NavLink to={'/user'}>
                <div className="logo font-extrabold text-xl font-sans text-green-400 drop-shadow">Route Manager</div>
            </NavLink>
            <div className="buttons flex justify-between items-center gap-5">
                <NavLink to={'/user/auth/login'}>
                    <div className="btn py-1 px-2 border rounded bg-slate-400 hover:bg-slate-300 cursor-pointer font-bold">Log In</div>
                </NavLink>
                <NavLink to={'/user/auth/signup'}>
                    <div className="btn py-1 px-2 border rounded bg-slate-400 hover:bg-slate-300 cursor-pointer font-bold">Sign Up</div>
                </NavLink>
            </div>
        </div>
    )
}

export default Navbar
