import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { signInUser } from '../api/user.api';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slice/authSlice';
import { useNavigate } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { safeSignInSchema } from '../zod/zod.user';
import EyeHideIcon from '@/icons/EyeHideIcon';
import EyeIcon from '@/icons/EyeIcon';

const SignInForm = ({ setIsSignUp }) => {

  const [success, setSuccess] = useState('');
  const [focused, setFocused] = useState('');
  const navigate =  useNavigate()
  const auth = useSelector((state) => state.auth)  // to read the store's value
  const dispatch = useDispatch() // to dispatch an event to the reducer so that it can update the store's value
  const queryClient = useQueryClient()
  const [serverError, setServerError] = useState('')
  const [passwordShown, setPasswordShown] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset} = useForm({
    resolver: zodResolver(safeSignInSchema)
  })

  const submitHandler = async (data) => {
      signInMutation.mutate(data)
  };

  const signInMutation = useMutation({
    mutationFn: (data) => signInUser(data.email, data.password),
    onSuccess: (data) => {            // data we got in response 
      setSuccess('Signed in successfully!');
      dispatch(login(data.data.userSafe))
      queryClient.setQueryData(['currentUser'], data.data.userSafe);  // updating react query cache also with new data
      navigate({ to : '/dashboard' })
      console.log(data)
      reset()
    },
    onError: (error) => {
      console.log(error); 
      setServerError(error.message)
      setTimeout(() => {
        setServerError('')
      }, 4000);
    }
  })

  function passwordToggling() {
    setPasswordShown(c => !c)
  }

  return (
    <motion.form
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit(submitHandler)}
      className="space-y-6"
    >
      {/* Email Field */}
      <div className="relative">
        <input
          type="email"
          name="email"
          {...register("email")}
          onFocus={() => setFocused('email')}
          onBlur={() => setFocused('')}
          placeholder="Email Address"
          required
          className={`w-full px-4 py-3 bg-slate-50/80 backdrop-blur-sm border-2 rounded-xl text-slate-900 placeholder-slate-400 outline-none transition-all duration-300 ${
            focused === 'email' 
              ? 'border-slate-400 bg-white/90 shadow-lg transform scale-[1.02]' 
              : 'border-slate-200 hover:border-slate-300'
          }`}
        />
        {errors.email && <span className='text-sm text-red-500 font-semibold tracking-wide'> {errors.email.message} </span>}
      </div>

      {/* Password Field */}
      <div className="relative">
        <input
          type={`${passwordShown?'text':'password'}`}
          name="password"
          {...register("password")}
          onFocus={() => setFocused('password')}
          onBlur={() => setFocused('')}
          placeholder="Password"
          required
          className={`w-full px-4 py-3 bg-slate-50/80 backdrop-blur-sm border-2 rounded-xl text-slate-900 placeholder-slate-400 outline-none transition-all duration-300 ${
            focused === 'password' 
              ? 'border-slate-400 bg-white/90 shadow-lg transform scale-[1.02]' 
              : 'border-slate-200 hover:border-slate-300'
          }`}
        />
          <button 
          type="button"
          onFocus={() => setFocused('password')}
          onBlur={() => setFocused('')} 
          onClick={passwordToggling}
          className={` ${focused === 'password' ? 'text-slate-400 scale-[1.1]' : 'text-slate-300 hover:text-slate-500 ' } 
          cursor-pointer transition-all duration-300  absolute top-4 right-3`}>
             {passwordShown ? <EyeIcon /> : <EyeHideIcon /> }  
          </button>
        {errors.password && <span className='text-sm text-red-500 font-semibold tracking-wide'> {errors.password.message} </span>}
      </div>

      {/* Error Message */}
      {serverError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 rounded-xl text-sm"
        >
          {serverError}
        </motion.div>
      )}

      {/* Success Message */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-green-50/80 backdrop-blur-sm border border-green-200 text-green-700 rounded-xl text-sm"
        >
          {success}
        </motion.div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={signInMutation.isPending}
        className="w-full bg-linear-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] disabled:scale-100 disabled:translate-y-0 shadow-lg hover:shadow-xl"
      >
        {signInMutation.isPending ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Signing In...</span>
          </div>
        ) : (
          'Sign In'
        )}
      </button>

      {/* Forgot Password */}
      {/* <div className="text-center">
        <button
          type="button"
          className="text-slate-600 text-sm hover:text-slate-800 transition-colors duration-200"
        >
          Forgot your password?
        </button>
      </div> */}

      {/* Switch to Sign Up */}
      <div className="text-center pt-4 border-t border-slate-200">
        <p className="text-slate-600 text-sm">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => setIsSignUp(true)}
            className="text-slate-800 font-semibold hover:text-slate-600 transition-colors duration-200"
          >
            Sign Up
          </button>
        </p>
      </div>
    </motion.form>
  );
};

export default SignInForm;