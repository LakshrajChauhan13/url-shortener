// Frontend/src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate, useRouter } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUser } from '../api/user.api';
import { logout } from '../store/slice/authSlice';
import { useQueryClient } from '@tanstack/react-query';

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
   
   const handleLogOut = () => {
      signOutUser() ;
      dispatch(logout()) ;
      queryClient.removeQueries({ queryKey: ['currentUser'] });
      navigate({ to : "/auth"}) ;
   }

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - App Name/Logo */}
          <Link to={ isAuthenticated ? "/dashboard" : "/"} className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-linear-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <span className="text-xl font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
              Oorly
            </span>
          </Link>

          {/* Right side - Auth buttons */} 
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`px-4 py-2 rounded-lg text-xl transition-all duration-300 font-medium ${
                    currentPath === '/dashboard' 
                      ? 'text-slate-900 bg-slate-100' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                Dashboard
                </Link>
                <button
                  onClick={handleLogOut}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
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
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
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