import React from 'react';

const StatsCard = ({ label, value }) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
      <p className="text-slate-300 text-sm font-medium mb-1">{label}</p>
      <p className="text-4xl font-bold">{value}</p>
    </div>
  );
};

export default StatsCard;