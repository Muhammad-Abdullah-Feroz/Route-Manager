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
      path: '/',
      element: <><Navbar /><Main /></>
    },
    {
      path: '/auth',
      element: <><Navbar /><Login /></>
    },
    {
      path: '/auth/login',
      element: <><Navbar /><Login /></>
    },
    {
      path: '/auth/signup',
      element: <><Navbar /><Signup /></>
    },
    {
      path: '/auth/login/forget',
      element: <><Navbar /><Forget /></>
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
