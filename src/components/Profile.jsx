import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaSignOutAlt, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import mainLogo from '../assets/logo.png'; 

const ProfileSection = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 123 456 7890",
    address: "123 Main St, City, Country",
  });
useEffect(() => {
  const fetchData = async() => {
    
    const token=localStorage.getItem('token')
    console.log(token);
    if (!token) {
      navigate('user/auth/login');
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/${ token }`);
      console.log(response.data);
      
      if (response.data.success) {
        const d=response.data.data
        setUserData({
          name:d.username,
          email:d.email,
          phone:d.phone_no,
          address:d.address
        })
       console.log(response.data.data);
       
      }
    } catch (error) {
      console.error(error);
      
    }
  };

  fetchData()
},[])


const handleLogout=()=>{
  if (window.confirm("Are you sure you want to logout ?")){
    localStorage.removeItem('token');  
    navigate("/user/auth/login");
  }
}
 

  // const handleUpdatePassword = () => {
  //   // Implement logic to update password
  //   alert("Update Password functionality here.");
  // };

  return (
    <div className="w-full  overflow-x-hidden  bg-gray-100 ml-[15%] my-[5%] ">
      <div className="bg-white  rounded-3xl shadow-lg max-w-4xl px-20 py-10">
        {/* Profile Header */}
        <div className="flex flex-col items-center justify-center space-x-6 mt-6">
          
      <img src={mainLogo} alt="Main Logo" className="h-30 w-48 mb-2 " />
      <h2 className="text-3xl font-bold text-gray-800">Welcome, {userData.name}</h2>
            <p className="text-lg text-gray-600">{userData.email}</p>
        
        </div>

        {/* Bio */}
        <div className="mt-2 text-center">
          <p className="text-gray-700 text-lg">{userData.bio}</p>
        </div>

        {/* Contact Info */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h3>
          <p className="text-gray-700"><strong>Phone: </strong>{userData.phone}</p>
          <p className="text-gray-700"><strong>Address: </strong>{userData.address}</p>
        </div>

   
        {/* Profile Actions */}
        <div className="flex justify-center gap-8 mt-6">
          <button 
            className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            onClick={() => alert("Edit Profile functionality will go here.")}
          >
            <FaEdit />
            Edit Profile
          </button>
          <button 
            className="flex items-center gap-2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>

        {/* Password Update
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Password Update</h3>
          <button 
            className="flex items-center gap-2 bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700"
            onClick={handleUpdatePassword}
          >
            <FaLock />
            Update Password
          </button>
        </div> */}

      </div>
    </div>
  );
};

export default ProfileSection;
