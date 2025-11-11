import React from 'react'

const UrlForm = ({handleSubmit , focused ,setFocused ,setLoading ,loading , setUrl, url, resetForm}) => {
  return (
    <>
    <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <div className={`absolute inset-0 bg-linear-to-r from-blue-500/20 to-indigo-500/20 rounded-xl blur-sm transition-opacity duration-300 ${
              focused ? 'opacity-100' : 'opacity-0'
            }`}></div>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Enter your URL here..."
              className={`relative w-full px-5 py-4 bg-slate-50/80 backdrop-blur-sm border-2 rounded-xl text-slate-900 placeholder-slate-400 outline-none transition-all duration-300 ${
                focused 
                  ? 'border-slate-900 bg-white/90 shadow-lg transform scale-[1.02]' 
                  : 'border-slate-200 hover:border-slate-300 hover:bg-white/60'
              }`}
              required
            />
            {url && (
              <button
                type="button"
                onClick={resetForm}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-all duration-200 hover:scale-125 hover:rotate-90 p-1 rounded-full hover:bg-slate-100"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.98] disabled:scale-100 disabled:translate-y-0 shadow-lg hover:shadow-xl group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span className="animate-pulse">Creating link...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2 group-hover:scale-105 transition-transform duration-200">
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Shorten URL</span>
              </div>
            )}
          </button>
        </form>
    </>
  )
}

export default UrlForm