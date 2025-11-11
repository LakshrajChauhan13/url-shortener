import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { signUpUser } from '../api/user.api';

const SignUpForm = ({ setIsSignUp }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [focused, setFocused] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await signUpUser(formData.name, formData.email, formData.password);
      setSuccess('Account created successfully! Please sign in.');
      setTimeout(() => {
        setIsSignUp(false);
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Name Field */}
      <div className="relative">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onFocus={() => setFocused('name')}
          onBlur={() => setFocused('')}
          placeholder="Full Name"
          required
          className={`w-full px-4 py-3 bg-slate-50/80 backdrop-blur-sm border-2 rounded-xl text-slate-900 placeholder-slate-400 outline-none transition-all duration-300 ${
            focused === 'name' 
              ? 'border-slate-400 bg-white/90 shadow-lg transform scale-[1.02]' 
              : 'border-slate-200 hover:border-slate-300'
          }`}
        />
      </div>

      {/* Email Field */}
      <div className="relative">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
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
      </div>

      {/* Password Field */}
      <div className="relative">
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
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
      </div>

      {/* Confirm Password Field */}
      <div className="relative">
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
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
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 rounded-xl text-sm"
        >
          {error}
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
        disabled={loading}
        className="w-full bg-linear-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] disabled:scale-100 disabled:translate-y-0 shadow-lg hover:shadow-xl"
      >
        {loading ? (
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