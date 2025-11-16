import React, { useState } from 'react';
import { motion } from 'framer-motion';

const UrlCard = ({ urlData, index }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="border-2 border-slate-200 rounded-xl p-5 hover:shadow-lg hover:border-slate-300 transition-all duration-300 bg-gradient-to-br from-white to-slate-50"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* URL Info */}
        <div className="md:col-span-7 space-y-3">
          {/* Original URL */}
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
              Original URL
            </p>
            <a
              href={urlData.fullUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-700 hover:text-blue-600 transition-colors line-clamp-1"
              title={urlData.fullUrl}
            >
              {urlData.fullUrl}
            </a>
          </div>

          {/* Short URL */}
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
              Short URL
            </p>
            <div className="flex items-center space-x-2">
              <a
                href={`http://localhost:3000/${urlData.shortUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 font-mono font-semibold hover:underline"
              >
                localhost:3000/{urlData.shortUrl}
              </a>
              <button
                onClick={() => copyToClipboard(`http://localhost:3000/${urlData.shortUrl}`)}
                className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors group"
                title="Copy to clipboard"
              >
                {copied ? (
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Analytics */}
        <div className="md:col-span-5 flex items-center justify-between md:justify-end space-x-6">
          {/* Clicks */}
          <div className="text-center">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
              Clicks
            </p>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
              <p className="text-3xl font-bold text-slate-900">
                {urlData.clicks || 0}
              </p>
            </div>
          </div>

          {/* Created Date */}
          <div className="text-center">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
              Created
            </p>
            <p className="text-xs text-slate-600">
              {formatDate(urlData.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UrlCard;