import React, { useState } from 'react';
import { BiLogOut, BiMessageSquareError } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import UserDashboard from './UserDashboard';
import ViewRoutes from './ViewRoutes';
import LogComplaint from './LogComplaint';
import Profile from './Profile';
import Navbar from './Navbar';
import { AiOutlineDashboard } from 'react-icons/ai';
import { MdOutlineDirectionsBus } from 'react-icons/md';
import { BsPerson } from 'react-icons/bs';

const UserPanel = () => {
  const [selectedView, setSelectedView] = useState('dashboard'); // Default view is Dashboard
  const navigate = useNavigate();

  const handleSidebarClick = (view) => {
    setSelectedView(view);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout ?")){
      localStorage.removeItem('token');  
      navigate("/user/auth/login");
    }
  }
  


  return (
    <div className="h-screen overflow-hidden flex flex-col bg-gray-100">
      {/* Navbar */}
      <Navbar/>

      {/* Main Content */}
      <div className="flex flex-1 overflow-x-auto text-lg font-medium">
        {/* Sidebar */}
        <aside className="w-64 bg-gradient-to-b from-blue-800 via-blue-600 to-blue-600 text-white h-full">
          <nav className="mt-4">
            <ul>
              <li onClick={() => handleSidebarClick('dashboard')} className="cursor-pointer p-3 hover:bg-blue-700 border-b-2 border-gray-500">
                <button className="flex items-center my-2 gap-2"><AiOutlineDashboard/>Dashboard</button>
              </li>
              <li onClick={() => handleSidebarClick('routes')} className="cursor-pointer p-3 hover:bg-blue-700 border-b-2 border-gray-500">
                <button className="flex items-center my-2 gap-2">  <MdOutlineDirectionsBus  />View Routes</button>
              </li>
              <li onClick={() => handleSidebarClick('logComplaint')} className="cursor-pointer p-3 hover:bg-blue-700 border-b-2 border-gray-500">
                <button className="flex items-center my-2 gap-2"><BiMessageSquareError  /> Complaint</button>
              </li>
              <li onClick={() => handleSidebarClick('profile')} className="cursor-pointer p-3 hover:bg-blue-700 border-b-2 border-gray-500">
                <button className="flex items-center my-2 gap-2"><BsPerson />Profile</button>
              </li>
              <li onClick={()=>handleLogout()} className="cursor-pointer p-3 hover:bg-blue-700 border-b-2 border-gray-500">
                <button className="flex items-center gap-2">
                  <BiLogOut /> Logout
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          {/* Conditionally render content based on selected view */}
          {selectedView === 'dashboard' && <UserDashboard  />}
          {selectedView === 'routes' && <ViewRoutes />}
          {selectedView === 'logComplaint' && <LogComplaint />}
          {selectedView === 'profile' && <Profile />}
        </main>
      </div>
    </div>
  );
};

export default UserPanel;
