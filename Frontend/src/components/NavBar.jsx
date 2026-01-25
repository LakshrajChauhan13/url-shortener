// Frontend/src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useRouter } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUser } from '../api/user.api';
import { logout } from '../store/slice/authSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Logo from '../../Logo';
import { toast } from 'sonner';

const Navbar = () => {
  const router = useRouter();
  const currentPath = router.state.location.pathname;
  
  const dispatch = useDispatch()
  // Check if user is authenticated (you'll need to implement this based on your auth logic)
   const { isAuthenticated } = useSelector((state) => state.auth); // Replace with actual auth state
   const auth = useSelector((state) => state.auth); // Replace with actual auth state
   console.log(auth)
   const navigate = useNavigate()
   const queryClient = useQueryClient() ; // to remove the query from the cache after the user logs out


   const signOutMutation = useMutation({
      mutationFn: signOutUser,

      onMutate: () => {
        const id = toast.loading("Logging Out ... :(")
        return id
      },
      
      onSuccess:(context) => {
        dispatch(logout()) ;
        toast.dismiss(context.id)
        toast("User has Logged Out")
        localStorage.removeItem("isAuthenticated")
        queryClient.removeQueries({ queryKey: ['currentUser'] });
        navigate({ to : "/auth"}) ;      
      },

      onError: (error, context) => {
        toast.dismiss(context.id)
        toast.error("Failed to logout...")
        console.log(error)
      }
   })
   
   
   const handleLogOut = () => {
      signOutMutation.mutate()
   }

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/80 backdrop-blur-sm border-b z-200 border-slate-200/50 sticky top-0 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center h-16">
          {/* Left side - App Name/Logo */}
          <Link to={ isAuthenticated ? "/dashboard" : "/"} className="flex items-center space-x-2 group">
            <div className=" size-9 sm:size-10 bg-linear-to-br from-slate-800 to-slate-900 sm:rounded-xl rounded-[10px] flex items-center justify-center  transition-transform duration-300 shadow-md">
              <Logo />
            </div>
            <span className="text-xl font-sans-flex sm:text-3xl font-semibold transition-all duration-50 group-hover:font-extrabold  group-hover:scale-100  text-slate-900  ">
              Oorly
            </span>
          </Link>

          {/* Right side - Auth buttons */} 
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`px-4 py-2 rounded-lg text-sm sm:text-xl transition-all duration-300 font-medium ${
                    currentPath === '/dashboard' 
                      ? 'text-slate-900 bg-slate-100' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                Dashboard
                </Link>
                <button
                  onClick={handleLogOut}
                  className="px-5 py-2 bg-slate-900 text-[13px] sm:text-[16px] hover:bg-slate-800 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium transition-colors duration-300"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth"
                  className="px-5 py-2 bg-slate-900 text-[13px] sm:text-[16px] hover:bg-slate-800 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;