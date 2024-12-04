import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserAuthMiddleware = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/user/auth/login');
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/${ token }`);
        console.log(response.data);
        
        if (!response.data.success) {
          localStorage.removeItem('token');
            navigate('/user/auth/login');
        }else{
          console.log(response.data.data);
        }
      } catch (error) {
        localStorage.removeItem('token');
       
        navigate('/user/auth/login');
      }
    };

    checkToken();
  }, [navigate]);

  return children;
};

export default UserAuthMiddleware;