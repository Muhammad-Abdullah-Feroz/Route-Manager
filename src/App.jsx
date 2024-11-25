import { useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Signup from './components/Signup'
import Forget from './components/Forget'
import Main from './components/Main'

function App() {
  const router = createBrowserRouter([
    {
      path: '/user',
      element: <><Navbar /><Main /></>
    },
    // {
    //   path: '/user/auth',
    //   element: <><Login /></>
    // },
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
