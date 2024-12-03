import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { messageToast, messageToastError } from '../handlers/messageToast';

import mainLogo from '../assets/logo.png'; 
import { useForm } from 'react-hook-form';
import { BiLeftArrow, BiLeftArrowAlt } from 'react-icons/bi';

const ProfileSection = () => {
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [Info, setInfo] = useState({
    fullName: '',
    email: '',
    phone_no: '',
    address: '',
  });
  const [isEdit,setIsEdit]=useState(false)
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
        // console.log(d);
        
        setInfo({
          fullName: d.username,
          email: d.email,
          phone_no: d.phone_no,
          address: d.address,
        });
        setValue('fullName', d.username);
          setValue('email', d.email);
          setValue('phone_no', d.phone_no);
          setValue('address', d.address);

       console.log(Info,"register");
       
      }
    } catch (error) {
      messageToastError("Something went wrong, please login again");
      console.error(error);
      
    }
  };

  fetchData()
},[setValue]);


const onSubmit = async (data) => {
  try {
    const token = localStorage.getItem('token');
    const profileData = {
      name: data.fullName,
      phone_no: data.phone_no,
      address: data.address,
    }
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/edit-profile/${token}`, profileData);
    console.log("Res",response.data);
    if (response.data.success) {
      messageToast('Profile updated successfully');
    }
  } catch (error) {
    console.error(error);
    messageToastError('Failed to update profile');
  }
};


const handleLogout=()=>{
  if (window.confirm("Are you sure you want to logout ?")){
    localStorage.removeItem('token');  
    navigate("/user/auth/login");
  }
}
 

  const GoToBack=()=>{
    setIsEdit(false)
    setValue('fullName', Info.fullName);
    setValue('phone_no', Info.phone_no);
    setValue('address', Info.address);
    
  }

  return (
    <>
    {/* Profile Section */}
    {isEdit ? (
      <>
      
      <div className="w-full bg-gray-100 p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="relative flex flex-col gap-6 bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
      <span className='absolute cursor-pointer hover:text-gray-600' onClick={GoToBack}><BiLeftArrowAlt size={35}/></span>
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Update Profile</h1>
        <div className="flex flex-col">
          <label htmlFor="fullName" className="text-md font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            id="fullName"
            {...register('fullName', { required: 'Full Name is required' })}
            className="p-2 font-light rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
          {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone_no" className="text-md font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            id="phone_no"
            {...register("phone_no", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{11}$/,
                message: "Invalid phone number format",
              },
            })}
            className="p-2 rounded font-light border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
          {errors.phone_no && <p className="text-sm text-red-500 mt-1">{errors.phone_no.message}</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="address" className="text-md font-medium text-gray-700">Address</label>
          <input
            type="text"
            id="address"
            {...register('address', { required: 'Address is required' })}
            className="p-2 rounded border font-light border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
          {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address.message}</p>}
        </div>
        <button
          type="submit"
          className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
        >
          Update Profile
        </button>
      </form>
      
    </div>
      </>
    ):(
      <>
          <div className="w-full bg-gray-100 p-8 ">
      <div className="bg-white  rounded-3xl shadow-lg max-w-4xl px-16 py-10 mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col items-center justify-center space-x-6 mt-6">
          
      <img src={mainLogo} alt="Main Logo" className="h-30 w-48 mb-2 " />
      <h2 className="text-3xl font-bold text-gray-800">Welcome, {Info.fullName}</h2>
            <p className="text-lg text-gray-600">{Info.email}</p>
        
        </div>

       

        {/* Contact Info */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h3>
          <p className="text-gray-700 font-normal"><strong>Phone: </strong>{Info.phone_no}</p>
          <p className="text-gray-700 font-normal"><strong>Address: </strong>{Info.address}</p>
        </div>

   
        {/* Profile Actions */}
        <div className="flex justify-center gap-8 mt-6">
          <button 
            className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            onClick={() => setIsEdit(true)}
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

      
      </div>
    </div>
    </>  
  )
    }
  
  </>
  );
};

export default ProfileSection;
