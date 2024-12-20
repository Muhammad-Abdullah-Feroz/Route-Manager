import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { messageToastError } from '../../handlers/messageToast';
import Loading from '../Loading';

// eslint-disable-next-line react/prop-types
const DriverAuthMiddleware = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading,setIsLoading]=useState(true);
  const [driverData,setDriverData]=useState(null);

  useEffect(() => {
    const checkToken = async () => {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/driver/auth/login');
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/driver/_d/${ token }`);
        console.log(response.data);
        
        if (!response.data.success) {
          localStorage.removeItem('token');
          // messageToastError("Something went wrong! Please login Again To Continue")
            navigate('/driver/auth/login');
        }
        
        if(response.data.success){
          console.log(response.data.data);
          setDriverData(response.data.data);
          setIsLoading(false);
        }
      } catch (err) {
        localStorage.removeItem('token');
        // messageToastError("Something went wrong! Please login Again To Continue")
        navigate('/driver/auth/login');
      }
    };

    checkToken();
  }, [navigate]);

  if(isLoading){
    return <Loading/>
  }else{
    
    return React.cloneElement(children, { driverData });
  }

};

export default DriverAuthMiddleware;