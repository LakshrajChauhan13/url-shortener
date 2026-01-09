import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { signUpUser } from '../api/user.api';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { safeSignUpSchema } from '../zod/zod.user';
import { useMutation } from '@tanstack/react-query';
import EyeIcon from '@/icons/EyeIcon';
import EyeHideIcon from '@/icons/EyeHideIcon';

const SignUpForm = ({ setIsSignUp }) => {
  
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState('');
  const [focused, setFocused] = useState('');
  const [passwordShown, setPasswordShown] = useState(false)
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false)

  const signUpMutation = useMutation({
    mutationFn: (data) => signUpUser(data.name, data.email, data.password),
    onSuccess: (data) => {
      setSuccess('Account created successfully! Please sign in.')
      setTimeout(() => {
        setIsSignUp(false);
      }, 2000);
      console.log(data)
    },
    onError: (error) => {
      setServerError(error.message)
      console.log(error.message)
    }

  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(safeSignUpSchema)
  })

  const submitHandler = async (data) => {
    signUpMutation.mutate(data)
  };

  function passwordToggling(){
    setPasswordShown(c => !c)
  }

  function confirmPasswordToggling(){
    setConfirmPasswordShown(c => !c)
  }

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit(submitHandler)}
      className="space-y-6"
    >
      {/* Name Field */}
      <div className="relative">
        <input
          type="text"
          name="name"
          {...register("name")}
          onFocus={() => setFocused('name')}
          onBlur={() => setFocused('')}
          placeholder="Username"
          required
          className={`w-full px-4 py-3 bg-slate-50/80 backdrop-blur-sm border-2 rounded-xl text-slate-900 placeholder-slate-400 outline-none transition-all duration-300 ${
            focused === 'name' 
              ? 'border-slate-400 bg-white/90 shadow-lg transform scale-[1.02]' 
              : 'border-slate-200 hover:border-slate-300'
          }`}
        />
        {errors.name && <span className=' text-red-500 font-semibold text-sm tracking-wide'> {errors.name.message} </span>}
      </div>

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
        {errors.email && <span className=' text-red-500 font-semibold text-sm tracking-wide'> {errors.email.message} </span>}
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
             {passwordShown ? <EyeHideIcon /> : <EyeIcon /> }  
          </button>
        {errors.password && <span className=' text-red-500 font-semibold text-sm tracking-wide'> {errors.password.message} </span>}
      </div>

      {/* Confirm Password Field */}
      <div className="relative">
        <input
          type={`${confirmPasswordShown?'text':'password'}`}
          name="confirmPassword"
          {...register("confirmPassword")}
          onFocus={() => setFocused('confirmPassword')}
          onBlur={() => setFocused('')}
          placeholder="Confirm Password"
          required
          className={`w-full px-4 py-3 bg-slate-50/80 backdrop-blur-sm border-2 rounded-xl text-slate-900 placeholder-slate-400 outline-none transition-all duration-300 ${
            focused === 'confirmPassword' 
              ? 'border-slate-400 bg-white/90 shadow-lg transform scale-[1.02]' 
              : 'border-slate-200 hover:border-slate-300'
          }`}
        />
          <button
          type='button'
          onFocus={() => setFocused('confirmPassword')}
          onBlur={() => setFocused('')}
          onClick={confirmPasswordToggling}
          className={` ${focused === 'confirmPassword' ? 'text-slate-400 scale-[1.1]' : 'text-slate-300 hover:text-slate-500 ' } 
          cursor-pointer transition-all duration-300  absolute top-4 right-3`}>
            {confirmPasswordShown ? <EyeHideIcon /> : <EyeIcon />}
          </button>
        {errors.confirmPassword && <span className=' text-red-500 font-semibold text-sm tracking-wide'> {errors.confirmPassword.message} </span> }
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
        disabled={signUpMutation.isPending}
        className="w-full bg-linear-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] disabled:scale-100 disabled:translate-y-0 shadow-lg hover:shadow-xl"
      >
        {signUpMutation.isPending ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Creating Account...</span>
          </div>
        ) : (
          'Create Account'
        )}
      </button>

      {/* Switch to Sign In */}
      <div className="text-center pt-4">
        <p className="text-slate-600 text-sm">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => setIsSignUp(false)}
            className="text-slate-800 font-semibold hover:text-slate-600 transition-colors duration-200"
          >
            Sign In
          </button>
        </p>
      </div>
    </motion.form>
  );
};

export default SignUpForm;