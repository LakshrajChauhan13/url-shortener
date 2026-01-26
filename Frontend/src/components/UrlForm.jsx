import CrossIcon from '@/icons/CrossIcon'
import SparkIcon from '@/icons/SparkIcon'
import React from 'react'

const UrlForm = ({handleSubmit , focused ,setFocused ,setLoading ,loading , setUrl, url, resetForm}) => {
  return (
    <>
    <form onSubmit={handleSubmit} className=" sm:flex gap-2 md:max-w-2xl lg:max-w-4xl mx-auto max-w-[410px] sm:mt-10 mt-8 ">
          <div className="relative group flex-1 ">
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
              className={`relative w-full bg-white/80 font-sans-flex px-3 py-3 sm:px-5 sm:py-4 tracking-wider -slate-50/80  backdrop-blur-sm border-2 rounded-xl text-slate-900 placeholder-slate-400 outline-none transition-all duration-300 ${
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
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-all duration-200 hover:scale-125 hover:rotate-90 p-1 rounded-full hover:bg-slate-100 cursor-pointer"
              >
                <CrossIcon />
              </button>
            )}
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="sm:w-[25%] mt-3 sm:mt-0 py-4 w-full bg-slate-900 hover:bg-slate-950 disabled:bg-slate-500 text-white sm:text-[16px] text-sm font-semibold 
            sm:py-4 px-6  rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] disabled:scale-100 disabled:translate-y-0 
            shadow-lg hover:shadow-xl group relative overflow-hidden after:invisible hover:after:visible after:absolute after:inset-0 
            after:bg-linear-to-r after:from-white/0 after:via-white/20 after:to-white/0 after:-translate-x-50 
            hover:after:translate-x-full after:transition-all  
            after:duration-500"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="sm:w-5 sm:h-5 size-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span className="animate-pulse">Creating link...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 transition-all duration-200  ">
                <SparkIcon />
                <h3>Shorten URL</h3>
              </div>
            )}
          </button>
        </form>
    </>
  )
}

export default UrlForm