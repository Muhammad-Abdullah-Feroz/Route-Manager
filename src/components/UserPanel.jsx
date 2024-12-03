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
import { GoSidebarCollapse, GoSidebarExpand } from 'react-icons/go';
import { GrMapLocation } from 'react-icons/gr';
import Tracking from './Tracking';

const UserPanel = () => {
  const [selectedView, setSelectedView] = useState('dashboard'); // Default view is Dashboard
  const navigate = useNavigate();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const handleSidebarClick = (view) => {
    setSelectedView(view);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout ?")){
      localStorage.removeItem('token');  
      navigate("/user/auth/login");
    }
  }

  const handleSidebarToggle = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };


  return (
    <div className="h-screen overflow-hidden flex flex-col bg-gray-100">
      {/* Navbar */}
      <Navbar/>

      {/* Main Content */}
      <div className="flex flex-1 overflow-x-auto text-lg font-medium">
        {/* Sidebar */}
        <aside className={`relative mr-10 bg-gradient-to-b from-blue-800 via-blue-600 to-blue-600 text-white h-full transition-all duration-300 ${isSidebarExpanded ? 'w-56' : 'w-16'}`}>

            <button className=" absolute -right-7 top-3 flex items-center my-2 gap-2" onClick={handleSidebarToggle}>
              {isSidebarExpanded?
              <GoSidebarExpand size={22} className='text-blue-600 font-extrabold'/>:
              <GoSidebarCollapse size={22} className='text-blue-600 font-extrabold'/>}
            </button>
          <nav className="mt-4">
            <ul>
              <li onClick={() => handleSidebarClick('dashboard')} className={`cursor-pointer p-2 my-1 mx-3 rounded-md ${isSidebarExpanded?'':'my-[20px]'}  hover:bg-blue-400`}>
                <button className="flex items-center gap-2"><AiOutlineDashboard className={`${isSidebarExpanded?'size-4':'size-6'}`}/>{isSidebarExpanded && <span>Dashboard</span>}</button>
              </li>
              <li onClick={() => handleSidebarClick('routeTrack')} className={`cursor-pointer p-2 my-1 mx-3 rounded-md ${isSidebarExpanded?'':'my-[20px]'}  hover:bg-blue-400`}>
                <button className="flex items-center gap-2"><GrMapLocation className={`${isSidebarExpanded?'size-4':'size-6'}`}/>{isSidebarExpanded && <span>Route Track</span>}</button>
              </li>
              <li onClick={() => handleSidebarClick('routes')} className={`cursor-pointer p-2 my-1 mx-3 rounded-md ${isSidebarExpanded?'':'my-[20px]'}  hover:bg-blue-400`}>
                <button className="flex items-center  gap-2">  <MdOutlineDirectionsBus  className={`${isSidebarExpanded?'size-4':'size-6'}`} />{isSidebarExpanded && <span>View Routes</span>}</button>
              </li>
              <li onClick={() => handleSidebarClick('logComplaint')} className={`cursor-pointer p-2 my-1 mx-3 rounded-md ${isSidebarExpanded?'':'my-[20px]'}  hover:bg-blue-400`}>
                <button className="flex items-center gap-2"><BiMessageSquareError  className={`${isSidebarExpanded?'size-4':'size-6'}`} />{isSidebarExpanded && <span>Complaint</span>}</button>
              </li>
              <li onClick={() => handleSidebarClick('profile')} className={`cursor-pointer p-2 my-1 mx-3 rounded-md ${isSidebarExpanded?'':'my-[20px]'}  hover:bg-blue-400`}>
                <button className="flex items-center  gap-2"><BsPerson className={`${isSidebarExpanded?'size-4':'size-6'}`} />{isSidebarExpanded && <span>Profile</span>}</button>
              </li>
              <li onClick={()=>handleLogout()} className={`cursor-pointer p-2 my-1 mx-3 rounded-md ${isSidebarExpanded?'':'my-[20px]'}  hover:bg-blue-400`}>
                <button className="flex items-center gap-2">
                  <BiLogOut className={`${isSidebarExpanded?'size-4':'size-6'}`}/>{isSidebarExpanded && <span>Logout</span>} 
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          {/* Conditionally render content based on selected view */}
          {selectedView === 'dashboard' && <UserDashboard  />}
          {selectedView === 'routeTrack' && <Tracking />}
          {selectedView === 'routes' && <ViewRoutes />}
          {selectedView === 'logComplaint' && <LogComplaint />}
          {selectedView === 'profile' && <Profile />}
        </main>
      </div>
    </div>
  );
};

export default UserPanel;
