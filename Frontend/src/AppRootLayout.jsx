import React from 'react'
import { Outlet } from '@tanstack/react-router'
import Navbar from './components/NavBar'
import { AuthProvider } from './components/AuthProvider'

const AppRootLayout = () => {
  return (
    <AuthProvider>
      <div>
        <Navbar />
        <Outlet />
      </div>
    </AuthProvider>
  )
}

export default AppRootLayout