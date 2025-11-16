import React, { useState, useEffect } from 'react';
import UrlForm from     '../components/UrlForm.jsx';
import axios from 'axios';
import { createShortUrlApi } from '../api/shortUrl.api.js';
import { useSelector } from 'react-redux';


const HomePage = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [focused, setFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { isAuthenticated } = useSelector(state => state.auth)
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    setError('');
    
    try {
      const {shortUrl , status} = await createShortUrlApi(url , isAuthenticated )  // axios call
    
      if (status === 200) {
        setShortUrl(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/${shortUrl}`)
      } else { 
        setError('Failed to create short URL')
      }
    } catch (err) {
      setError('Network error occurred')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      alert('Failed to copy!')
    }
  }

  const resetForm = () => {
    setUrl('')
    setShortUrl('')
    setError('')
    setCopied(false)
  }

  return (
    <div className="h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4 overflow-hidden">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-50 rounded-full opacity-40 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-slate-50 rounded-full opacity-40 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-indigo-50 rounded-full opacity-30 blur-2xl animate-bounce delay-500"></div>
      </div>

      <div className={`relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50 p-8 w-full max-w-md transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
      }`}>
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-linear-to-br from-slate-800 to-slate-900 rounded-2xl mb-4 group hover:scale-110 hover:rotate-3 transition-all duration-300 shadow-lg hover:shadow-xl">
            <svg className="w-7 h-7 text-white group-hover:scale-110 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 hover:text-slate-700 transition-colors duration-300">
            URL Shortener
          </h1>
          <p className="text-slate-600 text-sm animate-fade-in delay-300">Create clean, shareable links in seconds</p>
        </div>
        
        <UrlForm  handleSubmit={handleSubmit} setFocused={setFocused} focused={focused} setLoading={setLoading} loading={loading} setUrl={setUrl} url={url} resetForm={resetForm} />
        { isAuthenticated && <input type='text' className='bg-red-400 w-full mt-2.5 mb-2.5 ' 
        />}

        {error && (
          <div className="mt-6 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 rounded-xl animate-in slide-in-from-top-4 duration-500 hover:bg-red-50 transition-colors">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-red-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">{error}</span>
            </div>
          </div>
        )}

        {shortUrl && (
          <div className="mt-6 p-5 bg-green-50/80 backdrop-blur-sm border border-green-200 rounded-xl animate-in slide-in-from-bottom-4 duration-500 hover:bg-green-50 transition-colors hover:scale-[1.01] hover:shadow-md">
            <div className="flex items-center space-x-2 mb-4">
              <svg className="w-5 h-5 text-green-600 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-green-800 font-semibold text-sm">Link created successfully!</p>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={shortUrl}
                readOnly
                className="flex-1 px-4 py-3 bg-white/80 backdrop-blur-sm border border-green-200 rounded-lg text-slate-700 text-sm font-mono selection:bg-green-200 hover:bg-white transition-colors focus:ring-2 focus:ring-green-300"
              />
              <button
                onClick={copyToClipboard}
                className={`px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-110 active:scale-95 relative overflow-hidden group ${
                  copied 
                    ? 'bg-green-600 text-white shadow-lg' 
                    : 'bg-slate-900 hover:bg-slate-800 text-white shadow-md hover:shadow-lg'
                }`}
              >
                <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                {copied ? (
                  <div className="flex items-center space-x-1 animate-in zoom-in duration-200">
                    <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Copied!</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1 group-hover:scale-105 transition-transform duration-200">
                    <svg className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Copy</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        )}




        {/* Enhanced Footer */}
        <div className="mt-8 text-center">
          <p className="text-slate-400 text-xs hover:text-slate-500 transition-colors duration-200 cursor-default">
            Fast • Secure • Simple
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomePage


// update dashboard page , where we user can create short urls and cutom urls if want ,see his name at the place of dashboard in the nav bar, ofcouse if user is authenticated , user will see his name instead of the dashboard text and onclick to the bitly logo will back to the dashboard page instead of the homepage of course