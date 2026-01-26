import React, { useEffect } from 'react'
import { Outlet, useLocation } from '@tanstack/react-router'
import Navbar from './components/NavBar'
import { AuthProvider } from './components/AuthProvider'
import { Toaster } from 'sonner'
import LenisScroll from './components/LenisScroll'

const AppRootLayout = () => {

  const location = useLocation()

  const tabTitle = {
    "/auth" : "Auth - OORLY",
    "/dashboard" : "Dashboard - OORLY",
    "/" : "Oorly | A URL Shortener App" 
  }

  useEffect(() => {
    document.title = tabTitle[location.pathname] || "Oorly | A URL Shortener App" 
  }, [location.pathname])

  return (
    <AuthProvider>
      <LenisScroll />
      <div className='h-screen selection:bg-neutral-200 selection:text-neutral-950'>
        <Navbar />
        <Outlet />
        <Toaster  />
      </div>
    </AuthProvider>
  )
}

export default AppRootLayout