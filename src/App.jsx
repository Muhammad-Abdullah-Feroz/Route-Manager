import { useEffect, useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Signup from './components/Signup'
import Forget from './components/Forget'
import Complaint from './components/LogComplaint'
import AdminPanel from './components/AdminPanel'
import EditRouteForm from './components/EditRouteForm'
import AddRouteForm from './components/AddRouteForm'
import AddStopForm from './components/AddStopForm'
import UserPanel from './components/UserPanel'
import { ToastContainer } from 'react-toastify'
import EmailVerifcation from './components/EmailVerifcation'
import Loading from './components/Loading'
import UserAuthMiddleware from './components/middleware/UserAuth'
import ResetPassword from './components/ResetPassword'
import AdminLogIn from './components/AdminLogIn'
import AdminAuthMiddleware from './components/middleware/AdminAuth'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <UserAuthMiddleware><UserPanel /></UserAuthMiddleware>
    },
    {
      path: '/user',
      element: <UserAuthMiddleware><UserPanel /></UserAuthMiddleware>
    },   
     {
      path: '/user/auth/login',
      element: <><Login /></>
    },
    {
      path: '/user/auth/signup',
      element: <><Signup /></>
    },
    {
      path:"/user/auth/verify/:slug",
      element:<EmailVerifcation/>
    },
    {
      path: '/user/auth/forget',
      element: <><Forget /></>
    },
    {
      path: '/user/auth/forget/verify/:slug',
      element:<ResetPassword/>
    },
    {
      path: '/admin/add-route',
      element: <AdminAuthMiddleware><AddRouteForm /></AdminAuthMiddleware>
    },
    {
      path: '/admin/add-stop',
      element: <AdminAuthMiddleware><AddStopForm /></AdminAuthMiddleware>
    },
    {
      path: '/admin/edit/:id',
      element: <AdminAuthMiddleware><EditRouteForm /></AdminAuthMiddleware>
    },
    {
      path: '/_admin/admin-dashboard',
      element: <AdminAuthMiddleware><AdminPanel /></AdminAuthMiddleware>
    },
    {
      path:'/admin/auth/login',
      element:<AdminLogIn/>
    },
    {
      path: '/complaint',
      element: <><Navbar/><Complaint /></>
    },

   

 
  ])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer/>
    </>
  )
}

export default App
