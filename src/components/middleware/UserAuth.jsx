import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading";

const UserAuthMiddleware = ({ children }) => {
  const navigate = useNavigate();
  const [isLoad, setIsLoad ] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      setIsLoad(true);
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/user/auth/login");
        // return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/${token}`
        );
        console.log(response.data);

        if (!response.data.success) {
          localStorage.removeItem("token");
          navigate("/user/auth/login");
        } else {
          console.log(response.data.data);
          setIsLoad(false);
        }
      } catch (error) {
        localStorage.removeItem("token");

        navigate("/user/auth/login");
      }
    };

    checkToken();
  }, [navigate]);
  if (isLoad) {
    return <Loading />;
  } else {
    return children;
  }
};

export default UserAuthMiddleware;
