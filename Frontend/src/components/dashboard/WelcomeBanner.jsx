import React from 'react';
import { motion } from 'framer-motion';
import StatsCard from './StatsCard';

const WelcomeBanner = ({ user, urls = [] }) => {
  const totalClicks = urls.reduce((sum, url) => sum + (url.clicks || 0), 0);
  const avgClicks = urls.length > 0 ? Math.round(totalClicks / urls.length) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 mb-8 text-white overflow-hidden relative"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
          Welcome back, {user?.name || 'User'}! 👋
        </h1>
        <p className="text-slate-300 text-lg mb-6">
          {user?.email}
        </p>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <StatsCard label="Total URLs" value={urls.length} />
          <StatsCard label="Total Clicks" value={totalClicks} />
          <StatsCard label="Avg Clicks/URL" value={avgClicks} />
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeBanner;