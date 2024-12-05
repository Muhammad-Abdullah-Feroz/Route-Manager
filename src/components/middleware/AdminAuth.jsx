import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { messageToastError } from '../../handlers/messageToast';

const AdminAuthMiddleware = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {

        navigate('/admin/auth/login');
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/_t/${ token }`);
        console.log(response.data);
        
        if (!response.data.success) {
          localStorage.removeItem('token');
          messageToastError("Something went wrong! Please login Again To Continue")
            navigate('/admin/auth/login');

        }else{
          console.log(response.data.data);
        }
      } catch (error) {
        localStorage.removeItem('token');
        messageToastError("Something went wrong! Please login Again To Continue")
        navigate('/admin/auth/login');
      }
    };

    checkToken();
  }, [navigate]);

  return children;
};

export default AdminAuthMiddleware;