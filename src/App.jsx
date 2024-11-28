import { useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Signup from './components/Signup'
import Forget from './components/Forget'
import Main from './components/Main'
import Complaint from './components/complaint'
import AdminPanel from './components/AdminPanel'
import EditRouteForm from './components/EditRouteForm'
import AddRouteForm from './components/AddRouteForm'
import AddStopForm from './components/AddStopForm'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <><Login /></>
    },
    {
      path: '/user',
      element: <><Navbar /><Main /></>
    },
    {
      path: '/admin/add-route',
      element: <><AddRouteForm /></>
    },
    {
      path: '/admin/add-stop',
      element: <><AddStopForm /></>
    },
    {
      path: '/admin/edit/:id',
      element: <><EditRouteForm /></>
    },
    {
      path: '/admin',
      element: <><AdminPanel /></>
    },
    {
      path: '/complaint',
      element: <><Navbar/><Complaint /></>
    },
    {
      path: '/user/auth/login',
      element: <><Login /></>
    },
    {
      path:"/user/auth/verify/:slug"
    },
    {
      path: '/user/auth/signup',
      element: <><Signup /></>
    },
    {
      path: '/user/auth/forget',
      element: <><Forget /></>
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
