import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { createShortUrlApi } from '../../api/shortUrl.api';

const DashboardUrlForm = ({ onSuccess }) => {
  const { isAuthenticated } = useSelector(state => state.auth);
  
  const [url, setUrl] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [useCustom, setUseCustom] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const { shortUrl: newShortUrl } = await createShortUrlApi(
        url, 
        isAuthenticated, 
        useCustom ? customUrl : null
      );
      
      setSuccess(`✅ Short URL created: ${newShortUrl}`);
      
      // Reset form
      setUrl('');
      setCustomUrl('');
      setUseCustom(false);
      
      // Trigger parent refetch after delay
      setTimeout(() => {
        onSuccess();
        setSuccess('');
      }, 2000);
      
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to create URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 border  border-slate-200 lg:sticky lg:top-24">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Create Short URL
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Original URL Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Enter your long URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/very/long/url"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all duration-200 hover:border-slate-300"
              required
            />
          </div>

          {/* Custom URL Toggle */}
          <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <input
              type="checkbox"
              id="useCustom"
              checked={useCustom}
              onChange={(e) => setUseCustom(e.target.checked)}
              className="w-5 h-5 text-slate-900 rounded focus:ring-slate-900 cursor-pointer"
            />
            <label htmlFor="useCustom" className="text-sm font-medium text-slate-700 cursor-pointer flex-1">
              Use custom URL (optional)
            </label>
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          {/* Custom URL Input (Animated) */}
          <AnimatePresence>
            {useCustom && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Custom short URL
                </label>
                <div className="flex items-center border-2 border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-slate-900 focus-within:border-transparent transition-all">
                  <span className="px-4 py-3 bg-slate-100 text-slate-600 text-sm font-mono border-r border-slate-200">
                    localhost:3000/
                  </span>
                  <input
                    type="text"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="my-custom-link"
                    className="flex-1 px-4 py-3 outline-none"
                    pattern="[a-zA-Z0-9-_]+"
                    title="Only letters, numbers, hyphens, and underscores allowed"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium">{error}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Message */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm font-medium">{success}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Creating...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span>Create Short URL</span>
              </div>
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default DashboardUrlForm;