import React, { useState } from 'react';
import { FaEdit, FaSignOutAlt, FaCameraRetro, FaLock } from 'react-icons/fa';

const ProfileSection = () => {
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    bio: "Student at XYZ University, Bus Route Manager App User",
    profilePicture: "https://via.placeholder.com/150",
    phone: "+1 123 456 7890",
    address: "123 Main St, City, Country",
    lastLogin: "November 28, 2024, 2:00 PM"
  });

  const handleLogout = () => {
    // Implement logout functionality here
    console.log("Logging out...");
  };

  const handleChangePicture = () => {
    // Implement logic to change profile picture
    alert("Change Profile Picture functionality here.");
  };

  const handleUpdatePassword = () => {
    // Implement logic to update password
    alert("Update Password functionality here.");
  };

  return (
    <div className="w-full h-[89vh] bg-gray-100 p-5">
      <div className="bg-white p-6 rounded-3xl shadow-lg max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex items-center justify-center space-x-6">
          <div className="relative">
            <img 
              src={userData.profilePicture} 
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-blue-600" 
            />
            <button 
              className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
              onClick={handleChangePicture}
            >
              <FaCameraRetro />
            </button>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{userData.name}</h2>
            <p className="text-lg text-gray-600">{userData.email}</p>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-6 text-center">
          <p className="text-gray-700 text-lg">{userData.bio}</p>
        </div>

        {/* Contact Info */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h3>
          <p className="text-gray-700"><strong>Phone: </strong>{userData.phone}</p>
          <p className="text-gray-700"><strong>Address: </strong>{userData.address}</p>
        </div>

        {/* Account Details */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Account Details</h3>
          <p className="text-gray-700"><strong>Last Login: </strong>{userData.lastLogin}</p>
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

        {/* Password Update */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Password Update</h3>
          <button 
            className="flex items-center gap-2 bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700"
            onClick={handleUpdatePassword}
          >
            <FaLock />
            Update Password
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProfileSection;
