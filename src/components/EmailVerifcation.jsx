import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { MdOutlineVerified, MdErrorOutline } from 'react-icons/md';

const EmailVerification = () => {
  const { slug } = useParams();
  const navigate=useNavigate()
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/verify/${slug}`);
        setVerificationStatus(response.data.success);
      } catch (error) {
        setVerificationStatus(false);
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [slug]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen bg-blue-100">Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-blue-100">
      {verificationStatus ? (
        <>
          <MdOutlineVerified size={100} className="text-green-500" />
          <h1 className="text-2xl font-bold text-gray-700 mt-4">Email Verified Successfully</h1>
          <button
            onClick={() => navigate('/user')}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
          >
            Go to Dashboard
          </button>
        </>
      ) : (
        <>
          <MdErrorOutline size={100} className="text-red-500" />
          <h1 className="text-2xl font-bold text-gray-700 mt-4">Email Verification Failed</h1>
          <button
            onClick={() => navigate('/user/auth/login')}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
          >
            login to get a new verification link
          </button>
        </>
      )}
    </div>
  );
};

export default EmailVerification;